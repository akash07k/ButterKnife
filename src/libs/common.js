import * as $ from "jquery";

/**
 * A class which holds commonly used functions required by whole extension
 */

// eslint-disable-next-line import/prefer-default-export
export class Common {
    /**
     * Default constructor for the class
     *      * @param {Array} DYNAMIC_TWEAKS - Tweaks that must be applied whenever a node is added/changed.
     * @param {Array} DYNAMIC_TWEAK_ATTRIBUTES - Attributes that should be watched for changes and cause dynamic tweaks to be      applied. For example, if there is a dynamic tweak which handles the state of      a check box and that state is determined using an attribute, that attribute      should be included here.
     * @param {Array} LOAD_TWEAKS - Tweaks that only need to be applied on load
     */
    constructor(DYNAMIC_TWEAKS, DYNAMIC_TWEAK_ATTRIBUTES, LOAD_TWEAKS) {
        this.DYNAMIC_TWEAKS = DYNAMIC_TWEAKS;
        this.DYNAMIC_TWEAK_ATTRIBUTES = DYNAMIC_TWEAK_ATTRIBUTES;
        this.LOAD_TWEAKS = LOAD_TWEAKS;
    }

    /**
     * Converts an element into heading
     * @param {HTMLElement} element - The element which we want to convert into heading
     * @param {Integer} level - Desired heading level
     */
    static makeHeading(element, level) {
        $(element).attr(`role`, `heading`).attr(`aria-level`, level);
    }

    /**
     * Converts an element into region/landmark
     * @param {HTMLElement} element - The element which we want to convert into region
     * @param {String} label - Desired label for the region
     */
    static makeRegion(element, label) {
        $(element).attr(`role`, `region`).attr(`aria-label`, label);
    }

    /**
     * Converts an element into button
     * @param {HTMLElement} element - The element which we want to convert into button
     * @param {String} label - Desired label for the button
     */
    static makeButton(element, label) {
        $(element).attr(`role`, `button`).attr(`aria-label`, label);
    }

    /**
     * Converts an element into link
     * @param {HTMLElement} element - The element which we want to convert into link
     * @param {String} label - Desired label for the link
     */
    static makeLink(element, label) {
        $(element).attr(`role`, `link`).attr(`aria-label`, label);
    }

    /**
     * Marks an element as presentational
     * @param {HTMLElement} element - The element which we want to mark as presentational
     */
    static makePresentational(element) {
        $(element).attr(`role`, `presentation`);
    }

    /**
     * Hides an element from the screen reader
     * @param {HTMLElement} element - The element which we want to hide
     */
    static makeHidden(element) {
        $(element).attr(`aria-hidden`, true);
    }

    /**
     * Sets the label for an element
     * @param {HTMLElement} element - The element for which whe want to define the label
     * @param {String} label - The label for the element
     */
    static setLabel(element, label) {
        $(element).attr(`aria-label`, label);
    }

    /**
     * Marks an element as expanded. (Generally used for the controls such as listboxes, comboboxes etc.)
     * @param {HTMLElement} element Desired element such as listbox, combobox etc.
     * @param {Boolean} expanded - Desired state
     */
    static setExpanded(element, expanded) {
        $(element).attr(`aria-expanded`, expanded ? `true` : `false`);
    }

    idCounter = 0;

    /**
     * Get the ID for an element. If it doesn't have one, make and set one first
     * @param {HTMLElement} element - Target element for getting/setting the ID
     * @returns {String} ID of the element
     */
    static setAriaIdIfNecessary(element) {
        if (!element.id) {
            $(element).attr(`id`, `bkn-${this.idCounter + 1}`);
        }
        return element.id;
    }

    /**
     * Makes some nodes to be owned by an element
     * @param {HTMLElement} parentElement - The parent element which will own the nodes
     * @param {node} listOfNodes - The list of the nodes
     */
    static makeElementOwn(parentElement, listOfNodes) {
        const ids = [];
        for (const node of listOfNodes) {
            ids.push(this.setAriaIdIfNecessary(node));
        }
        $(parentElement).attr(`aria-owns`, ids.join(` `));
    }

    /** * Define the actual tweaks. ** */

    /**
     * Tweaks that only need to be applied on load.
     */
    LOAD_TWEAKS = [];

    /**
     * Attributes that should be watched for changes and cause dynamic tweaks to be
     * applied. For example, if there is a dynamic tweak which handles the state of
     * a check box and that state is determined using an attribute, that attribute
     * should be included here.
     */
    DYNAMIC_TWEAK_ATTRIBUTES = [];

    /**
     * Tweaks that must be applied whenever a node is added/changed.
     */
    DYNAMIC_TWEAKS = [
        {
            selector: `#`,
            // eslint-disable-next-line no-unused-vars
            tweak: (_element) => {},
        },
    ];

    /**
     * Function to apply the tweaks when appropriate
     * @param {HTMLElement} element - Element for which we want to apply the tweak
     * @param {*} tweak - Tweak to apply
     */
    static applyTweak(element, tweak) {
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
    static applyTweaks(root, tweaks, checkRoot) {
        for (const tweak of tweaks) {
            for (const element of root.querySelectorAll(tweak.selector)) {
                this.applyTweak(element, tweak);
            }
            if (checkRoot && root.matches(tweak.selector)) {
                this.applyTweak(root, tweak);
            }
        }
    }

    observer = new MutationObserver((mutations) => {
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
                        this.applyTweaks(node, this.DYNAMIC_TWEAKS, true);
                    }
                } else if (mutation.type === `attributes`) {
                    this.applyTweaks(
                        mutation.target,
                        this.DYNAMIC_TWEAKS,
                        true,
                    );
                }
            } catch (e) {
                // Catch exceptions for individual mutations so other mutations are still handled.
                console.log(`Exception while handling mutation: ${e}`);
            }
        }
    });
}
