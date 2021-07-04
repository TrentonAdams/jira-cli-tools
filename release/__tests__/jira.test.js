const {mapToIssueKeys} = require("../jira");
describe('jira tests', () => {
    beforeEach(() => {
    })

    test('should map 3 results to 3 issue keys', async () => {
        const issueKeys = mapToIssueKeys({
            "expand": "schema,names",
            "startAt": 0,
            "maxResults": 50,
            "total": 3,
            "issues": [
                {
                    "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
                    "id": "16075",
                    "self": "https://jira.cs.athabascau.ca/rest/api/2/issue/16075",
                    "key": "OROS-225"
                },
                {
                    "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
                    "id": "16074",
                    "self": "https://jira.cs.athabascau.ca/rest/api/2/issue/16074",
                    "key": "OROS-224"
                },
                {
                    "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
                    "id": "16073",
                    "self": "https://jira.cs.athabascau.ca/rest/api/2/issue/16073",
                    "key": "OROS-223"
                }
            ]
        })
        expect(Array.isArray(issueKeys))
            .toBe(true);
        expect(issueKeys.length)
            .toBe(3);
        expect(issueKeys).toContain('OROS-223');
        expect(issueKeys).toContain('OROS-224');
        expect(issueKeys).toContain('OROS-225');
    });

    afterAll(() => {
    })
})
