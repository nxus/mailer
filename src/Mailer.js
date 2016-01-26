/* 
* @Author: Mike Reich
* @Date:   2016-01-26 11:48:16
* @Last Modified 2016-01-26
*/

'use strict';

import MandrilService from './MandrilService'

export default class Mailer {

  constructor(app) {
    new MandrilService(app)

    this.app = app;
    this.mailer = app.get('mailer')

    this._services = [];
    this.mailer.gather('service', this._registerService.bind(this))
  }

  _registerService(service) {
    console.log('registering service')
    this.mailer.respond('send', service.sendMessage.bind(service))
  }
} 