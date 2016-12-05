# nxus-mailer

## Mailer

**Extends NxusModule**

[![Build Status](https://travis-ci.org/nxus/mailer.svg?branch=master)](https://travis-ci.org/nxus/mailer)

A Nxus module for sending emails through different services. 

### Installation

    > npm install nxus-mailer --save

### Usage

#### Register a mail service

    mailer.service(myService)

Each service is expected to implement a method called `sendMessage` with the signature

    sendMessage(to, from, subject, content, opts) {
    ...
    }

Alternatively, you can specify an array of to addresses:

    sendMessage([toAddress, toAddress2], from, subject, content, opts) {
    ...
    }

#### Send an email using a service

    mailer.send('to@address', 'from@address', "My subject", "Body content", {some: opts})

##### Opts

The opts hash can be used to send service specific opts back to the mail handler.  For example:

    // SendGrid opts
    mailer.send('to@address', 'from@address', "My subject", "Body content", {html: "<p>Html content</p>"})

### service

Register a service.  See SendgridService for an example.

**Parameters**

-   `service` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a Class or callable that implements a method called `sendMessage`.

### send

Sends an email.  Should be overridden by the sending service, but generally will take the following parameters

**Parameters**

-   `to` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The email address to send to
-   `from` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The from email to send from
-   `subject` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The subject text
-   `body` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The message text
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** An objects containing
-   `args` **...Any** 
