/**
 * 総合振込、給与賞与振込、都度振込、口座振替のデータをセットアップする。
 *
 */
//企業URL
var comUrl = "http://10.9.118.48/est/webfb/wfblin000.do?Code=NTEwNA==";
//企業ログインID
var comId = "5104master1";
//企業ログインパスワード
var comPassword = "nttd11";
//金庫URL
var bankUrl = "http://10.9.118.48/est/webfb/wbolin000.do?Code=NTEwNA==";
//金庫ログインID
var bankId = "master5104";
//金庫ログインパスワード
var bankPassword = "5104mas";
var func = require('../lib/func/func.js');

var eigyoDate = func.getEigyoDate(new Date());

module.exports = {
  '@disabled': false,


  'demo test 帳票データセットアップ' : function (client) {
    client
      .url(comUrl)
      .waitForElementPresent('body', 6000)
      .assert.title('ログイン')
      .assert.visible('input[name="userid"]')
      .setValue('input[name="userid"]', comId)
      .assert.visible('input[name="passwd"]')
      .setValue('input[name="passwd"]', comPassword)
      .assert.visible('input[name="wfblin001"]')
      .waitForElementVisible('input[name="wfblin001"]', 1000)
      .click('input[name="wfblin001"]')
      .pause(2000)


      .getTitle(function(result){
          console.log(result);
          if(result === "ログイン"){
              client
                .useCss()
                .assert.visible('input[name="LIN003009"]')
                .click('input[name="LIN003009"]')
                .end();

                console.log("★ログインが上手くいかなかったため、強制ログアウトをしました。");
                console.log("★もう一度テストを実行してください");
          }
      })

      /* ◆start 都度振込 */
      .useXpath()
      .click("//img[contains(@alt,'振込・口座振替')]")
      .useCss()
      .pause(500)

      .waitForElementPresent('body', 6000)
      .assert.title('振込・口座振替')
      .pause(1000)

      .useXpath()
      .click("//*[contains(text(), '都度振込')]")
      .useCss()
      .pause(500)

      .waitForElementPresent('body', 6000)
      .assert.title('都度振込')
      .pause(1000)


      .click('input[value="選択"]')
      .pause(500)


      .click('input[value="利用者登録先"]')
      .pause(500)

      .click('input[value="選択"]')
      .pause(500)



      .click('input[name="itp002101"]')
      .pause(1000)

      .assert.visible('input[name="itp002102"]')
      .setValue('input[name="itp002102"]', "2")


      .assert.visible('input[name="itp002103"]')
      .setValue('input[name="itp002103"]', "5")


      .assert.visible('input[name="itp002305show"]')
      .setValue('input[name="itp002305show"]', "75000")

      .click('input[value="登録"]')
      .pause(500)


      .assert.visible('input[name="itp0030011"]')
      .setValue('input[name="itp0030011"]', "1111111111")
      .pause(1000)

      .click('input[name="ITP003005"]')
      .pause(1000)

      .useXpath()
      .click("/html/body/form[1]/div[2]/table/tbody/tr/td[1]/table[3]/tbody/tr/td[2]/table/tbody/tr/td[2]/table/tbody/tr/td[2]/input")
      .useCss()
      .pause(1000)
      .end();
  },

  'demo test 帳票出力' : function (client) {
      client
        .url(bankUrl)
        .waitForElementPresent('body', 6000)
        .assert.title('ログイン')
        .assert.visible('input[name="userid"]')
        .setValue('input[name="userid"]', bankId)
        .assert.visible('input[name="passwd"]')
        .setValue('input[name="passwd"]', bankPassword)
        .assert.visible('input[name="wbolin001"]')
        .waitForElementVisible('input[name="wbolin001"]', 1000)
        .click('input[name="wbolin001"]')
        .pause(2000)

        .getTitle(function(result){
            console.log(result);
            if(result === "ログインエラー"){
                client
                  .useCss()
                  .assert.visible('input[name="LIN003009"]')
                  .click('input[name="LIN003009"]')
                  .end();

                  console.log("★ログインが上手くいかなかったため、強制ログアウトをしました。");
                  console.log("★もう一度テストを実行してください");
            }
        })



        .useXpath()
        .click("//*[contains(text(), '照会処理メニュー')]")
        .useCss()
        .pause(1000)

        .useXpath()
        .click("//*[contains(text(), '為替照会処理')]")
        .useCss()
        .pause(1000)


        .useXpath()
        .click("/html/body/table[4]/tbody/tr/td[2]/table[2]/tbody/tr/td/table/tbody/tr[7]/td[3]")
        .useCss()
        .pause(1000)

        .click('input[value="次画面"]')
        .pause(1000)

        .click('input[value="印刷"]')
        .pause(1000)

        .click('input[value="ディレード帳票照会"]')
        .pause(5000)

        .click('input[value="次画面"]')
        .pause(1000)

        .click('input[value="印刷"]')
        .pause(15000)

        .useXpath()
        .click("//*[contains(text(), 'ログアウト')]")
        .useCss()
        .pause(1000)
        .end();
      }
  };
