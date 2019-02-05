/**
 * Sample automated test scenario for Nightwatch.js
 *
 * > it navigates to google.com and searches for nightwatch,
 *   verifying if the term 'The Night Watch' exists in the search results
 */

module.exports = {
  '@disabled': true,

  'demo test shinkin' : function (client) {
    client
      .url('http://10.9.118.48/est/webfb/wfblin000.do?Code=MTI3Nw==')
      .waitForElementPresent('body', 6000)
      .assert.title('ログイン')
      .assert.visible('input[name="userid"]')
      .setValue('input[name="userid"]', 'btitouknzf12')
      .assert.visible('input[name="passwd"]')
      .setValue('input[name="passwd"]', 'bt123456')
      .assert.visible('input[name="wfblin001"]')
      .waitForElementVisible('input[name="wfblin001"]', 1000)
      .click('input[name="wfblin001"]')
      .pause(1000)
      .waitForElementPresent('body', 6000)
      .assert.title('メイン')
      .click('input[name="SYP0031002"]')
      .pause(1000)
      .end();
  },

  'part two' : function (client) {
    client
      .url('http://10.9.118.48/est/webfb/wbolin000.do?Code=MTI3Nw==')
      .waitForElementPresent('body', 6000)
      .assert.title('ログイン')
      .assert.visible('input[name="userid"]')
      .setValue('input[name="userid"]', '1277kinkont')
      .assert.visible('input[name="passwd"]')
      .setValue('input[name="passwd"]', 'JikiAdmin2')
      .assert.visible('input[name="wbolin001"]')
      .waitForElementVisible('input[name="wbolin001"]', 1000)
      .click('input[name="wbolin001"]')
      .pause(1000)
      .waitForElementPresent('body', 6000)
      .useXpath()
      .click("//*[contains(text(), 'ログアウト')]")
      .useCss()
      .pause(1000)
      .end();
  }

};
