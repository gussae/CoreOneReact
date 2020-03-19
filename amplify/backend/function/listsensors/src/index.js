const AWS = require('aws-sdk');
const iotClient = new AWS.Iot();

let iotDataClient;

exports.handler = async (event) => {

    if (!iotDataClient) {
        const result = await iotClient.describeEndpoint().promise();
        iotDataClient = new AWS.IotData({endpoint: result.endpointAddress});
    }
    
    //query all sensors that have reported a shadow and of type water quality sensor
    var params = {
        queryString: 'shadow.reported.name:* AND thingTypeName:WATER_QUALITY_SENSOR'
    };

    iotDataClient.searchIndex(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            return {error: err}
        }
        else {
            console.log(data);
            return {items: date}
        }
    });
};
