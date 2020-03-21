/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiIotjumpstartappsyncGraphQLAPIIdOutput = process.env.API_IOTJUMPSTARTAPPSYNC_GRAPHQLAPIIDOUTPUT
var apiIotjumpstartappsyncGraphQLAPIEndpointOutput = process.env.API_IOTJUMPSTARTAPPSYNC_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const Amplify = require('aws-amplify')

const API = Amplify.API;
const graphqlOperation = Amplify.graphqlOperation;

//environment variables
const region = process.env.REGION
const endpoint = process.env.API_IOTJUMPSTARTAPPSYNC_GRAPHQLAPIENDPOINTOUTPUT

AWS.config.update({
    region: region
});

Amplify.default.configure({
  aws_appsync_graphqlEndpoint: endpoint,
  aws_appsync_region: region,
  aws_appsync_authenticationType: 'AWS_IAM',
});

exports.handler = async (event) => {

  console.log('event received:' + JSON.stringify(event));
  
  //define the graphql mutation to create the sensor values
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
    
    //execute the mutation
    try {

      const response = await API.graphql(graphqlOperation(
        mutation, {input: {
          sensorId: event.sensorId,
          pH: event.data.pH,
          temperature: event.data.temperature,
          salinity: event.data.salinity,
          disolvedO2: event.data.disolvedO2,
          status: status,
          timestamp: event.data.timestamp
        }})
      );

      console.log("Successfull mutation");
      return response

    }
    catch (err) {
      console.log("error: " + err);
      throw new Error("Error creating sensor value for sensor: " + event.sensorId);
    }
}
