var util = require('util');
var events = require('events');

var person = function(name){
    this.name=name;
};
util.inherits(person,events.EventEmmiter);

var deepika=new person('Deepika');
var deepthi=new person('Deepthi');
var mohan=new person('Mohan');
var vasanthi=new person('Vasanthi');
var arr=[deepika,deepthi,mohan,vasanthi];

arr.forEach(function(perso){
    perso.on('speak',function(msg){
        console.log(perso.name+ 'said:' +msg);
    });
});
deepika.emit('speak',"hai bro");