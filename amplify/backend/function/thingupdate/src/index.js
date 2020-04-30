const AWS = require('aws-sdk');
const iot = new AWS.Iot();


var region = process.env.REGION;

AWS.config.update({
    region: region
});

exports.handler = async (event) => {

    //query for the device confirming it has a reported shadow
    //you must have fleet indexing enabled in IoT Core with REGISTRY_AND_SHADOW indexed
    //const SHADOW_TOPIC = "$aws/things/[deviceId]/shadow/update/delta"

    const deviceId = event.arguments.device_id || "";
    const payload = event.arguments.input.payload || "";
    const timestamp = event.arguments.input.timestamp || "";    
    const deviceType = payload.DeviceType;

    try {
        //var topic = SHADOW_TOPIC.replace('[deviceId]', deviceId);

        var params = { endpointType: 'iot:Data-ATS' };
        var result = await iot.describeEndpoint(params).promise();
        const host = result.endpointAddress;
        var iotdata = new AWS.IotData({ endpoint: host });
        console.log(host);
        var shadowDocument = {
            state: {
                desired: payload
            }
        }
        var payload_value = JSON.stringify(shadowDocument);
        var params = {
            payload: payload_value /* Strings will be Base-64 encoded on your behalf */, /* required */
            thingName: deviceId /* required */
        };
        console.log("about to update shadow");
        iotdata.updateThingShadow(params, function (err, data) {
            if (err) {
                console.log("error");
                console.log(err, err.stack); // an error occurred  
                return err.stack;
            }
            else {
                console.log("data");
                console.log(data);           // successful response
/*
                var params = {
                    queryString: 'shadow.reported.name:* AND thingName:' + deviceId
                };

                var result = iot.searchIndex(params).promise();

                if (result.things.length > 0) {

                    var element = result.things[0];

                    var shadow = JSON.parse(element.shadow);

                    shadow.reported.deviceId = element.thingName;

                    return shadow.reported;
*/
                }
                else {

                    throw new Error("Device not found:" + deviceId);
                }
            }
        });
    }
    catch (err) {

        console.log("error: " + err);
        throw new Error("Error retrieving device: " + deviceId);
    }
};

