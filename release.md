## Release Install

We support Linux x64 and MacOS x64 releases only. For Windows, you'll have to build your own with the pkg command; and make adjustments to the code if it doesn't work.

Install [poppler](https://poppler.freedesktop.org/) first, as pdfunite is required and is included with poppler.

### Linux

```bash
curl -L "https://github.com/TrentonAdams/jira-cli-tools/releases/download/1.2.0/jira-cli-tools-linux-x64.tar.gz" > jira-cli-tools-linux-x64.tar.gz;
sudo tar -C / -xvzf jira-cli-tools-linux-x64.tar.gz
```

### MacOS

```bash
curl -L "https://github.com/TrentonAdams/jira-cli-tools/releases/download/1.2.0/jira-cli-tools-macos-x64.tar.gz" > jira-cli-tools-macos-x64.tar.gz;
sudo tar -C / -xvzf jira-cli-tools-macos-x64.tar.gz
```

