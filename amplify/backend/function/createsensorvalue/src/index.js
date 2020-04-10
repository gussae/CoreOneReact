/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiIotjumpstartappsyncGraphQLAPIIdOutput = process.env.API_IOTJUMPSTARTAPPSYNC_GRAPHQLAPIIDOUTPUT
var apiIotjumpstartappsyncGraphQLAPIEndpointOutput = process.env.API_IOTJUMPSTARTAPPSYNC_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

const https = require('https');
const AWS = require('aws-sdk');
const urlParse = require("url").URL;

//environment variables
const region = process.env.REGION
const appsyncUrl = process.env.API_IOTJUMPSTARTAPPSYNC_GRAPHQLAPIENDPOINTOUTPUT
const endpoint = new urlParse(appsyncUrl).hostname.toString();

exports.handler = async (event) => {

  console.log('event received:' + JSON.stringify(event));
  
  const req = new AWS.HttpRequest(appsyncUrl, region);

  //define the graphql mutation to create the sensor values
  const mutationName = 'CreateSensorValue';

  const mutation = `mutation CreateSensorValue(
      $input: CreateSensorValueInput!
      $condition: ModelSensorValueConditionInput
    ) {
      createSensorValue(input: $input, condition: $condition) {
        id
        sensorId
        pH
        temperature
        salinity
        disolvedO2
        status
        timestamp
      }
    }`;

    //set a random sensor status 1-3
    let status = Math.floor(Math.random() * 3) + 1;
    
    //create the mutuation input from the sensor event data
    const item = {
      input: {
        sensorId: event.sensorId,
        pH: event.data.pH,
        temperature: event.data.temperature,
        salinity: event.data.salinity,
        disolvedO2: event.data.disolvedO2,
        status: status,
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
      throw new Error("Error creating sensor value for sensor: " + event.sensorId);
    }
}
