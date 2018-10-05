module.exports = {
  'Login test': function (client) {
    client.url('http://10.9.118.48/est/webfb/wbolin000.do?Code=MTI3Nw==')
      .setValue('#userId', '1277kinkont')
      .setValue('#password', 'JikiAdmin2')
      .click('#submit')
      .assert.urlEquals('http://10.9.118.48/est/webfb/wbolin001.do')
      .end();
  }
};