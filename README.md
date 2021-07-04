<!-- vim: set textwidth=0: -->

# Jira CLI Tools

These tools allow for a variety of features. We have...

* jira-release - Generates a CAB PDF to attach to a CAB request, based on a Jira
  project release.

## Install

Install is fairly straightforward, but Linux or MacOS are required for running
these tools; it may now work on Windows but there is no installation process for
that. This process installs the following in `/usr/local/bin`...

* jira-release - a binary packaged with node and the jira-release.js
* jira-cli-tools-chromium - the Chromium browser used by puppeteer

```bash
# will ask for sudo password
make install
```

The installation process detects the platform in use, generates a binary node
package with the javascript wrapped inside, then installs everything into
/usr/local/bin

## Uninstall

Removes all the stuff previously installed into `/usr/local/bin`

```bash
# will ask for sudo password
make uninstall
```

## Jira Release CLI tool

Generally this is used for attaching the release issue documentation to Service
Now.

We are currently using a shell wrapper script for grabbing all the issues in the
release, and then calling a node application to use puppeteer to generate a PDF.
It's probably worth finalizing this with everything being in the javascript
code.

For the following example, the passwords are stored in a unix password gpg
encrypted git repository; a standard used by sys-admins at AU, which I (Trent)
adopted. If you don't want to do that, you can use whatever mechanism you like.

For this to work, you'll need to generate yourself a Jira API key as well, so
that the jira-release script can pull all the issues in a Jira release.

```bash
jira-release -s OROS -r 1.21.0 -t "$(pass show work/jira/trenta-api)" -p "$(pass show work/jira/trenta)" --api-user trenta -u trenta
```

## Jira Release CLI Development

Here's the various ways you may want to use the tools during development.

```bash
# try out a full release cycle... 
node release/jira-release.js -s OROS -r 1.21.0 -t "$(pass show work/jira/trenta-api)" -p "$(pass show work/jira/trenta)" --api-user trenta -u trenta

# get jira-release help
node release/jira-release.js -h

# run the jest tests.
npm test 
```