var url = "C:/github/itouoti/nightWatch/nightWatch_windows/node_modules/nightwatch/test/trList.html";

//check box targetNo
var targetNo = "0003";
var elementCount;
var parentPath = "/html/body/table/tbody/";
module.exports = {

  '@disabled': true,

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
                .getText(xpath + "td[2]",
                    function(result){
                        console.log("current row is " + result.value);
                        console.log("current path is [" + xpath + "td[1]/input]");
                        if(targetNo === result.value){
                            console.log("target checkBOX!");
                            client
                                .useXpath()
                                .click(xpath + "td[1]/input");
                        }
                    });
          }
      })
      .pause(1000)
      .end();
  }
};
