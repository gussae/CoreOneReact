/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiCoreonewebGraphQLAPIIdOutput = process.env.API_COREONEWEB_GRAPHQLAPIIDOUTPUT
var apiCoreonewebGraphQLAPIEndpointOutput = process.env.API_COREONEWEB_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const appsync = require('aws-appsync');
const gql = require('graphql-tag');
require('cross-fetch/polyfill');

var region = process.env.REGION
var apiCoreonewebGraphQLAPIEndpointOutput = process.env.API_COREONEWEB_GRAPHQLAPIENDPOINTOUTPUT

AWS.config.update({
    region: region
});

const credentials = AWS.config.credentials;


exports.handler = async (event) => {

    console.log('event received:' + JSON.stringify(event));
    
    //create appsync client - using IAM permissions
    const graphqlClient = new appsync.AWSAppSyncClient({
        url: apiCoreonewebGraphQLAPIEndpointOutput,
        region: region,
        auth: {
          type: 'AWS_IAM',
          credentials: credentials
        },
        disableOffline: true
    });

    //define the graphql mutation to update the sensor
    const mutation = gql`mutation UpdateSensor(
        $input: UpdateSensorInput!
        $condition: ModelSensorConditionInput
      ) {
        updateSensor(input: $input, condition: $condition) {
          device_id
          device_type
          timestamp
          payload
        }
      }`;

    //execute the mutation
    try {
      var r = await graphqlClient.mutate({
        mutation,
        variables: {input: {
          device_id: event.device_id,
          device_type: event.device_type,
          timestamp: event.data.timestamp,
          payload: JSON.stringify(event.data.payload)
        }}
      });

      const response = {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success', data: r })
      }
    
      return response
    }
    catch (err) {
      console.log("an error occured", err);

      const response = {
        statusCode: 400,
        body: JSON.stringify({ message: err.message })
      }

      return response
    }
}

