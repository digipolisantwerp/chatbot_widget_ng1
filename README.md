# Chatbot Smart Widget UI (AngularJS)

With the chatbot smart widget you can simply implement a chatbot in any page.

You will also need the BFF package in order to get the chatbot smart widget to work: [http://github.com/digipolisantwerp/chatbot_service_nodejs](http://github.com/digipolisantwerp/chatbot_service_nodejs)

<img src="screenshot.png" alt="Chatbot screenshot" width="410" style="max-width:410px;width:100%">

There is a demo app, see below for instructions on running it.

## How to use

### Installing

To install this package use bower 

`bower install 'https://github.com/digipolisantwerp/chatbot_widget_ng1.git#^0.x.x'`.

Include `akit.component.chatbotWidget` as module.

### In your template

```html
<aui-chatbot-widget
  url="http://localhost:3000/api/bff"
  session="123456789"
  title="My chatbot"
  placeholder="Type your message here…"
  pinned="false"
  pinnedText="Need help?"
  delay="200"
  height="400">
</aui-chatbot-widget>
```

### Supported attributes

#### **url**

`string` BFF URL.

#### **session**

`string` Required session ID for the chatbot engine, where each chat conversation is linked to its chat session. It's important to use a unique id, since all session data, like answers already given, are stored in the chatbot engine.

#### **title**

`string` Title above the chat window.

#### **pinned**

`boolean` Whether the chatbot is inline or pinned to the bottom of the application.

#### **pinnedText**

`string` The text shown on the pinned button. Default: "Een vraag stellen".

#### **placeholder**

`string` Placeholder string in the chat input field. Default: ""

#### **delay**

`number` Delay in ms between multiple messages received from the chatbot engine. Default: 400.

#### **height**

`number` Height of the chatbot in pixels. Default: 400.

## Run the demo app

Run `npm install && bower install`.

Then run `gulp build && gulp serve`, then navigate to `./example/index.html' in the browser.

To interact with the chatbot widget you will have to set up the corresponding BFF service,
as well as adjust necessary parameters in `example/index.html`.

### Developing

Use `gulp` to have a watcher running for code changes.

`gulp bump:major` for major build increase and tag on the current branch.

`gulp bump:minor` for minor build increase and tag on the current branch.

`gulp bump:patch` for patch build increase and tag on the current branch.

Use `gulp serve` to selfhost the app. Navigate to `./example/index.html' to view the app.
