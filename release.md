## Release Install

We support Linux x64 releases only. For MacOS you'll have to follow  the [Local Install](https://github.com/TrentonAdams/jira-cli-tools#local-install) instructions. For Windows, you'll have to build your own with the pkg command.

To install the version you want, just adjust the release version and issue the following command.

### Linux

```bash
release=1.1.2-RC8; curl -L "https://github.com/TrentonAdams/jira-cli-tools/releases/download/${release}/jira-cli-tools-linux-x64.tar.gz" > jira-cli-tools-linux-x64.tar.gz;
sudo tar -C / -xvzf jira-cli-tools-linux-x64.tar.gz
```

### MacOS

```bash
release=1.1.2-RC8; curl -L "https://github.com/TrentonAdams/jira-cli-tools/releases/download/${release}/jira-cli-tools-macos-x64.tar.gz" > jira-cli-tools-macos-x64.tar.gz;
sudo tar -C / -xvzf jira-cli-tools-macos-x64.tar.gz
```

