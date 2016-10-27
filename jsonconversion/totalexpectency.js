const readline = require('readline');//introducing readline module
var file=require('fs');//introducing file system
var myfile='../csvfile/Indicators.csv';//introducing csv file externally
var rl = readline.createInterface({
input: file.createReadStream(myfile),//setting input
});
var mapTotalCount = {"AFG":0,"ARM":0,"AZE":0,"BHR":0,"BGD":0,"BTN":0,"BRN":0,"KHM":0,"CHN":0,"GEO":0,"HKG":0,"IND":0,"IDN":0,"IRN":0,"IRQ":0,
                  "ISR":0,"JPN":0,"JOR":0,"KAZ":0,"KWT":0,"KGZ":0,"LAO":0,"LBN":0,"MAC":0,"MYS":0,"MDV":0,"MNG":0,"MMR":0,"NPL":0,	"PRK":0,
                  	"OMN":0	,"PAK":0,	"PHL":0,"QAT":0,"SAU":0,"SGP":0,"KOR":0,"LKA":0	,"SYR":0,"TWN":0,"TJK":0,"THA":0,"TUR":0,	"TKM":0,"ARE":0,
                    	"UZB":0,"VNM":0,"YEM":0}

var country_code=[ "AFG","ARM","AZE","BHR","BGD","BTN","BRN","KHM","CHN","GEO","HKG","IND","IDN","IRN","IRQ",
                  "ISR","JPN","JOR","KAZ","KWT","KGZ","LAO","LBN","MAC","MYS","MDV","MNG","MMR","NPL",	"PRK",
                  	"OMN"	,"PAK",	"PHL","QAT","SAU","SGP","KOR","LKA"	,"SYR","TWN","TJK","THA","TUR",	"TKM","ARE",
                    	"UZB","VNM","YEM"];
var indicator_code=["SP.DYN.LE00.IN","sp.dyn.le00.in"];
var count=0;
var array = [];
var firstrow=[];
var final=[];
var final1=[];
function myvalues(countrycode, totalexp) {
    this.countryCode = countrycode;
    this.Total_Expectency = totalexp;

}//final json object
var counter=0;
rl.on('line',function (abc)//reading of file started
{
var i=0;
var j=0
var k=0;

  if(count==0)
  {
    var header=abc.split(',');//splitting of headers
  }
  else
    {
      var first_row=abc.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);//first row reading starts

       for(i=0;i<country_code.length;i++)//checking country code
       {
        for(j=0;j<first_row.length;j++)
          {
            if(country_code[i]==first_row[j])
                {
                  count++;

                 for(k=0;k<indicator_code.length;k++)//checking indicator code
                  {
                     for(var ind=0;ind<first_row.length;ind++)
                     {
                        if(indicator_code[k]==first_row[ind])
                           {
                              mapTotalCount[first_row[1]] = (parseFloat(mapTotalCount[first_row[1]]) + parseFloat(first_row[5]))/count;//getting total expectency

                             }

                             }
                     }

             }
    }
}
count=0;
}
count++;//next row
}
);
rl.on('close',function () {//reading file end
  for(var key in  mapTotalCount)
  {
    var json1=new myvalues(key,mapTotalCount[key])
     final1.push(json1);//final array
     }
  file.writeFile('../json/jsonbar.json',JSON.stringify(final1),'utf-8');//conversion from csv to json
})
