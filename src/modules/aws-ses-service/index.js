'use strict'

import {SESClient, SendEmailCommand} from '@aws-sdk/client-ses'

import _ from 'underscore'
import {htmlToText} from 'html-to-text'
import isHTML from 'is-html'

import {NxusModule} from 'nxus-core'
import {mailer} from '../../'

/**
 * A default service for mailing with the AWS SES API.
 *
 * Configuration has these properties:
 * *   `region`
 * *   `credentials`
 *     *   `accessKeyId`
 *     *   `secretAccessKey`
 */
class MailerAwsSES extends NxusModule {
  constructor() {
    super()

    if (_.isEmpty(this.config)) {
      this.log.warn('No AWS SES configuration specified, ignoring. To use the AWS SES, set configuration in .nxusrc')
      return
    }

    this.config = {...MailerAwsSES._defaultConfig, ...this.config,
      credentials: {...MailerAwsSES._defaultConfig.credentials, ...this.config.credentials} }
    this._sesClient = new SESClient({region: this.config.region, credentials: this.config.credentials})

    mailer.service(this)
  }

  static get _defaultConfig() {
    return {
      region: 'us-east-1',
      credentials: {},
      fromAddress: '' // or source?
    }
  }

  /**
   * Sends an email.
   * @param  {String|Array<String>} to - recipient email addresses
   * @param  {String} from - sender email address
   * @param  {String} subject - message subject
   * @param  {String} content - message content, either HTML or plain
   *   text; if HTML, a plain text fallback will also be sent
   * @param  {Object} options:
   * *   `html` - HTML message content
   * *   other options are added to the message data passed to the SES
   *     `SendEmailCommand` object (e.g. ConfigurationSetName,
   *     ReturnPath)
   */
  async send(to, from, subject, content, options) {
    if (!Array.isArray(to)) to = [to]

    this.log.debug(`Sending email via AWS SES to ${to.join(', ')}`)

    let body = {}
    if (isHTML(content))
      body.Html = {Charset: 'UTF-8', Data: content}
    else
      body.Text = {Charset: 'UTF-8', Data: content}
    if (options.html) {
      body.Html = {Charset: 'UTF-8', Data: options.html}
      delete options.html
    }
    if (!body.Text)
      body.Text = {Charset: 'UTF-8', Data: htmlToText(body.Html || '', {}) }

    let cmd = new SendEmailCommand({
      ...options,
      Destination: {ToAddresses: to, CcAddresses: [] },
      Message: { Body: body, Subject: {Charset: 'UTF-8', Data: subject} },
      Source: from,
      ReplyToAddresses: []
    })

    try {
      await this._sesClient.send(cmd)
    }
    catch (e) {
      this.log.debug(`Sending email via AWS SES failed, ${e.message}`)
    }
  }

}

let mailerAwsSES = MailerAwsSES.getProxy()

export {MailerAwsSES as default, mailerAwsSES}
