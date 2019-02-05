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


var func = require('../func/func.js');

var eigyoDate = func.getEigyoDate(new Date());
var nextDate = new Date(eigyoDate.getTime());
var nextEigyoDate = func.getEigyoDate(nextDate.setDate(nextDate.getDate()+1));
var next2Date= new Date(nextEigyoDate.getTime());
var next2EigyoDate = func.getEigyoDate(next2Date.setDate(next2Date.getDate()+1));

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




      /* ◆start 総合振込 */
      .useXpath()
      .click("//img[contains(@alt,'振込・口座振替')]")
      .useCss()
      .pause(500)

      .waitForElementPresent('body', 6000)
      .assert.title('振込・口座振替')
      .pause(1000)


      .useXpath()
      .click("//*[contains(text(), '総合振込')]")
      .useCss()
      .pause(500)

      .waitForElementPresent('body', 6000)
      .assert.title('総合振込')
      .pause(1000)


      .click('input[value="選択"]')
      .pause(1000)

      /* WFBSYP003_振込データ新規作成 */
      .click('input[value="振込データ新規作成"]')
      .pause(1000)

      .assert.visible('input[name="syp003003"]')
      .setValue('input[name="syp003003"]', func.getEigyoMonth(today.getDate()+1))


      .assert.visible('input[name="syp003004"]')
      .setValue('input[name="syp003004"]', func.getEigyoDay(today.getDate()+1))


      .click('input[name="chk"]')
      .pause(1000)

      .assert.visible('input[name="syp003617show"]')
      .setValue('input[name="syp003617show"]', "100000")
      .pause(1000)



      .click('input[value="データ確定"]')
      .pause(1000)


      .assert.visible('input[name="syp004007"]')
      .setValue('input[name="syp004007"]', "111111")
      .pause(1000)


      .click('input[name="syp004008"]')
      .pause(1000)


      .waitForElementPresent('body', 6000)
      .assert.title('総合振込')
      .pause(1000)



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

      /* ラジオボタンの選択未実装 */


      .click('input[value="選択"]')
      .pause(500)



      .click('input[name="itp002101"]')
      .pause(1000)

      .assert.visible('input[name="itp002102"]')
      .setValue('input[name="itp002102"]', func.getEigyoMonth(today.getDate()+1))


      .assert.visible('input[name="itp002103"]')
      .setValue('input[name="itp002103"]', func.getEigyoDay(today.getDate()+1))


      .assert.visible('input[name="itp002305show"]')
      .setValue('input[name="itp002305show"]', "75000")




      .click('input[value="登録"]')
      .pause(500)


      .assert.visible('input[name="itp0030011"]')
      .setValue('input[name="itp0030011"]', "1111111111")
      .pause(1000)


      .click('input[name="ITP003005"]')
      .pause(1000)


      /* ◆給与・賞与振込 */

      .useXpath()
      .click("//img[contains(@alt,'振込・口座振替')]")
      .useCss()
      .pause(500)


      .waitForElementPresent('body', 6000)
      .assert.title('振込・口座振替')
      .pause(1000)


      .useXpath()
      .click("//*[contains(text(), '給与・賞与振込')]")
      .useCss()
      .pause(500)


      .waitForElementPresent('body', 6000)
      .assert.title('給与・賞与振込')
      .pause(1000)

      /* ラジオボタンの選択未実装 */


      .click('input[value="選択"]')
      .pause(500)


      .click('input[value="振込データ新規作成"]')
      .pause(1000)


      .assert.visible('input[name="wap003003"]')
      .setValue('input[name="wap003003"]', func.getEigyoMonth(today.getDate()+2))


      .assert.visible('input[name="wap003004"]')
      .setValue('input[name="wap003004"]', func.getEigyoDay(today.getDate()+2))


      /* ラジオボタンの選択未実装 */

      .assert.visible('input[name="wap003610show"]')
      .setValue('input[name="wap003610show"]', "3000000")


      .click('input[value="データ確定"]')
      .pause(1000)


      .assert.visible('input[name="wap004007"]')
      .setValue('input[name="wap004007"]', "111111")
      .pause(1000)


      .click('input[name="wap004008"]')
      .pause(1000)


      .waitForElementPresent('body', 6000)
      .assert.title('給与・賞与振込')
      .pause(1000)


      /* ◆口座振替 */

      .useXpath()
      .click("//img[contains(@alt,'メイン')]")
      .useCss()
      .pause(500)

      .waitForElementPresent('body', 6000)
      .assert.title('メイン')
      .pause(1000)


      .useXpath()
      .click("//img[contains(@alt,'振込・口座振替')]")
      .useCss()
      .pause(500)


      .waitForElementPresent('body', 6000)
      .assert.title('振込・口座振替')
      .pause(1000)


      .useXpath()
      .click("/html/body/div[7]/table/tbody/tr/td[3]/table/tbody/tr[1]/td/a")
      .useCss()
      .pause(500)

      /* ラジオボタンの選択未実装 */


      .click('input[value="選択"]')
      .pause(500)


      .click('input[value="口座振替データ新規作成"]')
      .pause(500)


      .assert.visible('input[name="trs003003"]')
      .setValue('input[name="trs003003"]', func.getEigyoMonth(today.getDate()+1))


      .assert.visible('input[name="trs003004"]')
      .setValue('input[name="trs003004"]', func.getEigyoDay(today.getDate()+1))


      .click('input[name="chk"]')
      .pause(1000)


      .assert.visible('input[name="trs003610show"]')
      .setValue('input[name="trs003610show"]', "100000")
      .pause(1000)


      .click('input[value="データ確定"]')
      .pause(1000)




      .assert.visible('input[name="trs004007"]')
      .setValue('input[name="trs004007"]', "111111")
      .pause(1000)


      .click('input[name="trs004008"]')
      .pause(1000)


      .useXpath()
      .click("//img[contains(@alt,'メイン')]")
      .useCss()
      .pause(500)

      .waitForElementPresent('body', 6000)
      .assert.title('メイン')
      .pause(1000)


      .click('input[name="SYP0031002"]')
      .pause(1000)
      .end();
  }

};
