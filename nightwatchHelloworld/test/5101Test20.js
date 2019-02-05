/**
 * Sample automated test scenario for Nightwatch.js
 * ディレード帳票照会
 */

//金庫URL
var bankUrl = "http://10.9.118.48/est/webfb/wbolin000.do?Code=NTEwNA==";
//金庫ログインID
var bankId = "master5104";
//金庫ログインパスワード
var bankPassword = "5104mas";

//印刷対象受付通番
var uketsukeNo = "0001";

//ディレード帳票照会表で使用する情報
var elementCount;
var parentPath = "/html/body/form[2]/table[3]/tbody/tr/td/table/tbody/";
var pathList = new Array();
var tdUkeNo;

module.exports = {
  /**   テストモジュールの実行可否
   *    true 実行しない
   *    false 実行する
   */
  '@disabled': true,

  'part two' : function (client) {
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
      .click("//*[contains(text(), '共通照会処理')]")
      .useCss()
      .pause(1000)

      .useXpath()
      .click("//*[contains(text(), 'ディレード帳票照会')]")
      .useCss()
      .pause(1000)

      .click('input[value="次画面"]')
      .pause(1000)

      //表の行数を取得
      .elements('xpath','/html/body/form[2]/table[3]/tbody/tr/td/table/tbody/tr',
        function(result){
            elementCount = Object.keys(result.value).length;
            console.log("データの行数:" + String(Number(elementCount)-2) + "行");

            for(var i=3; i<elementCount + 1; i++ ){
                //受付通番のパス
                var xpath = parentPath + "tr[" + i + "]/";
                var tdUkeNo;
                client.useXpath().getText(xpath + "td[2]",function(result){
                    console.log(result.value);
                    console.log(xpath + "td[1]/input");
                    if(uketsukeNo === result.value){
                        client.useXpath().click(xpath + "td[1]/input")
                    }
                });

            }
        })




      //.elements('xpath','/html/body/form[2]/table[3]/tbody/tr/td/table/tbody/tr',iter)
      .useCss()
      .click('input[value="印刷"]')
      .pause(15000)

      .useXpath()
      .click("//*[contains(text(), 'ログアウト')]")
      .useCss()
      .pause(1000)
      .end();
  }

};

function iter($elems) {
    $elems.value.forEach(function($e){
        //console.log($e);
        client.getText($e.ELEMENT,function(result){
            console.log(result);
        })
    })
}
