# @nxus/mailer

## 

[![Build Status](https://travis-ci.org/nxus/mailer.svg?branch=master)](https://travis-ci.org/nxus/mailer)

A Nxus module for sending emails through different services. 

### Installation

    > npm install @nxus/mailer --save

### Usage

#### Register a mail service

    app.get('mailer').service(myService)

Each service is expected to implement a method called `sendMessage` with the signature

    sendMessage(to, from, subject, content, opts) {
    ...
    }

#### Send an email using a service

    app.get('mailer').send('to@address', 'from@address', "My subject", "Body content", {some: opts})

##### Opts

The opts hash can be used to send service specific opts back to the mail handler.  For example:

    // Mandrill opts
    app.get('mailer').send('to@address', 'from@address', "My subject", "Body content", { async: true })

## API

* * *

## Mailer

The main Mailer class.

### service

Register a service.  See MandrillService for an example.

**Parameters**

-   `service` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a Class or callable that implements a method called `sendMessage`.

## MandrillSerivce

A default service for mailing with Mandrill.
