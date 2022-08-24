import * as $ from "jquery";
import * as _common from "../../../libs/common";

/**
 * Tweaks that only need to be applied on load.
 */
export const LOAD_TWEAKS = [];

/** * Define the actual tweaks. ** */

/**
 * Tweaks that must be applied whenever a node is added/changed.
 */
export const DYNAMIC_TWEAKS = [
    {
        // Prenotification control (The notification control which displays before logging in)
        selector: `#repository-container-header > div.d-flex.flex-wrap.flex-justify-end.mb-3.px-3.px-md-4.px-lg-5 > ul > li:nth-child(2) > a`,
        tweak: (element) => {
            // Convert it into a button for screen reader users
            // We don't want to change the label so don't pass any argument for that
            _common.makeButton(element);
        },
    },

    // Prefork control (The fork control which displays before logging in)
    {
        selector: `#repository-container-header > div.d-flex.flex-wrap.flex-justify-end.mb-3.px-3.px-md-4.px-lg-5 > ul > li:nth-child(3) > a`,
        tweak: (element) => {
            // Convert it into a button for screen reader users
            // We don't want to change the label so don't pass any argument for that
            _common.makeButton(element);
            _common.setHotkey(element, `Alt+F`, `Alt+Shift+f`);
        },
    },

    // Fork repository control.
    {
        selector: `#repository-container-header > div.d-flex.flex-wrap.flex-justify-end.mb-3.px-3.px-md-4.px-lg-5 > ul > li:nth-child(3) > div > a`,
        tweak: (element) => {
            // Convert it into a button for screen reader users
            // We don't want to change the label so don't pass any argument for that
            _common.makeButton(element);
            _common.setHotkey(element, `Alt+F`, `Alt+Shift+f`);
        },
    },

    // Prestar control
    {
        selector: `#repository-container-header > div.d-flex.flex-wrap.flex-justify-end.mb-3.px-3.px-md-4.px-lg-5 > ul > li:nth-child(4) > div > a`,
        tweak: (element) => {
            // Convert it into a button for screen reader users
            // We don't want to change the label so don't pass any argument for that
            _common.makeButton(element);
            // Define the hotkey: `Alt+Shift+8`
            _common.setHotkey(element, `Alt+Shift+*`, `Alt+Shift+8`);
        },
    },
    // Star button
    {
        selector: `#repository-container-header > div.d-flex > ul.pagehead-actions > li > div.js-toggler-container > form > button.js-toggler-target`,
        tweak: (element) => {
            // Define the hotkey: `Alt+Shift+8`
            _common.setHotkey(element, `Alt+Shift+*`, `Alt+Shift+8`);
        },
    },

    // Issue listing
    {
        selector: `div.js-issue-row`,
        tweak: (element) => {
            // Convert it into a heading and associate the issue status
            const title = $(element).find(` > div > div > a`); // Issue title
            const status = $(element).find(` > div > div > span`); // Issue status
            _common.makeHeading(title, 3);
            _common.setDescription(title, status.attr(`aria-label`));
        },
    },
    {
        // Issues tab
        selector: `#issues-tab`,
        tweak: (element) => {
            // Define hotkey: `Alt+Shift+I`
            _common.setHotkey(element, `Alt+I`, `Alt+Shift+i`);
        },
    },
];

/**
 * Attributes that should be watched for changes and cause dynamic tweaks to be
 * applied. For example, if there is a dynamic tweak which handles the state of
 * a check box and that state is determined using an attribute, that attribute
 * should be included here.
 */
export const DYNAMIC_TWEAK_ATTRIBUTES = [];

exports = {
    LOAD_TWEAKS,
    DYNAMIC_TWEAKS,
    DYNAMIC_TWEAK_ATTRIBUTES,
};
