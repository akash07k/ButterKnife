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
        selector: `main.w-full .border-b`,
        tweak: (element) => {
            const CHAT_TEXT_SELECTOR = '.markdown';
            const chatContainer = document.querySelector(`main`);
            const chatBubbles = chatContainer.querySelectorAll(`main.w-full .border-b`);
            const clipboardButtonClassName = 'copy-to-clipboard';
            var plusUser = (chatBubbles.length % 2 === 0) ? false : true;
            chatBubbles.forEach((chatbox, bubble) => {
                //first chat box needs to be from user, hence all the even chat bubbles are from bot
                //plus users will have the first row as model selection
                if ((bubble > 0 && (bubble % 2 === 0) && plusUser) ||
                    ((bubble + 1) % 2 === 0 && !plusUser)) {
                    //it is a chat box from bot
                    const addAfter = chatbox.querySelector(CHAT_TEXT_SELECTOR);
                    if (chatbox.querySelector(`.${clipboardButtonClassName}`) === null) {
                        addAfter.insertAdjacentHTML('afterend', `<div style="display: flex; align-items: center; color: lightslategray;" class="copy-to-clipboard">
                    <button>Copy to Clipboard</button>
                    </div>`);

                        chatbox.querySelector(`.${clipboardButtonClassName}`).addEventListener('click', function () {
                            const text = chatbox.querySelector(CHAT_TEXT_SELECTOR).innerText;
                            _common.copyToClipboard(text);
                        });
                    }


                }

            })

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
