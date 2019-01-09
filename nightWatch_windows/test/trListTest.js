var url = "C:/github/itouoti/nightWatch/nightWatch_windows/node_modules/nightwatch/test/trList.html";

//check box targetNo
var targetNo = "0002";
var elementCount;
var parentPath = "/html/body/table/tbody/";
module.exports = {

  '@disabled': false,

  'tr dynamic selection' : function (client) {
    client
      .url(url)
      .elements('xpath', parentPath +'tr',
        function(result){
          elementCount = Object.keys(result.value).length;
          console.log("data is " + String(Number(elementCount)-2) + " rows");

          for(var i=3; i<=elementCount; i++ ){
              //rows xpath
              var xpath = parentPath + "tr[" + i + "]/";
              client
                .useXpath()
                .waitForElementPresent(xpath + "td[2]", function(result,xpath){
                    console.log(xpath.element.selector.slice(0,29));
                    result.value.map(function(element, err){
                        client.elementIdAttribute(element.ELEMENT, 'innerText', function(res){
                            console.log(res.value);
                            if(res.value === targetNo){
                                console.log("target checkBOX! click");
                                client.useXpath().click(xpath.element.selector.slice(0,29) + "td[1]/input");
                            }
                        })
                    });

                });
          }
      })
      .pause(1000)
      .end();
  }
};
