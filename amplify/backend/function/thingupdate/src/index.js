/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiCoreoneappsyncGraphQLAPIIdOutput = process.env.API_COREONEAPPSYNC_GRAPHQLAPIIDOUTPUT
var apiCoreoneappsyncGraphQLAPIEndpointOutput = process.env.API_COREONEAPPSYNC_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

const https = require('https');
const urlParse = require("url").URL;
const AWS = require('aws-sdk');
const iot = new AWS.Iot();

//environment variables
var region = process.env.REGION;
const appsyncUrl = process.env.API_COREONEAPPSYNC_GRAPHQLAPIENDPOINTOUTPUT
const endpoint = new urlParse(appsyncUrl).hostname.toString();


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
    const deviceType = payload.DeviceType || "";

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
                    }
                    else {                
                        throw new Error("Device not found:" + deviceId);
                    }
                */
            }
        });


        const req = new AWS.HttpRequest(appsyncUrl, region);
        //define the graphql mutation to create the device values
        const mutationName = 'CreateCoreOneOutgoingData';

        const mutation = `mutation CreateCoreOneOutgoingData(
            $input: CreateCoreOneOutgoingDataInput!
            $condition: ModelCoreOneOutgoingDataConditionInput
        ) {
            createCoreOneOutgoingData(input: $input, condition: $condition) {
            device_id
            device_type
            payload
            timestamp
            }
        }`;

        const jsonPayload = JSON.stringify(payload);
        const item = {
            input: {
                device_id: deviceId,
                device_type: deviceType,
                payload: jsonPayload,
                timestamp: timestamp
            }
        };

        //execute the mutation
        try {

            req.method = "POST";
            req.headers.host = endpoint;
            req.headers["Content-Type"] = "application/json";
            req.body = JSON.stringify({
                query: mutation,
                operationName: mutationName,
                variables: item
            });

            const signer = new AWS.Signers.V4(req, "appsync", true);
            signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

            const data = await new Promise((resolve, reject) => {
                const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
                    result.on('data', (data) => {
                        resolve(JSON.parse(data.toString()));
                    });
                });

                httpRequest.write(req.body);
                httpRequest.end();

            });

            console.log("Successful mutation");

            /*return {
                statusCode: 200,
                body: data
            };*/
            return data.data.createCoreOneOutgoingData;
        }
        catch (err) {
            console.log("error: " + err);
            throw new Error("Error creating device value for device: " + deviceId);
        }
    }
    catch (err) {

        console.log("error: " + err);
        throw new Error("Error retrieving device: " + deviceId);
    }
};

