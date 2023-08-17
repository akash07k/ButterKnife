import * as $ from "jquery";
import { finder } from "@medv/finder";
import getXPath from "get-xpath";

/**
 * Converts an element into heading
 * @param {Element} element - The element which we want to convert into heading
 * @param {number}} level - Desired heading level
 */
function makeHeading(element: Element, level: number) {
    $(element).attr(`role`, `heading`).attr(`aria-level`, level);
}

/**
 * Converts an element into region/landmark
 * @param {Element} element - The element which we want to convert into region
 * @param {string} label - Desired label for the region
 */
function makeRegion(element: Element, label: string) {
    $(element).attr(`role`, `region`).attr(`aria-label`, label);
}

/**
 * Converts an element into alert
 * @param {Element} element - The element which we want to convert into alert
 */
function makeAlert(element: Element) {
    $(element).attr(`role`, `alert`);
}

/**
 * Converts an element into button
 * @param {Element} element - The element which we want to convert into button
 * @param {string} label - Desired label for the button
 */
function makeButton(element: Element, label: string) {
    $(element)
        .attr(`role`, `button`)
        .attr(`aria-label`, label)
        .attr(`tabindex`, `0`);
}

/**
 * Converts an element into link
 * @param {Element} element - The element which we want to convert into link
 * @param {string} label - Desired label for the link
 */
function makeLink(element: Element, label: string) {
    $(element)
        .attr(`role`, `link`)
        .attr(`aria-label`, label)
        .attr(`tabindex`, `0`);
}

/**
 * Marks an element as presentational
 * @param {Element} element - The element which we want to mark as presentational
 */
function makePresentational(element: Element) {
    $(element).attr(`role`, `presentation`);
}

/**
 * Hides an element from the screen reader
 * @param {Element} element - The element which we want to hide
 */
function makeHidden(element: Element) {
    $(element).attr(`aria-hidden`, true);
}

/**
 * Sets the label for an element
 * @param {Element} element - The element for which we want to define the label
 * @param {string} label - The label for the element
 */
function setLabel(element: Element, label: string) {
    $(element).attr(`aria-label`, label);
}

/**
 * Sets the description for an element
 * @param {Element} element - The element for which whe want to define the description
 * @param {string} description - The description for the element
 */
function setDescription(element: Element, description: string) {
    $(element).attr(`aria-description`, description);
}

/**
 * Sets the access key for an element
 * @param {Element} element - The element for which whe want to define the access key
 * @param {string} key - The key for the element
 */
function setAccessKey(element: Element, key: string) {
    $(element).attr(`accesskey`, key);
}

/**
 * Sets the hotkey for an element
 * @param {Element} element - The element for which whe want to define the hotkey
 * @param {string} key - The hotkey for the element
 * @param {string} friendlyKey - The user understandable hotkey string
 */
function setHotkey(element: Element, key: string, friendlyKey: string) {
    $(element).attr(`data-hotkey`, key).attr(`aria-keyshortcuts`, friendlyKey);
}

/**
 * Marks an element as expanded. (Generally used for the controls such as listboxes, comboboxes etc.)
 * @param {Element} element Desired element such as listbox, combobox etc.
 * @param {boolean} expanded - Desired state
 */
function setExpanded(element: Element, expanded: boolean) {
    $(element).attr(`aria-expanded`, expanded ? `true` : `false`);
}

/**
 * Get the ID for an element. If it doesn't have one, make and set one first
 * @param {Element} element - Target element for getting/setting the ID
 * @returns {string} ID of the element
 */
let idCounter: number = 0;
function setAriaIdIfNecessary(element: Element): string {
    if (!element.id) {
        $(element).attr(`id`, `bkn-${idCounter + 1}`);
    }
    return element.id;
}

/**
 * Makes some nodes to be owned by an element
 * @param {Element} parentElement - The parent element which will own the nodes
 * @param {Element[]} listOfNodes - The list of the nodes
 */
function makeElementOwn(parentElement: Element, listOfNodes: Element[]) {
    let ids: string[] = [];
    for (const node of listOfNodes) {
        ids.push(setAriaIdIfNecessary(node));
    }
    $(parentElement).attr(`aria-owns`, ids.join(` `));
}

/**
 * A function that applies a tweak to an Element with optional additional arguments.
 *
 * @callback TweakFunction
 * @param {Element} element - The Element to apply the tweak to.
 * @param {...any} args - Additional arguments for the tweak function (if applicable).
 * @returns {void}
 */
