/**
 * Converts an element into heading
 * @param {HTMLElement} element - The element which we want to convert into heading
 * @param {Integer} level - Desired heading level
 */
function makeHeading(element, level) {
    element.setAttribute("role", "heading");
    element.setAttribute("aria-level", level);
}

/**
 * Converts an element into region/landmark
 * @param {HTMLElement} element - The element which we want to convert into region
 * @param {String} label - Desired label for the region
 */
function makeRegion(element, label) {
    element.setAttribute("role", "region");
    element.setAttribute("aria-label", label);
}

/**
 * Converts an element into button
 * @param {HTMLElement} element - The element which we want to convert into button
 * @param {String} label - Desired label for the button
 */
function makeButton(element, label) {
    element.setAttribute("role", "button");
    element.setAttribute("aria-label", label);
}

/**
 * Converts an element into link
 * @param {HTMLElement} element - The element which we want to convert into link
 * @param {String} label - Desired label for the link
 */
function makeLink(element, label) {
    element.setAttribute("role", "button");
    element.setAttribute("aria-label", label);
}

/**
 * Marks an element as presentational
 * @param {HTMLElement} element - The element which we want to mark as presentational
 */
function makePresentational(element) {
    element.setAttribute("role", "presentation");
}

/**
 * Hides an element from the screen reader
 * @param {HTMLElement} element - The element which we want to hide
 */
function makeHidden(element) {
    element.setAttribute("aria-hidden", "true");
}

/**
 * Makes some nodes to be owned by an element
 * @param {HTMLElement} parentElement - The element which we want to mark as presentational
 * @param {node} listOfNodes - The list of the nodes
 */
function makeElementOwn(parentElement, listOfNodes) {
    ids = [];
    for (let node of listOfNodes) {
        ids.push(setAriaIdIfNecessary(node));
    }
    parentElement.setAttribute("aria-owns", ids.join(" "));
}

/**
 * Sets the label for an element
 * @param {HTMLElement} element - The element for which whe want to define the label
 * @param {String} label - The label for the element
 */
function setLabel(element, label) {
    element.setAttribute("aria-label", label);
}

/**
 * Marks an element as expanded. (Generally used for the controls such as listboxes, comboboxes etc.)
 * @param {HTMLElement} element Desired element such as listbox, combobox etc.
 * @param {Boolean} expanded - Desired state
 */
function setExpanded(element, expanded) {
    element.setAttribute("aria-expanded", expanded ? "true" : "false");
}


/**
 * Get the ID for an element. If it doesn't have one, make and set one first
 * @param {HTMLElement} element - Target element for getting/setting the ID
 * @returns {String} ID of the element
 */
 let idCounter = 0;
function setAriaIdIfNecessary(element) {
    if (!element.id) {
        element.setAttribute("id", "bkn-" + idCounter++);
    }
    return element.id;
}

/**
 * Function to apply the tweaks when appropriate
 * @param {HTMLElement} element - Element for which we want to apply the tweak
 * @param {*} tweak - Tweak to apply
 */
function applyTweak(element, tweak) {
    if (Array.isArray(tweak.tweak)) {
        let [func, ...args] = tweak.tweak;
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
    for (let tweak of tweaks) {
        for (let element of root.querySelectorAll(tweak.selector)) {
            applyTweak(element, tweak);
        }
        if (checkRoot && root.matches(tweak.selector)) {
            applyTweak(root, tweak);
        }
    }
}

let observer = new MutationObserver(function (mutations) {
    for (let mutation of mutations) {
        try {
            if (mutation.type === "childList") {
                for (let node of mutation.addedNodes) {
                    if (node.nodeType != Node.ELEMENT_NODE) {
                        continue;
                    }
                    applyTweaks(node, DYNAMIC_TWEAKS, true);
                }
            } else if (mutation.type === "attributes") {
                applyTweaks(mutation.target, DYNAMIC_TWEAKS, true);
            }
        } catch (e) {
            // Catch exceptions for individual mutations so other mutations are still handled.
            console.log("Exception while handling mutation: " + e);
        }
    }
});


/*** Define the actual tweaks. ***/

/**
 * Tweaks that only need to be applied on load.
 */
const LOAD_TWEAKS = [];

/**
* Attributes that should be watched for changes and cause dynamic tweaks to be
* applied. For example, if there is a dynamic tweak which handles the state of
* a check box and that state is determined using an attribute, that attribute
* should be included here.
 */
const DYNAMIC_TWEAK_ATTRIBUTES = [];

/**
 * Tweaks that must be applied whenever a node is added/changed.
 */
 const DYNAMIC_TWEAKS = [
    {
selector: "#",
tweak: (element) => {

}
    },
 ];

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
    applyTweak,
    applyTweaks,
};
