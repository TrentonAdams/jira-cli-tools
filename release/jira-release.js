/*
 * Copyright [2021] Trenton D. Adams
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const puppeteer = require('puppeteer');
const {parseArgs} = require("./parse-args");
const path = require("path")
const os = require("os");
const child_process = require("child_process");
const fs = require("fs");
const {getIssuesInRelease} = require("./jira");
const {mkdtemp} = require('fs/promises');

async function viewIssue(jiraUrlPrefix, page, issue)
{
    await
        page.goto(
            `${jiraUrlPrefix}/si/jira.issueviews:issue-html/${issue}/${issue}.html`,
            {waitUntil: 'load'});
}

async function generateReleaseIssuePDFs(browser, page, programArguments)
{
    const {
        username,
        password,
        token,
        apiUser,
        slug,
        release,
        jiraUrlPrefix
    } = programArguments.options;

    await page.setViewport({width: 1920, height: 1080});
    await page.setUserAgent('jira-cli-tools/1.0');

    console.log(`Opening ${jiraUrlPrefix}`)
    await page.goto(`${jiraUrlPrefix}`, {waitUntil: 'load'});

    console.log(`Logging into Jira as ${username}`)
    await page.type('#login-form-username', username,
        {delay: 20});

    await page.type('#login-form-password', password,
        {delay: 20});
// page.click('#login') is broken.
    await (await page.$('#login-form-username')).press('Enter')
    await page.waitForNavigation({waitUntil: 'load'});

    console.log(`logged in as ${username}`)

    const issues = await getIssuesInRelease(apiUser, token,
        slug, release, jiraUrlPrefix);

    console.log('processing issues: ', issues);

    const tmpDirPath = await mkdtemp(path.join(os.tmpdir(), 'jira-release-'))
    for (let i = 0; i < issues.length; i++)
    {
        let pdfName = path.join(tmpDirPath, `${issues[i]}.pdf`);
        console.log(`creating ${pdfName}`)
        await viewIssue(jiraUrlPrefix, page, issues[i]);
        await page.pdf({path: pdfName});
    }

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

