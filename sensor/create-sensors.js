process.env.AWS_SDK_LOAD_CONFIG = true;

const AWS = require('aws-sdk');
const fs = require('fs').promises;

//if a region is not specified in your local AWS config, it will default to us-east-1
const REGION = AWS.config.region || 'us-east-1';

//if you wish to use a profile other than default, set an AWS_PROFILE environment variable when you run this app
//for example:
//AWS_PROFILE=my-aws-profile node create-sensor.js
const PROFILE = process.env.AWS_PROFILE || 'default';

//constants used in the app - do not change
const SETTINGS_FILE = './settings.json';
const SENSOR_FILE = './sensor.json';
const CERT_FOLDER = './certs/';
const POLICY_FILE = './policy.json';

//open sensor app settings file
var settings = require(SETTINGS_FILE);

//open sensor definition file
var sensor = require(SENSOR_FILE);

//use the credentials from the AWS profile
var credentials = new AWS.SharedIniFileCredentials({profile: PROFILE});
AWS.config.credentials = credentials;

AWS.config.update({
    region: REGION
});

//store consolidated results from various functions
var results = {
  uid: new Date().getTime(),
  policyArn: "",
  policyName: "",
  certificateArn: "",
  certificatePem: "",
  privateKey: ""
}

async function createSensors(){

  try {

    var iot = new AWS.Iot();

    //create a unique thing name
    settings.thingName = "sensor-" + results.uid;
  
    // get the regional IOT endpoint
    var params = { endpointType: 'iot:Data-ATS'};
    var result = await iot.describeEndpoint(params).promise();
    settings.host = result.endpointAddress;
  
    //enable thing fleet indexing to enable searching things
    params = {
      thingIndexingConfiguration: { 
      thingIndexingMode: "REGISTRY_AND_SHADOW"
      }
    }

    result = await iot.updateIndexingConfiguration(params).promise();

    //create the IOT policy
    var policyDocument = require(POLICY_FILE);
    results.policyName = 'Policy-' + results.uid;

    var policy = { policyName: results.policyName, policyDocument: JSON.stringify(policyDocument)};
    
    result = await  iot.createPolicy(policy).promise()
    results.policyArn = result.policyArn;
    
    //create the certificates
    result = await iot.createKeysAndCertificate({setAsActive:true}).promise();
    results.certificateArn = result.certificateArn;
    results.certificatePem = result.certificatePem;
    results.privateKey = result.keyPair.PrivateKey;

    //save the certificate
    var fileName = CERT_FOLDER + settings.thingName + '-certificate.pem.crt';
    settings.certPath = fileName;
    await fs.writeFile(fileName, results.certificatePem);

    //save the private key
    fileName = CERT_FOLDER + settings.thingName + '-private.pem.key';
    settings.keyPath = fileName;
    await fs.writeFile(fileName, results.privateKey);

    //create the thing type
    params = {
      thingTypeName: sensor.thingTypeName
    }
    await iot.createThingType(params).promise();

    //create the thing
    params = {
      thingName: settings.thingName,
      attributePayload: {
        attributes: {
          'Manufacturer': sensor.manufacturer,
          'Model': sensor.model,
          'Firmware': sensor.firmware
        },
        merge: false
      },
      thingTypeName: sensor.thingTypeName
    };

    await iot.createThing(params).promise();

    //attach policy to certificate
    await iot.attachPolicy({ policyName: results.policyName, target: results.certificateArn}).promise();
        
    //attach thing to certificate
    await iot.attachThingPrincipal({thingName: settings.thingName, principal: results.certificateArn}).promise();

    //save the updated settings file
    let data = JSON.stringify(settings, null, 2);
    await fs.writeFile(SETTINGS_FILE, data);

    //display results
    console.log('IOT device provisioned');
    console.log('Thing Name: ' + settings.thingName);
    console.log('AWS Region: ' + REGION);
    console.log('AWS Profile: ' + PROFILE);

  }
  catch (err) {

    console.log('Error creating sensors');
    console.log(err.message);
  }

}

createSensors();
