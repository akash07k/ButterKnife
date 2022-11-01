import * as $ from "jquery";
import { finder } from "@medv/finder";

/**
 * Converts an element into heading
 * @param {HTMLElement} element - The element which we want to convert into heading
 * @param {Integer} level - Desired heading level
 */
function makeHeading(element, level) {
    $(element).attr(`role`, `heading`).attr(`aria-level`, level);
}

/**
 * Converts an element into region/landmark
 * @param {HTMLElement} element - The element which we want to convert into region
 * @param {String} label - Desired label for the region
 */
function makeRegion(element, label) {
    $(element).attr(`role`, `region`).attr(`aria-label`, label);
}

/**
 * Converts an element into alert
 * @param {HTMLElement} element - The element which we want to convert into alert
 */
function makeAlert(element) {
    $(element).attr(`role`, `alert`);
}

/**
 * Converts an element into button
 * @param {HTMLElement} element - The element which we want to convert into button
 * @param {String} label - Desired label for the button
 */
function makeButton(element, label) {
    $(element)
        .attr(`role`, `button`)
        .attr(`aria-label`, label)
        .attr(`tabindex`, `0`);
}

/**
 * Converts an element into link
 * @param {HTMLElement} element - The element which we want to convert into link
 * @param {String} label - Desired label for the link
 */
function makeLink(element, label) {
    $(element)
        .attr(`role`, `link`)
        .attr(`aria-label`, label)
        .attr(`tabindex`, `0`);
}

/**
 * Marks an element as presentational
 * @param {HTMLElement} element - The element which we want to mark as presentational
 */
function makePresentational(element) {
    $(element).attr(`role`, `presentation`);
}

/**
 * Hides an element from the screen reader
 * @param {HTMLElement} element - The element which we want to hide
 */
function makeHidden(element) {
    $(element).attr(`aria-hidden`, true);
}

/**
 * Sets the label for an element
 * @param {HTMLElement} element - The element for which whe want to define the label
 * @param {String} label - The label for the element
 */
function setLabel(element, label) {
    $(element).attr(`aria-label`, label);
}

/**
 * Sets the description for an element
 * @param {HTMLElement} element - The element for which whe want to define the description
 * @param {String} description - The description for the element
 */
function setDescription(element, description) {
    $(element).attr(`aria-description`, description);
}

/**
 * Sets the access key for an element
 * @param {HTMLElement} element - The element for which whe want to define the access key
 * @param {String} key - The key for the element
 */
function setAccessKey(element, key) {
    $(element).attr(`accesskey`, key);
}

/**
 * Sets the hotkey for an element
 * @param {HTMLElement} element - The element for which whe want to define the hotkey
 * @param {String} key - The hotkey for the element
 * @param {String} friendlyKey - The user understandable hotkey string
 */
function setHotkey(element, key, friendlyKey) {
    $(element).attr(`data-hotkey`, key).attr(`aria-keyshortcuts`, friendlyKey);
}

/**
 * Marks an element as expanded. (Generally used for the controls such as listboxes, comboboxes etc.)
 * @param {HTMLElement} element Desired element such as listbox, combobox etc.
 * @param {Boolean} expanded - Desired state
 */
function setExpanded(element, expanded) {
    $(element).attr(`aria-expanded`, expanded ? `true` : `false`);
}

/**
 * Get the ID for an element. If it doesn't have one, make and set one first
 * @param {HTMLElement} element - Target element for getting/setting the ID
 * @returns {String} ID of the element
 */
let idCounter = 0;
function setAriaIdIfNecessary(element) {
    if (!element.id) {
        $(element).attr(`id`, `bkn-${idCounter + 1}`);
    }
    return element.id;
}

/**
 * Makes some nodes to be owned by an element
 * @param {HTMLElement} parentElement - The parent element which will own the nodes
 * @param {node} listOfNodes - The list of the nodes
 */
function makeElementOwn(parentElement, listOfNodes) {
    let ids = [];
    for (const node of listOfNodes) {
        ids.push(setAriaIdIfNecessary(node));
    }
    $(parentElement).attr(`aria-owns`, ids.join(` `));
}

/**
 * Function to apply the tweaks when appropriate
 * @param {HTMLElement} element - Element for which we want to apply the tweak
 * @param {*} tweak - Tweak to apply
 */
function applyTweak(element, tweak) {
    if (Array.isArray(tweak.tweak)) {
        const [func, ...args] = tweak.tweak;
        func(element, ...args);
    } else {
        tweak.tweak(element);
    }
}

/**
 * Apply the multiple tweaks to an element
 * @param {HTMLElement} root - The root of the target element
 * @param {Array} tweaks - Set of tweaks
 * @param {Boolean} checkRoot - Check if the tweak needs to be applied to the root
 */
function applyTweaks(root, tweaks, checkRoot) {
    for (const tweak of tweaks) {
        for (const element of root.querySelectorAll(tweak.selector)) {
            applyTweak(element, tweak);
        }
        if (checkRoot && root.matches(tweak.selector)) {
            applyTweak(root, tweak);
        }
    }
}

function init(LOAD_TWEAKS, DYNAMIC_TWEAKS, DYNAMIC_TWEAK_ATTRIBUTES) {
    const observer = new MutationObserver((mutations) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const mutation of mutations) {
            try {
                if (mutation.type === `childList`) {
                    // eslint-disable-next-line no-restricted-syntax
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType !== Node.ELEMENT_NODE) {
                            // eslint-disable-next-line no-continue
                            continue;
                        }
                        applyTweaks(node, DYNAMIC_TWEAKS, true);
                    }
                } else if (mutation.type === `attributes`) {
                    applyTweaks(mutation.target, DYNAMIC_TWEAKS, true);
                }
            } catch (e) {
                // Catch exceptions for individual mutations so other mutations are still handled.
                console.log(`Exception while handling mutation: ${e}`);
            }
        }
    });

    applyTweaks(document, LOAD_TWEAKS, false);
    applyTweaks(document, DYNAMIC_TWEAKS, false);
    const options = { childList: true, subtree: true };
    if (DYNAMIC_TWEAK_ATTRIBUTES.length > 0) {
        options.attributes = true;
        options.attributeFilter = DYNAMIC_TWEAK_ATTRIBUTES;
    }
    observer.observe(document, options);
}

/**
 * Gets the selector (CSS path) of an element
 * @param {event} event - The event we want the selector for
 * @returns {String} Selector (CSS path) of the element
 */
function getElementSelector(event) {
    const selector = finder(event.target, {
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
};
