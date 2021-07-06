## Release Install

We support Linux x64 releases only. For MacOS you'll have to follow  the [Local Install](https://github.com/TrentonAdams/jira-cli-tools#local-install) instructions. For Windows, you'll have to build your own with the pkg command.

To install the version you want, just adjust the release version and issue the following command.

### Linux

```bash
curl -L "https://github.com/TrentonAdams/jira-cli-tools/releases/download/1.1.3-RC9/jira-cli-tools-linux-x64.tar.gz" > jira-cli-tools-linux-x64.tar.gz;
sudo tar -C / -xvzf jira-cli-tools-linux-x64.tar.gz
```

### MacOS

```bash
curl -L "https://github.com/TrentonAdams/jira-cli-tools/releases/download/1.1.3-RC9/jira-cli-tools-macos-x64.tar.gz" > jira-cli-tools-macos-x64.tar.gz;
sudo tar -C / -xvzf jira-cli-tools-macos-x64.tar.gz
```

