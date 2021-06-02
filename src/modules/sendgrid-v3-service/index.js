'use strict'

import marked from 'marked'

import sendgridMail from '@sendgrid/mail'
import {htmlToText} from 'html-to-text'
import isHTML from 'is-html'

import {NxusModule} from 'nxus-core'
import {mailer} from '../../'

/**
 * A default service for mailing with SendGrid v3 API.
 */
class SendgridV3 extends NxusModule {
  constructor() {
    super()

    if (!this.config.apiKey) {
      this.log.warn('No SendGrid credentials specified, ignoring. To use sendgrid-v3, set apiKey in .nxusrc')
      return
    }

    this._apiKey = this.config.apiKey
    this._lastApiKey = ''
    mailer.service(this)
  }

  _userConfig() {
    return {
      apiKey: ""
    }
  }

  /**
   * Sends an email via sendgrid
   * @param  {String} to - recipient email address
   * @param  {String} from - sender email address
   * @param  {String} subject - message subject
   * @param  {String} content - message content, either HTML or plain
   *   text; if HTML, a plain text fallback will also be sent
   * @param  {Object} options
   * *   `apiKey` **String** - SendGrid API Key (to override API Key on
   *       a per-message basis)
   * *   other options are added to the message data passed to the
   *     SendGrid `send()` method
   * @return {Promise} resolves when messages have been sent
   */
  send(to, from, subject, content, options) {
    this.log.debug('Sending email via SendGrid to', to)
    if (!Array.isArray(to)) to = [to]

    let apiKey = options.apiKey || this._apiKey
    delete options.apiKey
    if (apiKey !== this._lastApiKey) {
      sendgridMail.setApiKey(apiKey)
      this._lastApiKey = apiKey
    }

    let message = {from, subject}
    if (!isHTML(content))
      message.text = content
    else {
      message.html = content
      message.text = htmlToText(content, {})
    }
    message = {...message, ...options}

    return Promise.all(to.map(async (to) => {
      let rslt
      try {
        rslt = await sendgridMail.send({...message, to})
      }
      catch (e) {
        rslt = e
      }
      return rslt
    }))

  }
}

let sendgridV3 = SendgridV3.getProxy()

export {SendgridV3 as default, sendgridV3}
