/**
 * Sample automated test scenario for Nightwatch.js
 * BKP10070 為替振込　持込受付照会
 */
 //金庫URL
 var bankUrl = "http://10.9.118.48/est/webfb/wbolin000.do?Code=NTEwNA==";
 //金庫ログインID
 var bankId = "master5104";
 //金庫ログインパスワード
 var bankPassword = "5104mas";

 //印刷対象受付通番
 var uketsukeNo;

 var elementCount;

var today = new Date();
var month = today.getMonth() + 1;
var day = today.getDate();
var yaer = today.getFullYear();

var tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
var nextMonth = tomorrow.getMonth() + 1;
var nextDay = tomorrow.getDate();
var nextYaer = tomorrow.getFullYear();

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
      .click("//*[contains(text(), '為替照会処理')]")
      .useCss()
      .pause(1000)


      .useXpath()
      .click("/html/body/table[4]/tbody/tr/td[2]/table[2]/tbody/tr/td/table/tbody/tr[7]/td[1]/a")
      .useCss()
      .pause(1000)

      //.click('select[name="shouhouPtn"] option[value="2"]')
      .click('select[name="shouhouPtn"] option[value="1"]')
      .pause(1000)
      .setValue('select[name="yearPtn"]', nextYaer)
      .setValue('select[name="monPtn"]', nextMonth)
      /*.setValue('select[name="dayPtn"]', ptnDay(nextDay))*/
      .setValue('select[name="dayPtn"]', "25")
      .pause(1000)

      .click('input[value="次画面"]')
      .pause(1000)

      .click('input[value="印刷"]')
      .pause(1000)

      //画面から受付通番を取得
      ///html/body/form[2]/table[2]/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/text()[4]

      .useXpath()
      .getText("/html/body/form[2]/table[2]/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td",function(result){
          //受付通番４桁取得
          uketsukeNo = result.value.substr(68,4);
          console.log("受付通番：" + uketsukeNo);
      })
      .useCss()

      .click('input[value="ディレード帳票照会"]')
      .pause(5000)

      .click('input[value="次画面"]')
      .pause(1000)

      //表の行数を取得し、列と一致した項目のラジオボタンを選択
      .elements('xpath','/html/body/form[2]/table[3]/tbody/tr/td/table/tbody/tr',function(result){
          console.log(result);
          elementCount = Object.keys(result.value).length;
          console.log("データの行数:" + String(Number(elementCount)-2) + "行");
          var dataCount = Number(elementCount)-2;
          var parentPath = "/html/body/form[2]/table[3]/tbody/tr/td/table/tbody/";






          for(var i=3; i<elementCount + 1; i++ ){
              //受付通番のパス
              var xpath = parentPath + "tr[" + i + "]/";
              var tdUkeNo;

              console.log(xpath);

              client
                .useXpath()
                .getText(xpath + "td[2]",function(result){
                    tdUkeNo = result.value;
                    console.log(result);
                    console.log("受付通番比較：","該当通番=" + uketsukeNo,"比較対象通番=" + tdUkeNo);
                    console.log(uketsukeNo === tdUkeNo);
                    if(uketsukeNo === tdUkeNo){
                        console.log("入った");
                        console.log(xpath + "td[1]/input");
                        client
                          .useXpath()
                          .click(xpath + "td[1]/input")
                          .useCss();
                    }
                })
                .useCss();

          }
      })

      .click('input[value="印刷"]')
      .pause(15000)

      .useXpath()
      .click("//*[contains(text(), 'ログアウト')]")
      .useCss()
      .pause(1000)
      .end();
  }

};


var ptnDay = function(day){
    if(String(day).length == 1){
      return '0' + day;
  }else {
      return day;
    }
}
