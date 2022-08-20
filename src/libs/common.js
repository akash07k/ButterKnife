import * as $ from "jquery";

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

export {
    makeHeading,
    makeRegion,
    makeButton,
    makeLink,
    makePresentational,
    makeHidden,
    makeElementOwn,
    setLabel,
    setExpanded,
    setAriaIdIfNecessary,
    init,
};
