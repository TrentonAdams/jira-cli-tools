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
            .toContainEqual(["Missing argument username"])
        expect(testResults.exitCode)
            .toBe(0);
    });

    test('parseArgs should expect -u value in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue', '-u']);
        expect(testResults.exitCode)
            .toBe(0);
        expect(errorLogs)
            .toContainEqual(["Missing argument username"])
    });

    test('parseArgs should parse -u value from arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '-u', 'testuser', 'OROS-225']);
        expect(programArgs.username)
            .toBe('testuser');
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument username"])
    });

    test('parseArgs should parse --user value from arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '--username', 'testuser', 'OROS-225']);
        expect(programArgs.username)
            .toBe('testuser');
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument username"])
    });

    test('parseArgs should expect -p in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue']);
        expect(errorLogs)
            .toContainEqual(["Missing argument password"])
        expect(testResults.exitCode)
            .toBe(0);
    });

    test('parseArgs should expect -p value in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue', '-p']);
        expect(testResults.exitCode)
            .toBe(0);
        expect(errorLogs)
            .toContainEqual(["Missing argument password"])
    });

    test('parseArgs should parse -p value from arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '-p', 'testpassword', 'OROS-225']);
        expect(programArgs.password)
            .toBe('testpassword');
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument password"])
    });

    test('parseArgs should parse --password value from arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '--password', 'testpassword', 'OROS-225']);
        expect(programArgs.password)
            .toBe('testpassword');
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument password"])
        expect(testResults.exitCode)
            .toBe(0);

    });

    test('parseArgs should expect -r in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue']);
        expect(errorLogs)
            .toContainEqual(["Missing argument release"])
        expect(testResults.exitCode)
            .toBe(0);
    });

    test('parseArgs should expect -r value in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue', '-r']);
        expect(testResults.exitCode)
            .toBe(0);
        expect(errorLogs)
            .toContainEqual(["Missing argument release"])
    });

    test('parseArgs should accept -r value in arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '-r', '1.21.0']);
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument release"])
        expect(programArgs.release)
            .toBe('1.21.0')
    });

    test('parseArgs should accept --release value in arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '--release', '1.21.0']);
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument release"])
        expect(programArgs.release)
            .toBe('1.21.0')
    });

    test('parseArgs should expect -s in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue']);
        expect(errorLogs)
            .toContainEqual(["Missing argument slug"])
        expect(testResults.exitCode)
            .toBe(0);
    });

    test('parseArgs should expect -s value in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue', '-s']);
        expect(testResults.exitCode)
            .toBe(0);
        expect(errorLogs)
            .toContainEqual(["Missing argument slug"])
    });

    test('parseArgs should accept -s value in arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '-s', 'SLUG']);
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument slug"])
        expect(programArgs.slug)
            .toBe('SLUG')
    });

    test('parseArgs should accept --slug value in arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '--slug', 'SLUG']);
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument slug"])
        expect(programArgs.slug)
            .toBe('SLUG')
    });

    test('parseArgs should expect -t in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue']);
        expect(errorLogs)
            .toContainEqual(["Missing argument token"])
        expect(testResults.exitCode)
            .toBe(0);
    });

    test('parseArgs should expect -t value in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue', '-t']);
        expect(testResults.exitCode)
            .toBe(0);
        expect(errorLogs)
            .toContainEqual(["Missing argument token"])
    });

    test('parseArgs should accept -t value in arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '-t', '1909c1234h']);
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument token"])
        expect(programArgs.token)
            .toBe('1909c1234h')
    });

    test('parseArgs should accept --token value in arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '--token', '1909c1234h']);
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument token"])
        expect(programArgs.token)
            .toBe('1909c1234h')
    });

    test('parseArgs should expect --api-user in arguments', async () => {
        await parseArgs(
            ['node', 'jira-issue']);
        expect(errorLogs)
            .toContainEqual(["Missing argument apiUser"])
        expect(testResults.exitCode)
            .toBe(0);
    });


    test('parseArgs should accept --apiUser value in arguments', async () => {
        const programArgs = await parseArgs(
            ['node', 'jira-issue', '--api-user', 'user']);
        expect(errorLogs)
            .not
            .toContainEqual(["Missing argument apiUser"])
        expect(programArgs.apiUser)
            .toBe('user')
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
