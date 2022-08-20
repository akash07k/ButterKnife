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
    // Fork repository control.
    // It will be converted to link
    {
        selector: `#repository-container-header > div.d-flex.flex-wrap.flex-justify-end.mb-3.px-3.px-md-4.px-lg-5 > ul > li:nth-child(3) > div > a`,
        tweak: (element) => {
            // We don't want to change the label so don't pass any argument for that
            _common.makeButton(element);
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
