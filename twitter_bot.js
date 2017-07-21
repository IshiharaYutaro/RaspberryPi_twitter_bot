setTimeout(function(){
var MilkCocoa = require('milkcocoa');
var Twitter = require('twitter');

var milkcocoa = new MilkCocoa('teaiyahvzzp.mlkcca.com');

var temp = milkcocoa.dataStore('temp');
var humid = milkcocoa.dataStore('humid');
var pressure = milkcocoa.dataStore('pressure');
var time;
var humid;
var pressure;
var temp;

var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: '',
});


temp.stream().size(1).next(function(err, temp_message){
	var ts = temp_message[0].timestamp;
  	temp = temp_message[0].value.temp;
  	temp = Math.round(temp*100)/100;
  	var d = new Date( ts );
    var year  = d.getFullYear();
    var month = d.getMonth() + 1;
    var day  = d.getDate();
    var hour = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
    var min  = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
    var sec   = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
     time = year + '/' + month + '/' + day + ' ' + hour + ':' + min;
    //console.log(time);
  	//console.log(temp);

humid.stream().size(1).next(function(err, humid_message){
	humid=humid_message[0].value.humid
	humid = (Math.round(humid*100))/100;
  //console.log(humid);

pressure.stream().size(1).next(function(err, pressure_message){
	pressure = pressure_message[0].value.pressure;
	pressure = Math.round(pressure*1000)/1000;
  //console.log(pressure);

client.post('statuses/update',{status: '時間:' + time + '\r温度:' + temp + '℃\r' + '湿度:' + humid + '％\r' + '気圧:'+ pressure + 'hpa\r' + 'ラズベリーパイから取得しています。'},
	function(error, tweet, response) {
        /*if (!error) {
            console.log(tweet);
        }*/
        if(error){
        	console.log(tweet)
        }
    process.exit();}
    );});});});
},15000);