type TweakFunction = (element: Element, ...args: any[]) => void;

/**
 * An object describing a tweak, which can be either a direct function or an array containing a function and its arguments.
 */
interface TweakDefinition {
    selector: string;
    tweak: TweakFunction | [TweakFunction, ...any[]];
}

/**
 * Apply a tweak to the given Element as appropriate.
 *
 * @param {Element} element - The Element to which the tweak should be applied.
 * @param {TweakDefinition} tweak - The tweak to be applied.
 * @returns {void}
 */
function applyTweak(element: Element, tweak: TweakDefinition): void {
    const { tweak: tweakValue } = tweak;
    if (typeof tweakValue === 'function') {
        tweakValue(element);
    } else if (Array.isArray(tweakValue)) {
        const [func, ...args] = tweakValue;
        func(element, ...args);
    }
}

/**
 * Apply the multiple tweaks to an element
 * @param {Element} rootElement - The root of the target element
 * @param {TweakDefinition[]} tweaks - Set of tweaks
 * @param {boolean} checkRoot - Check if the tweak needs to be applied to the root
 */
function applyTweaks(rootElement: Element, tweaks: TweakDefinition[], checkRoot: boolean): void {
    for (const tweak of tweaks) {
        for (const element of rootElement.querySelectorAll(tweak.selector)) {
            applyTweak(element, tweak);
        }
        if (checkRoot && rootElement.matches(tweak.selector)) {
            applyTweak(rootElement, tweak);
        }
    }
}
/**
 * Initializes a mutation observer to apply tweaks based on mutations in the document.
 *
 * @param {TweakDefinition[]} LOAD_TWEAKS - An array of tweak definitions to be loaded.
 * @param {TweakDefinition[]} DYNAMIC_TWEAKS - An array of tweak definitions for dynamic changes.
 * @param {string} DYNAMIC_TWEAK_ATTRIBUTES - Comma-separated string of dynamic tweak attributes.
 */
function init(
    LOAD_TWEAKS: TweakDefinition[],
    DYNAMIC_TWEAKS: TweakDefinition[],
    DYNAMIC_TWEAK_ATTRIBUTES: string
) {
    // Create a MutationObserver to watch for changes in the document
    const observer = new MutationObserver((mutations: MutationRecord[]) => {
        // Loop through each mutation in the list of observed mutations
        // eslint-disable-next-line no-restricted-syntax
        for (const mutation of mutations) {
            try {
                // Check if the mutation type is 'childList'
                if (mutation.type === 'childList') {
                    // Loop through each added node in the mutation
                    // eslint-disable-next-line no-restricted-syntax
                    for (const node of mutation.addedNodes) {
                        // Check if the node is an ELEMENT_NODE
                        if (node.nodeType !== Node.ELEMENT_NODE) {
                            // Skip to the next iteration if the node is not an element
                            // eslint-disable-next-line no-continue
                            continue;
                        }
                        // Apply dynamic tweaks to the added element node
                        applyTweaks(node as Element, DYNAMIC_TWEAKS, true);
                    }
                } else if (mutation.type === 'attributes') {
                    // Apply dynamic tweaks to the mutated element's target
                    applyTweaks(mutation.target as Element, DYNAMIC_TWEAKS, true);
                }
            } catch (e) {
                // Catch and log exceptions for individual mutations to continue handling other mutations
                console.log(`Exception while handling mutation: ${e}`);
            }
        }
    });

    applyTweaks(document.documentElement, LOAD_TWEAKS, false);
    applyTweaks(document.documentElement, DYNAMIC_TWEAKS, false);

    const options: MutationObserverInit = { childList: true, subtree: true };
    if (DYNAMIC_TWEAK_ATTRIBUTES.length > 0) {
        options.attributes = true;
        options.attributeFilter = DYNAMIC_TWEAK_ATTRIBUTES.split(","); // Assuming 
    }
    observer.observe(document, options);
}

/**
 * Gets the selector (CSS path) of an element
 * @param {Event} event - The event we want the selector for
 * @returns {string} Selector (CSS path) of the element
 */
function getElementSelector(event: Event): string {
    const selector = finder(event.target as Element, {
        idName: (name) => true,
        className: (name) => true,
        tagName: (name) => true,
        attr: (name, value) => false,
        seedMinLength: 1,
        optimizedMinLength: 2,
        threshold: 1000,
        maxNumberOfTries: 10_000,
    });
    return selector;
}

