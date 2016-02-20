# Nxus Mailer

[![Build Status](https://travis-ci.org/nxus/mailer.svg?branch=master)](https://travis-ci.org/nxus/mailer)

A Nxus module for sending emails through different services. 

## Installation

    > npm install @nxus/mailer --save

## Usage

### Register a mail service

    app.get('mailer').service(myService)

Each service is expected to implement a method called `sendMessage` with the signature

    sendMessage(to, from, subject, content, opts) {
    ...
    }

### Send an email using a service

    app.get('mailer').send('to@address', 'from@address', "My subject", "Body content", {some: opts})

#### Opts

The opts hash can be used to send service specific opts back to the mail handler.  For example:

    // Mandrill opts
    app.get('mailer').send('to@address', 'from@address', "My subject", "Body content", { async: true })

## API
