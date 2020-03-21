const awsIot = require('aws-iot-device-sdk');

//load the settings file that contains the location of the device certificates and the clientId of the sensor
var sensors = require('./sensors.json');

//load the sensor records
var shadowDocument = require('./shadowDocument.json');

//constants used in the application
const SHADOW_TOPIC = "$aws/things/[thingName]/shadow/update";
const VALUE_TOPIC = "dt/bay-health/SF/[thingName]/sensor-value"; //topic to which sensor values will be published
const VALUE_RATE = 5000; //rate in milliseconds new values will be published to the Cloud

async function run(sensor) {

    //initialize the IOT device
    var device = awsIot.device(sensor.settings);

    //create a placeholder for the message
    var msg = {
        pH: 0,
        temperature: 0,
        salinity: 0,
        disolvedO2: 0,
        timestamp: new Date().getTime()
    }

    device.on('connect', function() {
    
        console.log('connected to IoT Hub');
    
        //publish the shadow document for the sensor
        var topic = SHADOW_TOPIC.replace('[thingName]', sensor.settings.clientId);
    
        shadowDocument.state.reported.name = sensor.name;
        shadowDocument.state.reported.enabled = true;
        shadowDocument.state.reported.geo.latitude = sensor.geo.latitude;
        shadowDocument.state.reported.geo.longitude = sensor.geo.longitude;
    
        device.publish(topic, JSON.stringify(shadowDocument)); 
    
        console.log('published to shadow topic ' + topic + ' ' + JSON.stringify(shadowDocument));
    
        //publish new value readings based on value_rate
        setInterval(function(){

            //calculate randome values for each sensor reading
            msg.pH = 20 + Math.floor((Math.random() * (80 - 1) + 1));
            msg.pH = (msg.pH / 10);

            msg.temperature = 30 + Math.floor((Math.random() * (80 - 1) + 1));
            msg.temperature = (msg.temperature / 10);

            msg.salinity = 40 + Math.floor((Math.random() * (80 - 1) + 1));
            msg.salinity = (msg.salinity / 10);

            msg.disolvedO2 = 50 + Math.floor((Math.random() * (80 - 1) + 1));
            msg.disolvedO2 = (msg.disolvedO2 / 10);

            msg.timestamp = new Date().getTime();

            //publish the sensor reading message
            var topic = VALUE_TOPIC.replace('[thingName]', sensor.settings.clientId);

            device.publish(topic, JSON.stringify(msg)); 

            console.log('published to telemetry topic ' + topic + ' ' + JSON.stringify(msg));

        }, VALUE_RATE);
    });

    device.on('error', function(error) {
        console.log('Error: ', error);
    });
}

//run simulation for each sensor
sensors.forEach((sensor) => {
    run(sensor);
})
