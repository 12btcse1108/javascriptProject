const readline = require('readline');//introducing readline module
var file=require('fs');//introducing file system module
var myfile='../csv/Indicators.csv';//introducing csv file externally
var rl = readline.createInterface({
input: file.createReadStream(myfile),//input file given
});
var maleCounter = {"AFG":0,"ARM":0,"AZE":0,"BHR":0,"BGD":0,"BTN":0,"BRN":0,"KHM":0,"CHN":0,"GEO":0,"HKG":0,"IND":0,"IDN":0,"IRN":0,"IRQ":0,
                  "ISR":0,"JPN":0,"JOR":0,"KAZ":0,"KWT":0,"KGZ":0,"LAO":0,"LBN":0,"MAC":0,"MYS":0,"MDV":0,"MNG":0,"MMR":0,"NPL":0,	"PRK":0,
                  	"OMN":0	,"PAK":0,	"PHL":0,"QAT":0,"SAU":0,"SGP":0,"KOR":0,"LKA":0	,"SYR":0,"TWN":0,"TJK":0,"THA":0,"TUR":0,	"TKM":0,"ARE":0,
                    	"UZB":0,"VNM":0,"YEM":0}

var femaleCounter = {"AFG":0,"ARM":0,"AZE":0,"BHR":0,"BGD":0,"BTN":0,"BRN":0,"KHM":0,"CHN":0,"GEO":0,"HKG":0,"IND":0,"IDN":0,"IRN":0,"IRQ":0,
                                        "ISR":0,"JPN":0,"JOR":0,"KAZ":0,"KWT":0,"KGZ":0,"LAO":0,"LBN":0,"MAC":0,"MYS":0,"MDV":0,"MNG":0,"MMR":0,"NPL":0,	"PRK":0,
                                        	"OMN":0	,"PAK":0,	"PHL":0,"QAT":0,"SAU":0,"SGP":0,"KOR":0,"LKA":0	,"SYR":0,"TWN":0,"TJK":0,"THA":0,"TUR":0,	"TKM":0,"ARE":0,
                                          	"UZB":0,"VNM":0,"YEM":0}

var countryCode=[ "AFG","ARM","AZE","BHR","BGD","BTN","BRN","KHM","CHN","GEO","HKG","IND","IDN","IRN","IRQ",
                  "ISR","JPN","JOR","KAZ","KWT","KGZ","LAO","LBN","MAC","MYS","MDV","MNG","MMR","NPL",	"PRK",
                  	"OMN"	,"PAK",	"PHL","QAT","SAU","SGP","KOR","LKA"	,"SYR","TWN","TJK","THA","TUR",	"TKM","ARE",
                    	"UZB","VNM","YEM"];
var indicatorCode = ["SP.DYN.LE00.FE.IN", "SP.DYN.LE00.MA.IN", "sp.dyn.le00.fe.in", "sp.dyn.le00.ma.in"];
var count = 0;
var array = [];
var firstrow = [];
var final = [];

function jsonValue(countrycode, maleAvg, femaleAvg) {
    this.countryCode = countrycode;
    this.male = maleAvg;
    this.female = femaleAvg;
} //final json object
var counter = 0;
rl.on('line', function(value) //reading of file started
    {
        var i = 0;
        var j = 0
        var k = 0;
        var count = 0;

        if (counter == 0) {
            var header = value.split(','); //splitting of header
        } else {
            var firstRow = value.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g); //splitting of first row

            for (i = 0; i < countryCode.length; i++) //checking for asian Countries
            {
                for (j = 0; j < firstRow.length; j++) {
                    if (countryCode[i] == firstRow[j]) {
                        count++;

                        for (k = 0; k < indicatorCode.length; k++) //checking for indicator code
                        {
                            for (var ind = 0; ind < firstRow.length; ind++) {
                                if (indicatorCode[k] == firstRow[ind]) {
                                    if (indicatorCode[k] == "SP.DYN.LE00.MA.IN" || indicatorCode[k] == "sp.dyn.le00.ma.in") //checking for male
                                    {
                                        maleCounter[firstRow[1]] = (parseFloat(maleCounter[firstRow[1]]) + parseFloat(firstRow[5])) / count;
                                    } else {
                                        femaleCounter[firstRow[1]] = (parseFloat(femaleCounter[firstRow[1]]) + parseFloat(firstRow[5])) / count; //checking for female

                                    }
                                }

                            }
                        }

                    }
                }
            }
            count = 0;
        }
        count++; //next row
    }
);
rl.on('close', function() { //reading of file stopped
    for (var key in maleCounter) {
        var json = new jsonValue(key, maleCounter[key], femaleCounter[key]);
        final.push(json); //final array
    }
    file.writeFile('../json/lifeExpectency.json', JSON.stringify(final), 'utf-8'); //json file final conversion
})
