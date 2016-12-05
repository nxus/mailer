/* 
* @Author: Mike Reich
* @Date:   2016-01-26 11:48:16
* @Last Modified 2016-09-13
*/

'use strict';

import {application, NxusModule} from 'nxus-core'

/**
 * [![Build Status](https://travis-ci.org/nxus/mailer.svg?branch=master)](https://travis-ci.org/nxus/mailer)
 * 
 * A Nxus module for sending emails through different services. 
 * 
 * ## Installation
 * 
 *     > npm install nxus-mailer --save
 * 
 * ## Usage
 * 
 * ### Register a mail service
 * 
 *     mailer.service(myService)
 * 
 * Each service is expected to implement a method called `sendMessage` with the signature
 * 
 *     sendMessage(to, from, subject, content, opts) {
 *     ...
 *     }
 *
 * Alternatively, you can specify an array of to addresses:
 *
 *     sendMessage([toAddress, toAddress2], from, subject, content, opts) {
 *     ...
 *     }
 * 
 * ### Send an email using a service
 * 
 *     mailer.send('to@address', 'from@address', "My subject", "Body content", {some: opts})
 * 
 * #### Opts
 * 
 * The opts hash can be used to send service specific opts back to the mail handler.  For example:
 * 
 *     // SendGrid opts
 *     mailer.send('to@address', 'from@address', "My subject", "Body content", {html: "<p>Html content</p>"})
 * 
 */
class Mailer extends NxusModule {

  constructor() {
    super()

    this._services = []
  }

  /**
   * Register a service.  See SendgridService for an example.
   * @param  {function} service a Class or callable that implements a method called `sendMessage`.
   */
  service(service) {
    this._services.push(service)
  }

  /**
   * Sends an email.  Should be overridden by the sending service, but generally will take the following parameters
   * @param  {String} to      The email address to send to
   * @param  {String} from    The from email to send from
   * @param  {String} subject The subject text
   * @param  {String} body    The message text
   * @param  {Object} options An objects containing 
   */
  send(...args) {
    this._services.forEach((service) => {
      service.send(...args)
    })
  }
} 

let mailer = Mailer.getProxy()
export {Mailer as default, mailer}
