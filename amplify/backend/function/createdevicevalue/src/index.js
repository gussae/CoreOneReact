/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiCoreoneappsyncGraphQLAPIIdOutput = process.env.API_COREONEAPPSYNC_GRAPHQLAPIIDOUTPUT
var apiCoreoneappsyncGraphQLAPIEndpointOutput = process.env.API_COREONEAPPSYNC_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

const https = require('https');
const AWS = require('aws-sdk');
const urlParse = require("url").URL;

//environment variables
const region = process.env.REGION
const appsyncUrl = process.env.API_COREONEAPPSYNC_GRAPHQLAPIENDPOINTOUTPUT
const endpoint = new urlParse(appsyncUrl).hostname.toString();

exports.handler = async (event) => {

  console.log('event received:' + JSON.stringify(event));
  
  const req = new AWS.HttpRequest(appsyncUrl, region);

  //define the graphql mutation to create the device values
  const mutationName = 'CreateCoreOneIncomingData';

  const mutation = `mutation CreateCoreOneIncomingData(
      $input: CreateCoreOneIncomingDataInput!
      $condition: ModelCoreOneIncomingDataConditionInput
    ) {
      createCoreOneIncomingData(input: $input, condition: $condition) {
        device_id
        device_type
        payload
        timestamp
      }
    }`;
    
    //create the mutuation input from the device event data
    const payload = {
      DeviceType: event.data.deviceType,
      CurrentTemp: event.data.currentTemp,
      State: event.data.state,
      Pressure: event.data.pressure,
      Flow: event.data.flow,
      Energy: event.data.energy,
      UV: event.data.UV,
      Angle: event.data.angle,
      Longitude: event.data.longitude,
      Latitude: event.data.latitude,
      cognitoUserId: event.cognitoUserId 
    }

    const jsonPayload = JSON.stringify(payload);

    const item = {
      input: {
        device_id: event.deviceId,
        device_type: event.data.deviceType,
        payload: jsonPayload,
        timestamp: event.data.timestamp
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

      return {
          statusCode: 200,
          body: data
      };

    }
    catch (err) {
      console.log("error: " + err);
      throw new Error("Error creating device value for device: " + event.deviceId);
    }
}
