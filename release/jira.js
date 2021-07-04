const axios = require('axios').default;

function mapToIssueKeys(issueResults)
{
    return issueResults.issues.map(v => v.key);
}

async function getIssuesInRelease(user, apiToken, slug, release) {
    try {
    const response = await axios.get(
        'https://jira.cs.athabascau.ca/rest/api/2/search',
        {
            headers: {
                'Accept': 'application/json'
            },
            auth: {
                username: user,
                password: apiToken
            },
            // TODO: 2021-06-30 tag:jsonly may need quoting for the slug/release
            // or we simply support simple values here.
            params: {
                jql: `project = ${slug} AND fixVersion = ${release}`,
                fields: 'key'
            }
        });
        return mapToIssueKeys(response.data);
    }
    catch (e)
    {
        console.error(e.response.data.errorMessages);
    }
}

module.exports = {
    getIssuesInRelease,
    mapToIssueKeys
}