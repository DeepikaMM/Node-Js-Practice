var fs = require('fs');
var mapData = new Map();
const readCSV = fs.readFileSync('datafile.csv', 'utf8')
var formatReadCSV = readCSV.split('\r\n');
for (i = 1; i < formatReadCSV.length - 1; i += 1) {
    var data = formatReadCSV[i].split(',');
    mapData.set(data[0].split('"')[1], [data[4].split('"')[1], data[7].split('"')[1]]);
}
extractMap = new Map();
const readTXT = fs.readFileSync('data.txt', 'utf8');
var formatReadTXT = readTXT.split('\r\n');
for (i = 0; i < formatReadTXT.length - 1; i += 1) {
    var splitData = formatReadTXT[i].split(',');
    extractMap.set(splitData[0], splitData[1]);
}
continentMapper = new Map();
for (var [key, value] of extractMap) {
    countryInfo = mapData.get(key);
    continentMapper.set(key, [countryInfo[0], countryInfo[1], value]);
}
population = new Map();
gdp = new Map();

for (var [key, value] of continentMapper) {
    if (population.has(value[2])) {
        population.set(value[2], parseFloat(population.get(value[2])) + parseFloat(value[0]));
    }
    else {
        population.set(value[2], value[0]);
    }
    if (gdp.has(value[2])) {
        gdp.set(value[2], (parseFloat(gdp.get(value[2])) + parseFloat(value[1])));
    }

    else
        gdp.set(value[2], value[1]);

}
const outputfile = 'output/output.json';
const jasonFormatString = {};
gdp.forEach((value, key) => {
    jasonFormatString[key] = {
        GDP_2012: value,
        POPULATION_2012: population.get(key),
    };
});

fs.writeFileSync(outputfile, JSON.stringify(jasonFormatString));







