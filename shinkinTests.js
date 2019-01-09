module.exports = {
  'Login test': function (client) {
    client.url('http://10.9.XXX.XX/est/web/lin000.do?Code=')
      .setValue('#userId', 'XXXX')
      .setValue('#password', 'XXXX')
      .click('#submit')
      .assert.urlEquals('http://10.9.XXX.XX/XX/web/lin001.do')
      .end();
  }
};