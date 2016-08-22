# nxus-mailer

## 

[![Build Status](https://travis-ci.org/nxus/mailer.svg?branch=master)](https://travis-ci.org/nxus/mailer)

A Nxus module for sending emails through different services. 

### Installation

    > npm install nxus-mailer --save

### Usage

#### Register a mail service

    app.get('mailer').service(myService)

Each service is expected to implement a method called `sendMessage` with the signature

    sendMessage(to, from, subject, content, opts) {
    ...
    }

Alternatively, you can specify an array of to addresses:

    sendMessage([toAddress, toAddress2], from, subject, content, opts) {
    ...
    }

#### Send an email using a service

    app.get('mailer').send('to@address', 'from@address', "My subject", "Body content", {some: opts})

##### Opts

The opts hash can be used to send service specific opts back to the mail handler.  For example:

    // SendGrid opts
    app.get('mailer').send('to@address', 'from@address', "My subject", "Body content", {html: "<p>Html content</p>"})

## API

* * *

## index

The main Mailer class.

## service

Register a service.  See MandrillService for an example.

**Parameters**

-   `service` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a Class or callable that implements a method called `sendMessage`.

## SendgridService

A default service for mailing with Mandrill.
