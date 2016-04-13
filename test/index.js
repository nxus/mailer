/* 
* @Author: Mike Reich
* @Date:   2016-01-26 12:17:34
* @Last Modified 2016-04-13
*/

'use strict';

import Mailer from '../src'
import SendgridService from '../src/SendgridService'

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

    it("should register a gather for mail services", () => {
      return app.emit('load').then(() => {
        app.get.calledWith('mailer').should.be.true;
        app.get().gather.calledWith('service').should.be.true;
      });
    })
  });
})