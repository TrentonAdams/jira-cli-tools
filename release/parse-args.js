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

const path = require('path');

async function parseArgs(args)
{
    const {Command} = require('commander')
    const program = new Command();
    // all option parameters are optional as we handle their requirement in
    // our own way because the commander library is stupid, and is directly
    // tied to stdout/stderr.
    program
        .option('-m|--merge', 'toggle PDF merge into a single PDF')
        .option('-r|--release [string]', 'jira release; e.g. 1.21.0')
        .option('-s|--slug [string]', 'jira slug; e.g. uppercase project SLUG')
        .option('--jira-url-prefix [string]', 'jira url prefix.  e.g.' +
            ' https://jira.example.com; the part before /rest/api or before' +
            ' any other jira url paths.  Usually includes only the' +
            ' protocol/host, but may contain a prefix sub-path.')
        .option('--api-user [string]', 'jira api username')
        .option('-t|--token [string]', 'jira api token')
        .option('-u|--username [string]', 'jira UI username')
        .option('-p|--password [string]', 'jira UI password; pass "-" if you' +
            ' want' +
            ' to read password from stdin.  It is more secure to send a' +
            ' password to stdin than pass it as an argument, as it will not' +
            ' show up in the process list.');
    // oddly, this will exit the program if -h is passed
    program.parse(args);
    let programOptions = program.opts();
    let programArguments = {options: {}};
    Object.assign(programArguments.options, programOptions);
    // TODO: 2021-07-03 tag:jsonly default --api-user to whatever is given for -u
    if (programArguments.password === '-')
    {
        await readStdinPassword(programArguments);
    }

    validateArguments(programArguments, program);

    let chromeSubPath = 'chrome'; // default to linux
    chromeSubPath = process.platform === 'darwin' ?
        'Chromium.app/Contents/MacOS/Chromium' : chromeSubPath;
    // undefined here implies chrome path should be managed in node_modules
    // by puppeteer
    programArguments.chromePath = process.argv[1].match(/^\/snapshot/) ?
        `${path.dirname(
            process.argv[0])}/jira-cli-tools-chromium/${chromeSubPath}` :
        undefined
    return programArguments;
}

function readStdinPassword(options)
{
    const prompt = require('prompt');

    const properties = [
        {
            name: 'password',
            hidden: true,
            replace: '*',
            required: true
        }
    ];

    return new Promise((resolve, reject) => {
        prompt.start();
        prompt.get(properties, function (err, result) {
            if (err)
            {
                reject(err);
            }
            options.password = result.password
            resolve();
        });
    });
}

const VAR_TO_ARG_MAP = {
    'username':'--username',
    'password':'--password',
    'release':'--release',
    'slug':'--slug',
    'token':'--token',
    'apiUser':'--api-user',
    'jiraUrlPrefix':'--jira-url-prefix'
}

/**
 * Validates that passed in arguments are as they are expected to be for proper
 * program operations.
 *
 * @param programArgs the programArgs, such as -u, -p, etc.
 * @param program the commander program object.
 */
function validateArguments(programArgs, program)
{
    let missingArgs = [];
    const requiredArgs = [
        'username', 'password', 'release', 'slug', 'token', 'apiUser', 'jiraUrlPrefix'];
    // if an option is passed but without an value, it becomes a 'flag', and
    // is set to true; in our case all of these required args also require
    // values, so 'true' is indicating the value was not passed
    // value not present OR value set to true means invalid option
    missingArgs = requiredArgs.filter(
        v => !programArgs.options[v] || programArgs.options[v] === true);
    missingArgs.forEach(arg => {
        console.error(`Missing argument ${VAR_TO_ARG_MAP[arg]}`)
    });

    if (missingArgs.length > 0)
    {
        console.error(program.helpInformation());
        process.exit(0)
    }

    // TODO: 2021-06-30 tag:jsonly support -d|--debug, specifically leaving
    //  tmp dir around
}


module.exports = {
    parseArgs
}