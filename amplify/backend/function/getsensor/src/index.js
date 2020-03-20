const AWS = require('aws-sdk');
const iotClient = new AWS.Iot();

var region = process.env.REGION;

AWS.config.update({
    region: region
});

exports.handler = async (event) => {


    //query for the sensor confirming it has a reported shadow
    //you must have fleet indexing enabled in IoT Core with REGISTRY_AND_SHADOW indexed
    
    var params = {
        queryString: 'shadow.reported.name:* AND thingName:' + event.arguments.sensorId
    };

    try {

        var result = await iotClient.searchIndex(params).promise();

        var element = result.things[0];

        var shadow = JSON.parse(element.shadow);

        shadow.reported.sensorId = element.thingName;

        return shadow.reported;
    }
    catch (err) {

        console.log("error: " + err);

        throw err;
    }

};
