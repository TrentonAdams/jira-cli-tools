os_type 				:=
chrome_os_type 				:=
ifeq ($(OS),Windows_NT)
	os_type = UNSUPPORTED
else
	UNAME_S := $(shell uname -s)
	ifeq ($(UNAME_S),Linux)
		os_type = linux
		chrome_os_type = linux
	endif
	ifeq ($(UNAME_S),Darwin)
		os_type = macos
		chrome_os_type = mac
	endif
endif

install: dist uninstall
	sudo rsync -av dist/ /usr/local/bin/

show-os:
	echo ${os_type}

dist: test
	npx pkg -t "node14-${os_type}" release/jira-release.js --out-path dist/
	rsync -av "node_modules/puppeteer/.local-chromium/$$(ls -1 node_modules/puppeteer/.local-chromium/)/chrome-${chrome_os_type}/" dist/jira-cli-tools-chromium/

package: clean test
	npx pkg -t node14-${os_type}-x64 release/jira-release.js --out-path dist/
	rsync -av "node_modules/puppeteer/.local-chromium/$$(ls -1 node_modules/puppeteer/.local-chromium/)/chrome-${chrome_os_type}/" dist/jira-cli-tools-chromium/
	mkdir -p dist/usr/local/bin/
	mv dist/jira-cli-tools-chromium/ dist/usr/local/bin/
	mv dist/jira-release dist/usr/local/bin/
	echo "github-ref: ${GITHUB_REF}"
	cd dist && tar -cvzf jira-cli-tools-${os_type}-x64-$${GITHUB_REF#refs/tags/}.tar.gz usr/local/bin

uninstall:
	sudo rm -vf /usr/local/bin/jira-release
	sudo rm -vrf /usr/local/bin/jira-cli-tools-chromium/

test:
	npm test

clean:
	rm -rf dist/