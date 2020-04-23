const AWS = require('aws-sdk');
const iot = new AWS.Iot();


var region = process.env.REGION;

AWS.config.update({
    region: region
});

exports.handler = async (event) => {

    //query for the sensor confirming it has a reported shadow
    //you must have fleet indexing enabled in IoT Core with REGISTRY_AND_SHADOW indexed

    const sensorId = event.arguments.sensorId || "";
    const desiredState = event.arguments.desiredState || "true";

    try {

            var params = { endpointType: 'iot:Data-ATS'};
            var result = await iot.describeEndpoint(params).promise();
            const host = result.endpointAddress;
            var iotdata = new AWS.IotData({endpoint: host});
            
            var params = {
                //queryString: 'shadow.reported.name:* AND thingName:' + sensorId
                payload: `{"enabled":"${desiredState}"}` /* Strings will be Base-64 encoded on your behalf */, /* required */
                thingName: sensorId /* required */
            };
            
            iotdata.updateThingShadow(params, function(err, data) {
              if (err) {
                    console.log(err, err.stack); // an error occurred  
                    return err.stack;
                }                
              else 
              {    
                console.log(data);           // successful response
                return data;
              }
            });
    }
    catch (err) {

        console.log("error: " + err);
        throw new Error("Error retrieving sensor: " + sensorId);
    }
};

