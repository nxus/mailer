/* 
* @Author: Mike Reich
* @Date:   2016-01-26 12:17:34
* @Last Modified 2016-05-20
*/

'use strict';

import Mailer from '../src'
import SendgridService from '../src/SendgridService'

describe("Mailer", () => {
  var mailer;
   
  describe("Load", () => {
    it("should not be null", () => {
      Mailer.should.not.be.null
      SendgridService.should.not.be.null
    })

    it("should be instantiated", () => {
      mailer = new Mailer();
      mailer.should.not.be.null;
    });
  });

  describe("Init", () => {
    beforeEach(() => {
      mailer = new Mailer();
    });

    it("should register a gather for mail services", () => {
      mailer.service.should.not.be.null
    })
    it("should register a gather for mail send", () => {
      mailer.send.should.not.be.null
    })
  });
})