/**
 * Copies the selector (CSS path) of an element to the clipboard
 * @param {Event} event - The event we want the selector for
 * @returns {string} Selector (CSS path) of the element
 */
function copyElementSelector(event: Event): string {
    const selector = getElementSelector(event);
    navigator.clipboard
        .writeText(selector)
        .then(() => {
            console.log(
                `Successfully copied the selector: ${selector} to the clipboard`,
            );
        })
        .catch(() => {
            console.log(
                `Failure while copying the selector: ${selector} to the clipboard`,
            );
        });
    return selector;
}

/**
 * Gets the XPath (XML path) of an element
 * @param {Event} event - The event we want the path for
 * @returns {string} XPath (XML path) of the element
 */
function getElementXPath(event: Event): string {
    const xPath = getXPath(event.target);
    return xPath;
}

/**
 * Copies the XPath (XML path) of an element to the clipboard
 * @param {Event} event - The event we want the XPath for
 * @returns {string} XPath (XML path) of the element
 */
function copyElementXPath(event: Event): string {
    const xPath = getElementXPath(event);
    navigator.clipboard
        .writeText(xPath)
        .then(() => {
            console.log(
                `Successfully copied the XPath: ${xPath} to the clipboard`,
            );
        })
        .catch(() => {
            console.log(
                `Failure while copying the XPath: ${xPath} to the clipboard`,
            );
        });
    return xPath;
}

/**
 * Gets the HTML code (outerHTML) of an element
 * @param {event} event - The event we want the HTML code for
 * @returns {String} HTML code (outerHTML) of the element
 */
function getElementHTML(event: Event): string {
    const selector = getElementSelector(event);
    const HTML = $(selector).prop(`outerHTML`);
    return HTML;
}

/**
 * Copies the HTML code (outerHTML) of an element to the clipboard
 * @param {event} event - The event we want the HTML code for
 * @returns {string} HTML code (outerHTML) of the element
 */
function copyElementHTML(event: Event): string {
    const HTML = getElementHTML(event);
    navigator.clipboard
        .writeText(HTML)
        .then(() => {
            console.log(
                `Successfully copied the HTML code: ${HTML} to the clipboard`,
            );
        })
        .catch(() => {
            console.log(
                `Failure while copying the HTML code: ${HTML} to the clipboard`,
            );
        });
    return HTML;
}

function outputAlert(selector: string, message: string) {
    const statusAlert = `butterknife-status-alert`;
    $(selector).append(`<div id=${statusAlert}></div>`);
    $(`#${statusAlert}`).addClass(`butterknife-status-alert`);
    $(`#${statusAlert}`).css({
        "background-color": `red`,
        "font-weight": `bold`,
        "font-size": `xx-large`,
    });
    $(`#${statusAlert}`).text(message).attr(`role`, `alert`);
    setTimeout(() => {
        $(`#butterknife-status-alert`).remove();
    }, 10000);
}

/**
 * Implements the region/landmark for an element
 * @param {Element} element - The element which we want to implement the region for
 */
function implementRegion(element: Element) {
    $(element).wrap(
        `<div id="butterknife-region" role="region" aria-label="Butterknife Region"></div>`,
    );
}

/**
 * Implements the region/landmark for an element which indicates the end/out of scope
 * @param {Element} element - The element which we want to implement the region for
 */
function implementOuterRegion(element = `#butterknife-region`) {
    $(element)
        .after(`<div id="butterknife-outer-region" role="region" aria-label="Butterknife Outer Region">
        <p style="color:#8B0000;font-weight:bold;font-size:xx-large;">Stop Now!</p>
        </div>`);
}

/**
 * Creates an element
 * @param {string} tag - The element which want to create
 * @param {string} attributes - The attributes for the element
 */
function createElement(tag: string, attributes: string) {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => (element[key] = value));
    return element;
}

/**
 * Copies the text to the clipboard
 * @param {string} text - The which we want to copy to the clipboard
 */
function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
}

export {
    makeHeading,
    makeRegion,
    makeAlert,
    makeButton,
    makeLink,
    makePresentational,
    makeHidden,
    makeElementOwn,
    setLabel,
    setDescription,
    setAccessKey,
    setHotkey,
    setExpanded,
    setAriaIdIfNecessary,
    init,
    getElementSelector,
    copyElementSelector,
    getElementXPath,
    copyElementXPath,
    getElementHTML,
    copyElementHTML,
    outputAlert,
    implementRegion,
    implementOuterRegion,
    createElement,
    copyToClipboard,
};
