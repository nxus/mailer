/* 
* @Author: Mike Reich
* @Date:   2016-01-26 12:02:01
* @Last Modified 2016-04-14
*/

'use strict';

import _ from 'underscore';
import moment from 'moment';
import Promise from 'bluebird';
import marked from 'marked';

import SendGrid from 'sendgrid';


import {application as app, NxusModule} from 'nxus-core'
import {mailer} from './index'

/**
 * A default service for mailing with Sendgrid.
 */
export default class SendgridService extends NxusModule {
  constructor() {
    super()
    mailer.service(this)
    this.api_username = app.config.SENDGRID_USERNAME || (app.config.sendgrid && app.config.sendgrid.api_username)
    this.api_password = app.config.SENDGRID_PASSWORD || (app.config.sendgrid && app.config.sendgrid.api_password)
    if(!this.api_username || !this.api_password) throw new Error('No SendGrid credentials specified');
    this.client = new SendGrid(this.api_username, this.api_password);
  }

  sendMessage(to, from, subject, text, opts) {
    this.log.debug('Sending email via SendGrid to', to)
    if(!_.isArray(to)) to = [to]
    return Promise.each(to, (t) => {
      var message = _.extend({to: t, subject, text, from}, opts);
      if(opts.html && text == opts.html) opts.html = marked(opts.html)
      return new Promise((resolve, reject) => {
        this.client.send(message, (err, json) => {
          if(err) console.log(err)
          if(err) return reject(err)
          return resolve(json)
        })
      })
    })
  }
}
