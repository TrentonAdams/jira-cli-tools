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

const axios = require('axios').default;

function mapToIssueKeys(issueResults)
{
    return issueResults.issues.map(v => v.key);
}

async function getIssuesInRelease(user, apiToken, slug, release,
    jiraProtocolAndHost)
{
    try
    {
        const response = await axios.get(
            `${jiraProtocolAndHost}/rest/api/2/search`,
            {
                headers: {
                    'Accept': 'application/json'
                },
                auth: {
                    username: user,
                    password: apiToken
                },
                // TODO: 2021-06-30 tag:jsonly may need quoting for the
                // slug/release or we simply support simple values here.
                params: {
                    jql: `project = ${slug} AND fixVersion = ${release}`,
                    fields: 'key'
                }
            });
        return mapToIssueKeys(response.data);
    }
    catch (e)
    {
        // jira thinks it's okay to return HTML during API calls, for certain
        // errors, so we can't always rely on the API returning an errorMessages
        // entry
        console.error(e.response.data.errorMessages || e.response.data);
    }
}

module.exports = {
    getIssuesInRelease,
    mapToIssueKeys
}