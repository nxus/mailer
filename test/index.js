/* 
* @Author: Mike Reich
* @Date:   2016-01-26 12:17:34
* @Last Modified 2016-09-13
*/

'use strict'

import Mailer from '../src'

describe("Mailer", () => {
  let mailer
   
  describe("Load", () => {
    it("should not be null", () => {
      expect(Mailer).not.toBeNull()
    })

    it("should be instantiated", () => {
      mailer = new Mailer()
      expect(mailer).not.toBeNull()
    })
  })

  describe("Init", () => {
    beforeEach(() => {
      mailer = new Mailer()
    })

    it("should register a gather for mail services", () => {
      expect(mailer.service).not.toBeNull()
    })
    it("should register a gather for mail send", () => {
      expect(mailer.send).not.toBeNull()
    })
  })
})
