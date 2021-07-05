#!/bin/bash

current_version="$(cat version)"
echo "Current version: ${current_version}"
echo -n "Enter new version: "
read -r version
echo -n $version > version
sed -i -e "s/${current_version}/${version}/" release.md
git commit -m "- update version to $version" ./
git tag $version
git push --all
git push --tags
