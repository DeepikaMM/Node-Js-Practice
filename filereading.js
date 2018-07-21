var  countryToContinent =require('./data.js');

var fs=require('fs');

var readMe=fs.readFileSync('datafile.csv','utf8');
var splitfile = readMe.split('\r\n');
for(i=1;i<splitfile.length -1 ;i+=1) {
    var one=splitfile[i].split(',');
    fs.appendFileSync('new11.csv',one[0].split('"')[1]+"," +  one[4].split('"')[1] + ","+ one[7].split('"')[1]+'\n');

}
var readMe1=fs.readFileSync('new11.csv','utf8');
var splitfile1 = readMe1.split('\n');
 map =new Map(countryToContinent);
map1 =new Map();

for(i=1;i<splitfile1.length-1;i+=1)
 {

    var two=splitfile1[i].split(',');
    var continent=map.get(two[0].split('"')[0]);
    var add=parseFloat(two[1]);
    var add1=parseFloat(two[2]);
    map1.set(two[0],[continent,add,add1]);
  
 }
gdp=new Map();
population=new Map();

 for (var [key, value] of map1) {
     if(gdp.has(value[0]))
    {
      gdp.set(value[0],parseFloat(gdp.get(value[0])) + parseFloat(value[1]));
     }

    else
     gdp.set(value[0],value[1]);
     if(population.has(value[0]))
     {
       population.set(value[0],parseFloat(population.get(value[0])) + parseFloat(value[2]));
      }
 
     else
      population.set(value[0],value[2]);
    
  }
  //console.log(gdp);
  //console.log(population);
 
    const outputfile = 'output.json';
    const jasonFormatString = {};
    gdp.forEach((value, key) => {
      jasonFormatString[key] = {
        GDP_2012: value,
        POPULATION_2012: population.get(key),
      };
    });
    console.log(jasonFormatString);
    //fs.writeFile(outputfile, JSON.stringify(jasonFormatString));

  
 
    
 
 

