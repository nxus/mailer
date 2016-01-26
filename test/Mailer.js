/* 
* @Author: Mike Reich
* @Date:   2016-01-26 12:17:34
* @Last Modified 2016-01-26
*/

'use strict';

import Mailer from '../src/Mailer'
import MandrilService from '../src/MandrilService'

import TestApp from '@nxus/core/lib/test/support/TestApp';

describe("Mailer", () => {
  var mailer;
  var app = new TestApp();
 
  beforeEach(() => {
    app = new TestApp();
    app.config = Object.assign(app.config, process.env);
  });
  
  describe("Load", () => {
    it("should not be null", () => Mailer.should.not.be.null)

    it("should be instantiated", () => {
      mailer = new Mailer(app);
      mailer.should.not.be.null;
    });
  });

  describe("Init", () => {
    beforeEach(() => {
      mailer = new Mailer(app);
    });

    it("should have config after load", () => {
      return app.emit('load').then(() => {
        mailer.should.have.property('app');
        mailer.app.should.have.property('config');
      });
    });

    it("should register a gather for models", () => {
      return app.emit('load').then(() => {
        app.get.calledWith('mailer').should.be.true;
        app.get().gather.calledWith('service').should.be.true;
      });
    })
  });
})

describe("MandrilService", () => {
  var app = new TestApp();
  var mandril
 
  beforeEach(() => {
    app = new TestApp();
    app.config = Object.assign(app.config, process.env);
  });
  describe("Send", () => {
    beforeEach(() => {
      mandril = new MandrilService(app);
    });

    it("should send an email", (done) => {
      return app.emit('startup').then(() => {
        var message = "test email body"
        var to = "mjreich@gmail.com"
        var subject = "test email subject"
        var opts = {}
        var from = app.config.FROM_EMAIL
        return mandril.sendMessage(to, from, subject, message, opts).then((status) => {
          status.length.should.be.above(0)
          status[0].should.have.property('status')
          status[0].status.should.equal('sent')
          done()
        }).catch(done)
      });
    })
  })
})