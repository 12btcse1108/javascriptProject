const readline = require('readline'); //introducing readline module
var file = require('fs'); //introducing file system module
var myfile = '../csv/Indicators.csv';
var rl = readline.createInterface({
    input: file.createReadStream(myfile), //input file given

});

var mapDeath = {
    "1960": 0,
    "1961": 0,
    "1962": 0,
    "1963": 0,
    "1964": 0,
    "1965": 0,
    "1966": 0,
    "1967": 0,
    "1968": 0,
    "1969": 0,
    "1970": 0,
    "1971": 0,
    "1972": 0,
    "1973": 0,
    "1974": 0,
    "1975": 0,
    "1976": 0,
    "1977": 0,
    "1978": 0,
    "1979": 0,
    "1980": 0,
    "1981": 0,
    "1982": 0,
    "1983": 0,
    "1984": 0,
    "1985": 0,
    "1986": 0,
    "1987": 0,
    "1988": 0,
    "1989": 0,
    "1990": 0,
    "1991": 0,
    "1992": 0,
    "1993": 0,
    "1994": 0,
    "1995": 0,
    "1996": 0,
    "1997": 0,
    "1998": 0,
    "1999": 0,
    "2000": 0,
    "2001": 0,
    "2002": 0,
    "2003": 0,
    "2004": 0,
    "2005": 0,
    "2006": 0,
    "2007": 0,
    "2008": 0,
    "2009": 0,
    "2010": 0,
    "2011": 0,
    "2012": 0,
    "2013": 0,
    "2014": 0,
    "2015": 0
}


var mapBirth = {
    "1960": 0,
    "1961": 0,
    "1962": 0,
    "1963": 0,
    "1964": 0,
    "1965": 0,
    "1966": 0,
    "1967": 0,
    "1968": 0,
    "1969": 0,
    "1970": 0,
    "1971": 0,
    "1972": 0,
    "1973": 0,
    "1974": 0,
    "1975": 0,
    "1976": 0,
    "1977": 0,
    "1978": 0,
    "1979": 0,
    "1980": 0,
    "1981": 0,
    "1982": 0,
    "1983": 0,
    "1984": 0,
    "1985": 0,
    "1986": 0,
    "1987": 0,
    "1988": 0,
    "1989": 0,
    "1990": 0,
    "1991": 0,
    "1992": 0,
    "1993": 0,
    "1994": 0,
    "1995": 0,
    "1996": 0,
    "1997": 0,
    "1998": 0,
    "1999": 0,
    "2000": 0,
    "2001": 0,
    "2002": 0,
    "2003": 0,
    "2004": 0,
    "2005": 0,
    "2006": 0,
    "2007": 0,
    "2008": 0,
    "2009": 0,
    "2010": 0,
    "2011": 0,
    "2012": 0,
    "2013": 0,
    "2014": 0,
    "2015": 0
}



var country_code = ["IND"];
var indicator_code = ["SP.DYN.CBRT.IN", "SP.DYN.CDRT.IN"];
var count = 0;
var array = [];
var firstrow = [];
var firstarray = [];
var final = [];

function jsonValue(year, birth, death) {
    this.year = year;
    this.Birth = birth;
    this.Death = death;

} //final json object
var counter = 0;
rl.on('line', function(value) //reading of file started
    {
        var i = 0;
        var j = 0
        var k = 0;

        if (count == 0) {
            var header = value.split(','); //splitting of header
        } else {
            var first_row = value.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g); //splitting of first row

            for (i = 0; i < country_code.length; i++) //checking for asian Countries
            {
                for (j = 0; j < first_row.length; j++) {
                    if (country_code[i] == first_row[j]) {

                        for (k = 0; k < indicator_code.length; k++) //checking for indicator code
                        {
                            for (var ind = 0; ind < first_row.length; ind++) {
                                if (indicator_code[k] == first_row[ind]) {
                                    if (indicator_code[k] == "SP.DYN.CBRT.IN") {
                                        mapBirth[first_row[4]] = parseFloat(mapBirth[first_row[4]]) + parseFloat(first_row[5]); //getting Birth rate

                                    } else {
                                        mapDeath[first_row[4]] = parseFloat(mapDeath[first_row[4]]) + parseFloat(first_row[5]); //getting Death rate

                                    }
                                }

                            }

                        }

                    }
                }
            }

        }
        count++;
    }
);
rl.on('close', function() { //reading of file end
    for (var key in mapBirth) {
        var json = new jsonValue(key, mapBirth[key], mapDeath[key]);
        final.push(json); //final array

    }
    file.writeFile('../json/jsonmultiseries.json', JSON.stringify(final), 'utf-8'); //conversion of csv to json
})
