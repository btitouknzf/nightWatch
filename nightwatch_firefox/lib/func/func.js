

exports.getEigyoDate = function(targetDate){
    var date = new Date(targetDate);
    while (true) {
        var dayOfWeek = date.getDay();
        if(dayOfWeek === 6 || dayOfWeek === 0){
            date.setDate(date.getDate() + 1);
        }else if(date.getMonth()+1 === 12 && date.getDate() === 31){
            date.setDate(date.getDate() + 1);
        }else if(date.getMonth()+1 === 1 &&
        (date.getDate() === 1 || date.getDate() === 2 || date.getDate() === 3)){
            date.setDate(date.getDate() + 1);
        }else{
            break;
        }
    }
    return date;
};


//
exports.isWeekDay = function(targetDate){
    var dayOfWeek = targetDate.getDay();
    /*
     * 1 月曜
     * 2 火曜
     * 3 水曜
     * 4 木曜
     * 5 金曜
     * 6 土曜
     * 7 日曜
     */
     if(dayOfWeek === 6 || dayOfWeek === 0){
         return false;
     }
     return true;
};

exports.isHoliday = function(date){
    var req = new XMLHttpRequest()
    req.open('get', './syukujitsu.csv', true);
    req.send(null);
    req.onload = function(){
        checkDate(req.responseText, date, function(result){
            console.log(result);
        });
    };
}

function checkDate(str, date, callback){
    var data = [];
    var addZero = function(n){
        return ('0' + n).slice(-2);
    }
    var nDate = new Date(date);
    var dataArr = [];
    var checkDate = nDate.getFullYear() + '-' + addZero(nDate.getMonth() + 1) + '-' + addZero(nDate.getDate());
    var isHoliday = false;
    var tmp = str.split('\n');
    for(var i=0; i< tmp.length; i++){
        dataArr = tmp[i].split(',');
        if(dataArr[0] === checkDate){
            isHoliday = true;
            break;
        }
    };
    callback(isHoliday);
}
