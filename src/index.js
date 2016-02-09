/* 
* @Author: Mike Reich
* @Date:   2016-01-26 11:48:16
* @Last Modified 2016-02-09
*/

'use strict';

import MandrillService from './MandrillService'

export default class Mailer {

  constructor(app) {
    this.app = app;
    app.get('mailer').use(this)
    .gather('service')

    if((app.config.mandrill && app.config.mandrill.api_key) || this.app.config.MANDRILL_APIKEY) new MandrillService(app)

    this._services = [];
  }

  service(service) {
    this.respond('send', service.sendMessage.bind(service))
  }
} 