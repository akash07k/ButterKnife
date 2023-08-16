import * as browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(() => {
    console.log(`ButterKnife installation is successful!`);
});
