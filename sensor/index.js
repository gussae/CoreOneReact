const awsIot = require('aws-iot-device-sdk');

//load the sensors file that contains the location of the device certificates and the clientId of the sensor
var sensors = require('./sensors.json');

//constants used in the application
const SHADOW_TOPIC = "$aws/things/[deviceId]/shadow/update";
//"$aws/things/[thingName]/shadow/update";
const VALUE_TOPIC = "dt/coreone/[cognitoUserId]/[deviceId]/all" //topic to which sensor values will be published
//"dt/bay-health/SF/[thingName]/sensor-value"; 

//shadow document to be transmitted at startup
var shadowDocument = {
    state: {
        reported: {
            DeviceType: "",
            SetTemp: 0,            
            State: true,            
        }
    }
}

async function run(sensor) {

    //initialize the IOT device
    var device = awsIot.device(sensor.settings);

    //create a placeholder for the message
    var msg = {
        timestamp: new Date().getTime(),
        deviceType: sensor.DeviceType,
        currentTemp: 0,
        state: true,
        pressure: 0,
        flow: 0,
        energy: 0,
        UV: 0,
        angle: 0,
        longitude: sensor.longitude,
        latitude: sensor.latitude
    }

    device.on('connect', function() {
    
        console.log('connected to IoT Hub');
    
        //publish the shadow document for the sensor
        var topic = SHADOW_TOPIC.replace('[deviceId]', sensor.settings.clientId);
    
        shadowDocument.state.reported.DeviceType = sensor.DeviceType;
        shadowDocument.state.reported.SetTemp = 0;
        shadowDocument.state.reported.State = true;        
    
        device.publish(topic, JSON.stringify(shadowDocument)); 
    
        console.log('published to shadow topic ' + topic + ' ' + JSON.stringify(shadowDocument));
    
        //publish new value readings based on value_rate
        setInterval(function(){

            //calculate randome values for each sensor reading
            msg.currentTemp = RandomValue(480, 570) / 10;
            msg.state = true;
            msg.pressure = RandomValue(50, 100) / 10;
            msg.flow = RandomValue(50, 100) / 10;
            msg.energy = RandomValue(50, 100) / 10;
            msg.UV = RandomValue(50, 100) / 10;
            msg.angle = RandomValue(0, 3600) / 10;

            msg.timestamp = new Date().getTime();

            //publish the sensor reading message
            var topic = VALUE_TOPIC.replace('[deviceId]', sensor.settings.clientId);
            topic = topic.replace('[cognitoUserId]', sensor.cognitoUserId);            

            device.publish(topic, JSON.stringify(msg)); 

            console.log('published to telemetry topic ' + topic + ' ' + JSON.stringify(msg));

        }, sensor.frequency);
    });

    device.on('error', function(error) {
        console.log('Error: ', error);
    });
}

function RandomValue (min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//run simulation for each sensor
sensors.forEach((sensor) => {
    run(sensor);
})
