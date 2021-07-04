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
                    "self": "https://jira.example.com/rest/api/2/issue/16075",
                    "key": "SLUG-225"
                },
                {
                    "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
                    "id": "16074",
                    "self": "https://jira.example.com/rest/api/2/issue/16074",
                    "key": "SLUG-224"
                },
                {
                    "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
                    "id": "16073",
                    "self": "https://jira.example.com/rest/api/2/issue/16073",
                    "key": "SLUG-223"
                }
            ]
        })
        expect(Array.isArray(issueKeys))
            .toBe(true);
        expect(issueKeys.length)
            .toBe(3);
        expect(issueKeys).toContain('SLUG-223');
        expect(issueKeys).toContain('SLUG-224');
        expect(issueKeys).toContain('SLUG-225');
    });

    afterAll(() => {
    })
})
