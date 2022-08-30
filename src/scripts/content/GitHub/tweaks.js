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
        selector: `#repository-container-header > div.d-flex > ul.pagehead-actions > li:nth-child(2) > a.tooltipped-s`,
        tweak: (element) => {
            // Convert it into a button for screen reader users
            // We don't want to change the label so don't pass any argument for that
            _common.makeButton(element);
        },
    },

    // Prefork control (The fork control which displays before logging in)
    {
        selector: `#repository-container-header > div.d-flex > ul.pagehead-actions > li:nth-child(3) > a.tooltipped-s`,
        tweak: (element) => {
            // Convert it into a button for screen reader users
            // We don't want to change the label so don't pass any argument for that
            _common.makeButton(element);
            _common.setHotkey(element, `Alt+F`, `Alt+Shift+f`);
        },
    },

    // Fork repository control.
    {
        selector: `#repository-container-header > div.d-flex > ul > li:nth-child(2) > div > a.BtnGroup-item`,
        tweak: (element) => {
            // Convert it into a button for screen reader users
            // We don't want to change the label so don't pass any argument for that
            _common.makeButton(element);
            _common.setHotkey(element, `Alt+F`, `Alt+Shift+f`);
        },
    },

    // Prestar control
    {
        selector: `#repository-container-header > div.d-flex > ul > li:nth-child(4) > div > a.tooltipped-s`,
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
        selector: `#repository-container-header > div.d-flex > ul > li:nth-child(4) > div > form.js-social-form > button`,
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
    // Issues tab
    {
        selector: `#issues-tab`,
        tweak: (element) => {
            // Define hotkey: `Alt+Shift+I`
            _common.setHotkey(element, `Alt+I`, `Alt+Shift+i`);
        },
    },
    // Pull Requests tab
    {
        selector: `#pull-requests-tab`,
        tweak: (element) => {
            // Define hotkey: `Alt+Shift+P`
            _common.setHotkey(element, `Alt+P`, `Alt+Shift+p`);
        },
    },
    // Releases
    {
        // We'll have to use absolute selector here since the link is not having any ID or relyable way to generate it's generic selector
        selector: `#repo-content-pjax-container > div > div > div.Layout.Layout--flowRow-until-md.Layout--sidebarPosition-end.Layout--sidebarPosition-flowRow-end > div.Layout-sidebar > div > div:nth-child(2) > div > h2 > a`,
        tweak: (element) => {
            // Define hotkey: `Alt+Shift+R`
            _common.setHotkey(element, `Alt+R`, `Alt+Shift+r`);
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
