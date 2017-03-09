# wordsockets-demo-theme
A barebones theme that demonstrates the usage of WordSockets.

## Installation

Download ZIP and install like any other WordPress theme. Make sure you also have the WordSockets plugin installed.

## What's happening

This theme exists to demonstrate the power of WordSockets – nothing more. There's just an `index.php` file with a loop and a single enqueued JavaScript file.

The JavaScript file demonstrates how the different methods of the WordSockets JavaScript API can be used. Sample handlers are written for the following events:

* A new post is added _(post is appended to the top of the document and an alert is shown)_
* A post is updated _(post receives a yellow border and a note about the time modified)_
* A post is flagged as being edited by a site admin _(post receives an orange border and a note about who's editing)_
* A user submits a comment _(comment is automatically displayed for all users)_
* A remote user begins typing a comment _(the user's name is displayed to all users)_
* A remote user stops typing a content _(the user's name is removed from the list of currently-typing users)_
* A local user begins typing a comment _(the user's name is displayed to all users)_
* A local user stops typing a comment _(the user's name is removed from the list of currently-typing users for all users)_

Data passed to each handler callback is documented in `app.js`.
