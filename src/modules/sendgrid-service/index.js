/* 
* @Author: Mike Reich
* @Date:   2016-01-26 12:02:01
* @Last Modified 2016-09-13
*/

'use strict';

import _ from 'underscore';
import moment from 'moment';
import Promise from 'bluebird';
import marked from 'marked';

import SendGrid from 'sendgrid';

import {application as app, NxusModule} from 'nxus-core'
import {mailer} from '../../'

/**
 * A default service for mailing with Sendgrid.
 */
class Sendgrid extends NxusModule {
  constructor() {
    super()

    if(!this.config.apiUsername || !this.config.apiPassword) {
      this.log.warn('No SendGrid credentials specified, ignoring. To use sendGrid, set apiUsername and apiKey in .nxusrc');
      return
    }

    mailer.service(this)
    
    this.client = new SendGrid(this.config.apiUsername, this.config.apiPassword);
  }

  _userConfig() {
    return {
      apiUsername: "",
      apiPassword: ""
    }
  }

  /**
   * Sends an email via sendgrid
   * @param  {String} to      [description]
   * @param  {String} from    [description]
   * @param  {String} subject [description]
   * @param  {String} text    [description]
   * @param  {Object} opts    [description]
   */
  send(to, from, subject, text, opts) {
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

var sendgrid = Sendgrid.getProxy()

export {Sendgrid as default, sendgrid}
