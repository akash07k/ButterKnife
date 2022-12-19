# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.4.0](https://github.com/akash07k/ButterKnife/compare/v1.2.0...v1.4.0) (2022-12-19)


### Features

* **deps:** added HowlerJS for playing sonic feedback ([91cbc09](https://github.com/akash07k/ButterKnife/commits/91cbc09e7f4f699ec9abb61e59a0373bdee8ee6e))
* **manifest:** added few more permissions for upcoming WebSonic functionality ([5240cb5](https://github.com/akash07k/ButterKnife/commits/5240cb507379496a9faa00e3e8f6553dc2c9ba40))
* **manifest:** apply Universal tweaks to http:// and file:// protocols too ([c12d564](https://github.com/akash07k/ButterKnife/commits/c12d564d7b90bac0d9140bf2bb388dd5877d716a))
* **universal:** added the outer region functionality ([422cbd0](https://github.com/akash07k/ButterKnife/commits/422cbd0e2d7d74b20bceac69f779138012f518d2))
* **universal:** feature for implementing the region for the elements ([1cda649](https://github.com/akash07k/ButterKnife/commits/1cda6498153ca0d9ccefbba7c4f6a85cf621cbf9))


### Bug Fixes

* **common:** fixed outputAlert element was not removing automatically ([58ad1dc](https://github.com/akash07k/ButterKnife/commits/58ad1dc5fddab71453adc21516aeb01a5bf56413))

## 1.2.0 (2022-11-17)


### Features

* added hotkey library from GitHub ([5d9e78e](https://github.com/akash07k/ButterKnife/commits/5d9e78ebce5b4609bd9898cf8edc0dd26f1c5746))
* added the semver versioning support and auto changelog generation support ([eae80c3](https://github.com/akash07k/ButterKnife/commits/eae80c39ba7404524e55a9532a4b27955833d53e))
* **common:** added 'copyElementSelector' function ([e8f3829](https://github.com/akash07k/ButterKnife/commits/e8f3829c1ce857c6b724da5f1a75a336ee26045e))
* **common:** added 'getElementSelector' function for getting the CSS selector of the element ([bfed478](https://github.com/akash07k/ButterKnife/commits/bfed478eae67ead6a436b19666800335f778ea33))
* **common:** added `makeAlert` function ([df2eca1](https://github.com/akash07k/ButterKnife/commits/df2eca174004c4b1b1f10cedac344e2d463a932d))
* **common:** added a function to copy the HTML code of the element to the clipboard (1/2) ([d1da3d9](https://github.com/akash07k/ButterKnife/commits/d1da3d968c22b102ae15ecbee497ec1edd9b4929))
* **common:** added a function to output an alert ([3995a33](https://github.com/akash07k/ButterKnife/commits/3995a3327ba6ec1febee7fd065ea396819d72ab9))
* **common:** added getElementHTML function to increase code reuse and modularity ([63df34a](https://github.com/akash07k/ButterKnife/commits/63df34ab53093ce783309a9ab29634bf8dd582c4))
* **common:** added the function to get and copy the XPath of an element (1/3) ([34f0e68](https://github.com/akash07k/ButterKnife/commits/34f0e6864bf951ffb42fe31110b2e1c3277a0d8e))
* **common:** implemented the statusAlert const naming ([3feff19](https://github.com/akash07k/ButterKnife/commits/3feff1931cc217cd37ddfa54c88bd889c06e9a19))
* **common:** implemented the styling for the outputAlert element for visibility ([be9de1f](https://github.com/akash07k/ButterKnife/commits/be9de1fcaf4565128d48d8b201727173f31999ca))
* **common:** increased the timeout for outputAlert function to 10 seconds ([26db2a4](https://github.com/akash07k/ButterKnife/commits/26db2a40179b4e01266ff9f971c87cacbb191e8f))
* **deps:** added @medv/finder for getting CSS selectors of the elements ([879c3f2](https://github.com/akash07k/ButterKnife/commits/879c3f2ee60b27f814de10043f11a2b4b183c53d))
* **deps:** added `hotkeys-js` library for efficiently capturing the keyboard events ([71a3071](https://github.com/akash07k/ButterKnife/commits/71a30711ffdc5a95e12b195fcb9787418be2f866))
* **docs:** added the feature to copy the XPath of an element (3/3) ([85961d9](https://github.com/akash07k/ButterKnife/commits/85961d9f091ae862c6fa8b44d276528327b9eaf5))
* **GitHub:** added hotkey for `star repository` button ([42843af](https://github.com/akash07k/ButterKnife/commits/42843afb96d1e4d8b45fd7ddabb0a7143272e3f4))
* **GitHub:** added the "installHotkeys` function ([2f71891](https://github.com/akash07k/ButterKnife/commits/2f718914a260bdf28f0ecdbabaf601e406f0e841))
* **GitHub:** added the access key for `Issues` tab ([ffce251](https://github.com/akash07k/ButterKnife/commits/ffce251aa4af2aef77618d120c720312b8f83a3a))
* **GitHub:** added the hotkey for  `Pull Requests` tab ([7d264f7](https://github.com/akash07k/ButterKnife/commits/7d264f7ba9d07837831faa4a7824fe8d1e6fb02b))
* **GitHub:** added the hotkey for `Create New` menu ([c23e67f](https://github.com/akash07k/ButterKnife/commits/c23e67f862adef5bb480995a09fe5a1a5b8e7ee3))
* **GitHub:** added the hotkey for the `Releases` page ([84bca0e](https://github.com/akash07k/ButterKnife/commits/84bca0e72e871344da1e362c4a47963787d10c21))
* **GitHub:** replaced the accss keys with full fledged hotkeys ([3954bf2](https://github.com/akash07k/ButterKnife/commits/3954bf2f10e3b95165c2acbcc3d7aec3843c47a4))
* **GitHub:** star counts will be announced while starring/unstarring ([3edc137](https://github.com/akash07k/ButterKnife/commits/3edc1376924983ce4ca17e273eb780cc571bc1de))
* **universal:** added a function to copy the HTML code of the element to the clipboard (2/2) ([e384136](https://github.com/akash07k/ButterKnife/commits/e384136de970623f5804ad17b89c47a9b4be4d7e))
* **universal:** added hotkey for quickly copying the HTML element selector to the clipboard ([7d19e79](https://github.com/akash07k/ButterKnife/commits/7d19e79e85098f6ad21561e818e29d293547a631))
* **universal:** added the announcements for all actions ([c377af5](https://github.com/akash07k/ButterKnife/commits/c377af5cd19d27050c8bf6b37b5afd8375943c53))
* **universal:** added the feature to copy the XPath of an element (2/3) ([5808fc0](https://github.com/akash07k/ButterKnife/commits/5808fc02b47c61ff4ef46d07b5942e19bc19a692))
* **universal:** added TorchMode ([6328bfb](https://github.com/akash07k/ButterKnife/commits/6328bfb0e3576a0cac30f8afd4f9c1812b465c3a))
* **universal:** updated the source copying command in Torch mode ([9a62b89](https://github.com/akash07k/ButterKnife/commits/9a62b89c9f5c5df36222441c78db1288fecb97b5))


### Bug Fixes

* **ChangeLog:** fixed the ChangeLog generation ([4d68780](https://github.com/akash07k/ButterKnife/commits/4d68780027dc62679d28b8d73c8c0d7034152b98))
* **GitHub:** fixed Star and Unstar control selectors ([c3c6de8](https://github.com/akash07k/ButterKnife/commits/c3c6de8cc7af6b7b65199d4277db3ccd2b5446b9))
* **GitHub:** Fixed the `star repository` selector ([644865c](https://github.com/akash07k/ButterKnife/commits/644865c67d8b361726c8f67efa0689cb1c3bc98d))
* **GitHub:** updated the comments and their line spacings ([5363c2c](https://github.com/akash07k/ButterKnife/commits/5363c2cb5a9177956c1230ecaa0ab1ad9307f89d))
* **GitHub:** updated the selectors ([f9f2434](https://github.com/akash07k/ButterKnife/commits/f9f24347529b498c60f7af06353f1f91ff72c943))
* **universal:** fixed the keybinding ([75affa4](https://github.com/akash07k/ButterKnife/commits/75affa43e72a4ff958f8b6b8171d0201bec2e94f))
* **universal:** refactored the code ([731456f](https://github.com/akash07k/ButterKnife/commits/731456f1d2fdcd778fea7baada481742bae9c046))

## 1.1.0 (2022-08-24)


### Features

* added the semver versioning support and auto changelog generation support ([eae80c3](https://github.com/akash07k/ButterKnife/commits/eae80c39ba7404524e55a9532a4b27955833d53e))
* **GitHub:** added the access key for `Issues` tab ([ffce251](https://github.com/akash07k/ButterKnife/commits/ffce251aa4af2aef77618d120c720312b8f83a3a))


### Bug Fixes

* **ChangeLog:** fixed the ChangeLog generation ([3f57367](https://github.com/akash07k/ButterKnife/commits/3f57367ad1ecf1fc266d477e04fef3dcddbff9e8))
