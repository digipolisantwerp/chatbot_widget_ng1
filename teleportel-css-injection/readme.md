# Telportel CSS Injection

## Introduction

Teleportel as 3rd party software provides the means to override certain css properties in the chat window they have created.

An example chat window can be found [here](https://talk.attendedbyhumans.com/tbv1/call_chat_design.php?agent=santwerp)


## Steps

The method to change something in the CSS is rather old fashioned, where they provide a window with a textarea in which you can paste your CSS.

We keep all CSS in this folder, in the `santwerp.css` file. This content needs to be pasted in the window they provide:

1. visit this [page](https://talk.attendedbyhumans.com/tbv1/custom/?agent=santwerp)
1. paste the content of `santwerp.css` in the textbox
1. hit submit
1. refresh the chat window and see your changes.
1. commit your changes to `santwerp.css` to this repository in order to keep track of changes.

## Teleportel documentation

the [Teleportel documentation site](https://www.teleportel.com/doc/index.html) shows us specific documentation regarding the [CSS injection](https://www.teleportel.com/doc/injectcss.html). It does explain where to replace the css for both the visitor and the agent (this last one was not available at the time of the original implementation but seems to be available now).

## remarks

1. It was orignally not possible to inject css for the agent view. This seems to be available now (at least their documentation page hints to that) It would be logical to add a second css file which describes the `santwerp-agent.css` or similar naming.

1. always verify the urls you use, as there is a different page to inject css in for the production environment. These urls changed after the original scope when going live, and are unknown to us now.