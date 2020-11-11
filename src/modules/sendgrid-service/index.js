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

import SendGrid from '@sendgrid/mail';

import {application as app, NxusModule} from 'nxus-core'
import {mailer} from '../../'

/**
 * A default service for mailing with Sendgrid.
 */
class Sendgrid extends NxusModule {
  constructor() {
    super()

    if(!this.config.apiKey) {
      this.log.warn('No SendGrid credentials specified, ignoring. To use sendGrid, set apiKey in .nxusrc');
      return
    }

    mailer.service(this)
    SendGrid.setApiKey(this.config.apiKey)
  }

  _userConfig() {
    return {
      apiKey: "",
    }
  }

  /**
   * Sends an email via sendgrid
   * @param  {String} to      email address, or array of email addresses
   * @param  {String} from    [description]
   * @param  {String} subject [description]
   * @param  {String} text    [description]
   * @param  {Object} opts    [description]
   */
  send(to, from, subject, text, opts) {
    this.log.debug('Sending email via SendGrid to', to)
    let isMultiple = false
    // This instructs sendgrid to send messages to each recipient, rather than one to all of them
    // So can override in opts if needed
    if(_.isArray(to)) isMultiple = true
    var message = _.extend({to, subject, text, from, isMultiple}, opts);
    if(opts.html && text == opts.html) opts.html = marked(opts.html)
    return SendGrid.send(message)
  }
}

var sendgrid = Sendgrid.getProxy()

export {Sendgrid as default, sendgrid}
