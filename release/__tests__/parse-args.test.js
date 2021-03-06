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

const {parseArgs} = require("../parse-args");
const testResults = {};
let errorLogs = [];
let logs = [];
let debugLogs = [];
// TODO: 2021-07-03 suppress stdout for the commander library
describe('argument parsing tests', () => {
    const OLD_ENV = process.env;
    const OLD_PROCESS_EXIT = process.exit;
    const OLD_CONSOLE_ERROR = console.error;
    const OLD_CONSOLE_LOG = console.log;
    const OLD_CONSOLE_DEBUG = console.debug;
    beforeEach(() => {
        process.env = {username: 'myuser', password: 'mypassword'};
        process.exit = (exitCode) => testResults.exitCode = exitCode;
        console.error = (...args) => errorLogs.push(args)
        console.log = (...args) => logs.push(args)
        console.debug = (...args) => debugLogs.push(args)
    })

    test('parseArgs should expect -u in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue']);
        expect(errorLogs)
            .toContainEqual(["Missing argument --username"])
        expect(testResults.exitCode)
            .toBe(0);
    });

    test('parseArgs should expect -u value in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue', '-u']);
        expect(testResults.exitCode)
            .toBe(0);
        expect(errorLogs)
            .toContainEqual(["Missing argument --username"])
    });

    test('parseArgs should parse -u value from arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '-u', 'testuser', 'SLUG-225']);
        expect(programArgs.options.username)
            .toBe('testuser');
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument --username"])
    });

    test('parseArgs should parse --user value from arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '--username', 'testuser', 'SLUG-225']);
        expect(programArgs.options.username)
            .toBe('testuser');
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument --username"])
    });

    test('parseArgs should expect -p in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue']);
        expect(errorLogs)
            .toContainEqual(["Missing argument --password"])
        expect(testResults.exitCode)
            .toBe(0);
    });

    test('parseArgs should expect -p value in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue', '-p']);
        expect(testResults.exitCode)
            .toBe(0);
        expect(errorLogs)
            .toContainEqual(["Missing argument --password"])
    });

    test('parseArgs should parse -p value from arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '-p', 'testpassword', 'SLUG-225']);
        expect(programArgs.options.password)
            .toBe('testpassword');
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument --password"])
    });

    test('parseArgs should parse --password value from arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '--password', 'testpassword', 'SLUG-225']);
        expect(programArgs.options.password)
            .toBe('testpassword');
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument --password"])
        expect(testResults.exitCode)
            .toBe(0);

    });

    test('parseArgs should expect -r in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue']);
        expect(errorLogs)
            .toContainEqual(["Missing argument --release"])
        expect(testResults.exitCode)
            .toBe(0);
    });

    test('parseArgs should expect -r value in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue', '-r']);
        expect(testResults.exitCode)
            .toBe(0);
        expect(errorLogs)
            .toContainEqual(["Missing argument --release"])
    });

    test('parseArgs should accept -r value in arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '-r', '1.21.0']);
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument --release"])
        expect(programArgs.options.release)
            .toBe('1.21.0')
    });

    test('parseArgs should accept --release value in arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '--release', '1.21.0']);
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument --release"])
        expect(programArgs.options.release)
            .toBe('1.21.0')
    });

    test('parseArgs should expect -s in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue']);
        expect(errorLogs)
            .toContainEqual(["Missing argument --slug"])
        expect(testResults.exitCode)
            .toBe(0);
    });

    test('parseArgs should expect -s value in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue', '-s']);
        expect(testResults.exitCode)
            .toBe(0);
        expect(errorLogs)
            .toContainEqual(["Missing argument --slug"])
    });

    test('parseArgs should accept -s value in arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '-s', 'SLUG']);
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument --slug"])
        expect(programArgs.options.slug)
            .toBe('SLUG')
    });

    test('parseArgs should accept --slug value in arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '--slug', 'SLUG']);
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument --slug"])
        expect(programArgs.options.slug)
            .toBe('SLUG')
    });

    test('parseArgs should expect -t in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue']);
        expect(errorLogs)
            .toContainEqual(["Missing argument --token"])
        expect(testResults.exitCode)
            .toBe(0);
    });

    test('parseArgs should expect -t value in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue', '-t']);
        expect(testResults.exitCode)
            .toBe(0);
        expect(errorLogs)
            .toContainEqual(["Missing argument --token"])
    });

    test('parseArgs should accept -t value in arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '-t', '1909c1234h']);
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument --token"])
        expect(programArgs.options.token)
            .toBe('1909c1234h')
    });

    test('parseArgs should accept --token value in arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '--token', '1909c1234h']);
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument --token"])
        expect(programArgs.options.token)
            .toBe('1909c1234h')
    });

    test('parseArgs should expect --api-user in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue']);
        expect(errorLogs)
            .toContainEqual(["Missing argument --api-user"])
        expect(testResults.exitCode)
            .toBe(0);
    });


    test('parseArgs should accept --apiUser value in arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '--api-user', 'user']);
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument --api-user"])
        expect(programArgs.options.apiUser)
            .toBe('user')
    });

    test('parseArgs should expect --jira-url-prefix in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue']);
        expect(errorLogs)
            .toContainEqual(["Missing argument --jira-url-prefix"])
        expect(testResults.exitCode)
            .toBe(0);
    });

    test('parseArgs should expect --jira-url-prefix value in arguments',
        async () => {
            await parseArgs(
                ['node', 'jira-issue', '--jira-url-prefix']);
            expect(testResults.exitCode)
                .toBe(0);
            expect(errorLogs)
                .toContainEqual(["Missing argument --jira-url-prefix"])
        });

    test('parseArgs should accept --jira-url-prefix value in arguments',
        async () => {
            const programArgs = await parseArgs(
                [
                    'node', 'jira-issue', '--jira-url-prefix',
                    'https://jira.example.com']);
            expect(errorLogs)
                .not
                .toContainEqual(["Missing argument --jira-url-prefix"])
            expect(programArgs.options.jiraUrlPrefix)
                .toBe('https://jira.example.com')
        });

    test('parseArgs should allow -m arg in arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '-m']);
        expect(programArgs.options.merge)
            .toBe(true);
    });

    afterEach(() => {
        process.env = OLD_ENV;
        process.exit = OLD_PROCESS_EXIT;
        console.error = OLD_CONSOLE_ERROR;
        console.log = OLD_CONSOLE_LOG;
        console.debug = OLD_CONSOLE_DEBUG;
        testResults.exitCode = undefined;
        errorLogs = [];
    })
})
