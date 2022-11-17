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
- Implements DOM capture feature for quickly capturing the path and source of an element.

### DOM Capture (Torch Mode)

- implements the hotkeys for quickly capturing the path and source code of a DOM element:
* Alt+Shift+1 for quickly copying the CSS path of the element to the clipboard
* Alt+Shift+2 for copying the source of the element to the clipboard


- Implements a special mode called Torch mode which will help a user in capturing the path and source of a DOM element with great precision. (This special mode works even in screen reader specific modes such as Virtual Cursor mode of JAWS and Browse mode of NVDA):
* Alt+Shift+A to turn on Torch mode
* While Torch mode is on:
+ Enter to copy the CSS path to the clipboard
+ Alt+Shift+S to copy the source to the clipboard


