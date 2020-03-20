/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiIotjumpstartappsyncGraphQLAPIIdOutput = process.env.API_IOTJUMPSTARTAPPSYNC_GRAPHQLAPIIDOUTPUT
var apiIotjumpstartappsyncGraphQLAPIEndpointOutput = process.env.API_IOTJUMPSTARTAPPSYNC_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const appsync = require('aws-appsync');
const gql = require('graphql-tag');
require('cross-fetch/polyfill');

const region = process.env.REGION
const apiIotdashboardGraphQLAPIEndpointOutput = process.env.API_IOTJUMPSTARTAPPSYNC_GRAPHQLAPIENDPOINTOUTPUT

AWS.config.update({
    region: region
});

const credentials = AWS.config.credentials;

exports.handler = async (event) => {

    console.log('event received:' + JSON.stringify(event));
    
    //create appsync client - using IAM permissions
    const graphqlClient = new appsync.AWSAppSyncClient({
        url: apiIotdashboardGraphQLAPIEndpointOutput,
        region: region,
        auth: {
          type: 'AWS_IAM',
          credentials: credentials
        },
        disableOffline: true
    });

    //define the graphql mutation to create the sensor values
    const mutation = gql`mutation CreateSensorValue(
        $input: CreateSensorValueInput!
        $condition: ModelSensorValueConditionInput
      ) {
        createSensorValue(input: $input, condition: $condition) {
          id
          sensorId
          valueType
          value
          status
          timestamp
        }
      }`;

    //set the status based on the current value
    let status = Math.floor(Math.random() * 3) + 1;
    
    // if (event.data.value < 5 || event.data.value > 9) {
    //     status = 3;
    // } else if (event.data.value >= 5 && event.data.value <= 6){
    //     status = 2;
    // } else if (event.data.value >= 8 && event.data.value <= 9){
    //   status = 2;
    // }

    //execute the mutation
    try {

      var r = await graphqlClient.mutate({
        mutation,
        variables: {input: {
            sensorId: event.sensorId,
            value: event.data.pH,
            valueType: 'PH',
            status: status,
            timestamp: event.data.timestamp
        }}
      });

      r = await graphqlClient.mutate({
        mutation,
        variables: {input: {
            sensorId: event.sensorId,
            value: event.data.temperature,
            valueType: 'TEMPERATURE',
            status: status,
            timestamp: event.data.timestamp
        }}
      });

      r = await graphqlClient.mutate({
        mutation,
        variables: {input: {
            sensorId: event.sensorId,
            value: event.data.salinity,
            valueType: 'SALINITY',
            status: status,
            timestamp: event.data.timestamp
        }}
      });

      r = await graphqlClient.mutate({
        mutation,
        variables: {input: {
            sensorId: event.sensorId,
            value: event.data.disolvedO2,
            valueType: 'DISOLVED_O2',
            status: status,
            timestamp: event.data.timestamp
        }}
      });

      const response = {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success', data: r })
      }
    
      return response
    }
    catch (err) {

      const response = {
        statusCode: 400,
        body: JSON.stringify({ message: err.message })
      }

      return response
    }
}
