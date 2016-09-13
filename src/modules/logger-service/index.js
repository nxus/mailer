/*
* @Author: mike
* @Date:   2016-09-13 08:14:14
* @Last Modified 2016-09-13
* @Last Modified time: 2016-09-13 08:52:12
*/

'use strict';

import _ from 'underscore';
import moment from 'moment';
import Promise from 'bluebird';
import marked from 'marked';

import {application as app, NxusModule} from 'nxus-core'
import {mailer} from '../../'

/**
 * A default service for mailing with Sendgrid.
 */
class EmailLogger extends NxusModule {
  constructor() {
    super()
    mailer.service(this)
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
    this.log.debug('Sending email', {to, from, subject, text, opts})
  }
}

var emailLogger = EmailLogger.getProxy()

export {EmailLogger as default, emailLogger}
