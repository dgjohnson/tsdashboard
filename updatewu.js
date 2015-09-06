var http = require('http');
var _ = require('lodash');
var config = require('./config.js');

module.exports = function(){

  var tempf = '';
  var humidity = '';
  var pressure = '';

  function doUpdate(){

    var path = '/weatherstation/updateweatherstation.php?action=updateraw&ID=' + config.id + '&PASSWORD=' + config.password + '&dateutc=now&' + tempf + humidity + pressure;

    var options = {
      host: 'weatherstation.wunderground.com',
      path: path
    };

    var callback = function(response) {
      var str = '';
      response.on('data', function (chunk) {
        str += chunk;
      });

      response.on('end', function () {
        console.log(str);
      });
    };

    var req = http.request(options, callback);
    req.end();
  }

  var debouncedDoUpdate = _.debounce(doUpdate, 60000, {
    'maxWait': 2500
  });

  return {

    update: function(data){

      for(var i = 0; i < data[0].senses.length; i++){
        var sense = data[0].senses[0];
        if (sense.sId === '0x00060100'){
          tempf = 'tempf=' +(sense.val * 1.8 + 32).toFixed(2) + '&';
        }

        if (sense.sId === '0x00060200'){
          humidity = 'humidity=' + sense.val + '&';
        }

        if (sense.sId === '0x00060400'){
          pressure = 'baromin=' + (sense.val * 0.0295) + '&';
        }
      }

      debouncedDoUpdate();

    }
  };
};
