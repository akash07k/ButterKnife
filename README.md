# ButterKnife <!-- omit in toc -->

**Warning: forced push anytime. Be careful!**

-   Author: Akash Kakkar
-   Copyright: 2022 Akash Kakkar
-   License: [GNU Affero General Public License V3](LICENSE.md)
-   What's New: [ChangeLog](CHANGELOG.md)

    ButterKnife is a browser extension to improve and enhance the accessibility as well as usability of various sites across the web.

# Table of Contents <!-- omit in toc -->

- [How to use](#how-to-use)
- [Features](#features)
  - [GitHub Accessibility Fixes](#github-accessibility-fixes)
  - [Universal Enhancements](#universal-enhancements)
  - [DOM Capture (Torch Mode)](#dom-capture-torch-mode)
    - [What it does:](#what-it-does)

## How to use

-   todo

## Features

Extension currently contains following features:

### GitHub Accessibility Fixes

-   Converts many links/controls into buttons for better navigation such as:

    -   Prenotification control: (The Notification control which displays when we are not signed in)
    -   Prefork control: (The Fork Repository control which displays when we are not signed in)
    -   Fork Repository control
    -   Prestar control: (The Star Repository control which displays when we are not signed in)

-   Assigns the AccessKey for Fork Repository control for quicker action
-   Assigns the AccessKey for Issues tab for quicker action
-   Makes the Issue listings more accessible by implementing each issue title in heading and associating their status

### Universal Enhancements
- Implements DOM capture feature for quickly capturing the CSS path (selector), XPath (locator) and source of an element.

### DOM Capture (Torch Mode)
This feature is specifically developed so that we can copy the CSS path, XPath and source of any element to the clipboard very quickly without changing the focus.
While developing/testing the web applications, we hugely require the CSS path, XPath and source of a DOM element;
But interacting back and fourth with the inspect tool is a mess especially for screen reader users. Because it takes our focus away from the web page and this makes us less productive then usual.
Not only this, in inspect/dev tools also, there are no shortcut keys for copying the CSS path (selector) or XPath (locator) to the clipboard which is a pain.

#### What it does:
- implements the hotkeys for quickly capturing the CSS path (selector), XPath (locator) and source code of a DOM element:
* Alt+Shift+1 for quickly copying the CSS path of the element to the clipboard
* Alt+Shift+2 for copying the source of the element to the clipboard
* Alt+Shift+3 for copying the XPath of the element to the clipboard

- Implements a special mode called Torch mode which will help a user in capturing the CSS path (selector), XPath (locator) and source of a DOM element with great precision. (This special mode works even in screen reader specific modes such as Virtual Cursor mode of JAWS and Browse mode of NVDA):
* Alt+Shift+A to turn on Torch mode
* While Torch mode is on:
+ Enter to copy the CSS path to the clipboard
+ Alt+Shift+S to copy the source to the clipboard
+ Alt+Shift+X to copy the XPath to the clipboard



