import * as $ from "jquery";
import * as _tweaks from "./tweaks";
import * as _common from "../../../libs/common";

const LOAD_TWEAKS = _tweaks.LOAD_TWEAKS;
const DYNAMIC_TWEAKS = _tweaks.DYNAMIC_TWEAKS;
const DYNAMIC_TWEAK_ATTRIBUTES = _tweaks.DYNAMIC_TWEAK_ATTRIBUTES;

$(document).ready(() => {
    _common.init(LOAD_TWEAKS, DYNAMIC_TWEAKS, DYNAMIC_TWEAK_ATTRIBUTES);
});
