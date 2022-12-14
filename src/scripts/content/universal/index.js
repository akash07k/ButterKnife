import * as $ from "jquery";
import Browser from "webextension-polyfill";
import { install } from "@github/hotkey";
import xPathToCss from "xpath-to-css";
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

    // TorchMode is the mode where we can get the element selectors as well as HTML code of all the elements including noninteractive ones.
    // It will effectively work even in screen reader specific modes.
    // It can be toggled by pressing `Alt+Shift+A`.
    // Clicking functionality won't work while user has turned on this mode and clicking will copy the CSS selector of the element to the clipboard.
    // Pressing `Alt+Shift+s` will copy the element HTML source to the clipboard.
    // This mode will be disabled by default.
    let isTorchModeEnabled = false;
    // This is the root event which will return the info about the currently clicked element
    let torchLevelEvent;

    function hookTorchMode() {
        $(document).click(() => {
            if (isTorchModeEnabled) {
                const selector = _common.copyElementSelector(event);
                _common.outputAlert(`body`, `Copied: ${selector}`);
                torchLevelEvent = event;
                event.preventDefault();
            }
        });
    }

    // Let's hook the event for enable TorchMode to work
    hookTorchMode();
    hotkeys(
        `alt+shift+a,alt+shift+s,alt+shift+x,alt+shift+e,alt+shift+r,alt+shift+1,alt+shift+2,alt+shift+3,alt+shift+4,alt+shift+5`,
        (event, handler) => {
            switch (handler.key) {
                case `alt+shift+a`:
                    if (!isTorchModeEnabled) {
                        isTorchModeEnabled = true;
                        _common.outputAlert(`body`, `Enabled Torch mode`);
                    } else if (isTorchModeEnabled) {
                        isTorchModeEnabled = false;
                        _common.outputAlert(`body`, `Disabled Torch mode`);
                    }

                    event.preventDefault();

                    break;
                case `alt+shift+s`:
                    if (isTorchModeEnabled) {
                        const source = _common.copyElementHTML(torchLevelEvent);
                        _common.outputAlert(`body`, `Copied: ${source}`);
                    }

                    break;

                case `alt+shift+x`:
                    if (isTorchModeEnabled) {
                        const xPath = _common.copyElementXPath(event);
                        _common.outputAlert(`body`, `Copied: ${xPath}`);
                        torchLevelEvent = event;
                        event.preventDefault();
                    }
                    break;

                // Implement the region for the chosen element if Torch mode is on. (This will be useful during debugging or testing)
                case `alt+shift+e`:
                    {
                        if (isTorchModeEnabled) {
                            const source =
                                _common.copyElementHTML(torchLevelEvent);
                            _common.implementRegion(event.target);
                            _common.outputAlert(
                                `body`,
                                `Implemented the region for: ${source}`,
                            );
                            torchLevelEvent = event;
                        }
                    }
                    break;

                // Implement the region for the chosen element. (This will be useful during debugging or testing)
                case `alt+shift+r`: {
                    const elementPath = prompt(
                        "Enter the xPath or CSS path of the element:",
                    );
                    if (elementPath.startsWith("/")) {
                        _common.implementRegion(xPathToCss(elementPath));
                        _common.outputAlert(
                            `body`,
                            `Implemented the region for: ${elementPath}`,
                        );
                    } else {
                        _common.implementRegion(elementPath);
                        _common.implementOuterRegion();
                        _common.outputAlert(
                            `body`,
                            `Implemented the region for: ${elementPath}`,
                        );
                    }
                    event.preventDefault();
                    break;
                }

                case `alt+shift+1`: {
                    const selector = _common.copyElementSelector(event);
                    _common.outputAlert(`body`, `Copied: ${selector}`);
                    event.preventDefault();

                    break;
                }

                case `alt+shift+2`:
                    {
                        const source = _common.copyElementHTML(event);
                        _common.outputAlert(`body`, `Copied: ${source}`);
                        event.preventDefault();
                    }
                    break;

                case `alt+shift+3`:
                    {
                        const xPath = _common.copyElementXPath(event);
                        _common.outputAlert(`body`, `Copied: ${xPath}`);
                        event.preventDefault();
                    }
                    break;

                default:
                    break;
            }
        },
    );
});
