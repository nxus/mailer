/* 
* @Author: Mike Reich
* @Date:   2016-01-26 12:02:01
* @Last Modified 2016-01-26
*/

'use strict';

import _ from 'underscore';
import moment from 'moment';
import Promise from 'bluebird';

import Mandrill from 'mandrill-api/mandrill';

const mailerConfig = {}

export default class MandrilSerivce {
  
  constructor(app) {
    this.app = app;
    app.get('mailer').provide('service', this)
    this.api_key = app.config.MANDRILL_APIKEY || app.config.mailer.api_key
    if(!this.api_key) throw new Error('No Mandrill APIKEY specified');
  }

  sendMessage(to, from, subject, content, opts) {
    if(!_.isArray(to)) to = [to]
    to = _.map(to, (email) => {
      return {email}
    })
    var message = _.extend({to, subject, text: content, from_email: from}, opts);
    var async = false
    var ip_pool = null
    this.client = new Mandrill.Mandrill(this.api_key);
    return new Promise((resolve, reject) => {
      this.client.messages.send({message, async: async, ip_pool}, resolve, reject)
    })
  }
}