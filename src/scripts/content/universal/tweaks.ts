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
export const DYNAMIC_TWEAKS = [];

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
