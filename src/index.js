/* 
* @Author: Mike Reich
* @Date:   2016-01-26 11:48:16
* @Last Modified 2016-02-20
*/
/**
 * [![Build Status](https://travis-ci.org/nxus/mailer.svg?branch=master)](https://travis-ci.org/nxus/mailer)
 * 
 * A Nxus module for sending emails through different services. 
 * 
 * ## Installation
 * 
 *     > npm install @nxus/mailer --save
 * 
 * ## Usage
 * 
 * ### Register a mail service
 * 
 *     app.get('mailer').service(myService)
 * 
 * Each service is expected to implement a method called `sendMessage` with the signature
 * 
 *     sendMessage(to, from, subject, content, opts) {
 *     ...
 *     }
 * 
 * ### Send an email using a service
 * 
 *     app.get('mailer').send('to@address', 'from@address', "My subject", "Body content", {some: opts})
 * 
 * #### Opts
 * 
 * The opts hash can be used to send service specific opts back to the mail handler.  For example:
 * 
 *     // Mandrill opts
 *     app.get('mailer').send('to@address', 'from@address', "My subject", "Body content", { async: true })
 * 
 * # API
 * ----
 */

'use strict';

import MandrillService from './MandrillService'

/**
 * The main Mailer class.
 */
export default class Mailer {

  constructor(app) {
    this.app = app;
    app.get('mailer').use(this)
    .gather('service')

    if((app.config.mandrill && app.config.mandrill.api_key) || this.app.config.MANDRILL_APIKEY) new MandrillService(app)

    this._services = [];
  }

  /**
   * Register a service.  See MandrillService for an example.
   * @param  {function} service a Class or callable that implements a method called `sendMessage`.
   */
  service(service) {
    this.respond('send', service.sendMessage.bind(service))
  }
} 