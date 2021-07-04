const puppeteer = require('puppeteer');
const {parseArgs} = require("./parse-args");
const path = require("path")
const os = require("os");
const child_process = require("child_process");
const fs = require("fs");
const {getIssuesInRelease} = require("./jira");
const {mkdtemp} = require('fs/promises');

// TODO: 2021-07-03 pass api end point in as part of the options
async function viewIssue(page, issue)
{
    await
        page.goto(
            `https://jira.cs.athabascau.ca/si/jira.issueviews:issue-html/${issue}/${issue}.html`,
            {waitUntil: 'load'});
}

async function generateReleaseIssuePDFs(browser, page, programArguments)
{
    await page.setViewport({width: 1920, height: 1080});
    await page.setUserAgent('jira-cli-tools/1.0');
    console.log('Opening https://jira.cs.athabascau.ca')
    await page.goto(`https://jira.cs.athabascau.ca`, {waitUntil: 'load'});
    console.log(`Logging into Jira as ${programArguments.username}`)
    await page.type('#login-form-username', programArguments.username,
        {delay: 20});

    await page.type('#login-form-password', programArguments.password,
        {delay: 20});
// page.click('#login') is broken.
    await (await page.$('#login-form-username')).press('Enter')
    await page.waitForNavigation({waitUntil: 'load'});

    console.log(`logged in as ${programArguments.username}`)

    const options = programArguments.options;
    const issues = await getIssuesInRelease(options.apiUser, options.token,
        options.slug, options.release);

    console.log('processing issues: ', issues);

    const tmpDirPath = await mkdtemp(path.join(os.tmpdir(), 'jira-release-'))
    for (let i = 0; i < issues.length; i++)
    {
        let pdfName = path.join(tmpDirPath, `${issues[i]}.pdf`);
        console.log(`creating ${pdfName}`)
        await viewIssue(page, issues[i]);
        await page.pdf({path: pdfName});
    }

    const {slug, release} = programArguments.options;
    const pdfRelease = path.join(os.tmpdir(), `${slug}-${release}.pdf`)
    const pdfFiles = issues.map(issue => path.join(tmpDirPath, `${issue}.pdf`))
    generateReleasePDF(pdfFiles, pdfRelease)
    console.log(`cleaning up temporary files: ${tmpDirPath}`)
    fs.rmSync(tmpDirPath, {recursive: true})
}

function generateReleasePDF(pdfFiles, pdfRelease)
{
    try
    {
        child_process.execFileSync('pdfunite',
            [...pdfFiles, `${pdfRelease}`],
            {});
        console.log(`release pdf in file ${pdfRelease}`);
    }
    catch (e)
    {
        console.error('Error running pdfunite', e)
        process.exit(1)
    }
}

async function run()
{
    const options = await parseArgs(process.argv);
    const browser = await puppeteer.launch(
        {
            headless: true,
            executablePath: options.chromePath
        });
    const page = await browser.newPage();
    await page.setDefaultTimeout(5000);
    // await page.setDefaultNavigationTimeout(5000);

    try
    {
        await generateReleaseIssuePDFs(browser, page, options)
    }
    catch (e)
    {
        const errorPdf = path.join(os.tmpdir(), 'error.pdf');
        await page.pdf({path: errorPdf});
        console.error(`See the ${path.resolve(errorPdf)} for more information`,
            e);
        await browser.close();
        process.exit(1);
    }
    await browser.close();
    process.exit(0);
}

run()
    .catch(err => {
        console.error(err)
    });

