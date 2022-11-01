import * as $ from "jquery";
import Browser from "webextension-polyfill";
import { install } from "@github/hotkey";
import hotkeys from "hotkeys-js";
import * as _tweaks from "./tweaks";
import * as _common from "../../../libs/common";

const LOAD_TWEAKS = _tweaks.LOAD_TWEAKS;
const DYNAMIC_TWEAKS = _tweaks.DYNAMIC_TWEAKS;
const DYNAMIC_TWEAK_ATTRIBUTES = _tweaks.DYNAMIC_TWEAK_ATTRIBUTES;

function installHotkeys() {
    for (const element of document.querySelectorAll(`[data-hotkey]`)) {
        install(element);
    }
}

$(document).ready(() => {
    _common.init(LOAD_TWEAKS, DYNAMIC_TWEAKS, DYNAMIC_TWEAK_ATTRIBUTES);
    installHotkeys();
    hotkeys(
        `alt+shift+1,alt+shift+2,alt+shift+3,alt+shift+4,alt+shift+5`,
        (event, handler) => {
            switch (handler.key) {
                case `alt+shift+1`:
                    _common.copyElementSelector(event);
                    event.preventDefault();
                    break;
                case `alt+shift+2`: {
                    _common.copyElementHTML(event);
                    event.preventDefault();
                    break;
                }
                default:
                    break;
            }
        },
    );
});
