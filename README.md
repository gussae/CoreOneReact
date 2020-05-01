# aws-appsync-iot-core-realtime-dashboard

This application demonstrates a web application and a BI dashboard receiving real-time or batch updates from a series of IoT sensors.  It depicts a fictitious set of sensors deployed around the San Francisco Bay. The solution is built with React, AWS AppSync, AWS IoT Core, AWS IoT Analytics, Amazon Quicksight and AWS Identity services.

![Image description](images/map.jpg)

The sensors are represented as the colored dots.  Their color will fluxuate between red, green, and yellow based on the messages received from the sensors.

## Architecture

![Image description](images/architecture.jpg)

1. The sensor component is developed with the AWS IoT Device SDK for Javascript.  The sensors are registered as _Things_ in IoT Core and publish random values to the Cloud on a configurable frequency.  Metadata about each sensor, such as its geolocation, is stored in a _Thing Shadow_.

2. A rule in IoT Core subscribes to the message topic and forwards the JSON payload to a Lambda function and the IoT Analytics pipeline.

3. The Node js Lambda function executes a GraphQL mutatation in AppSync.  The mutation saves the latest value for the sensor in DynamoDB and broadcasts the latest value in real-time to the web dashboard. The Lambda function uses an IAM role and policy to obtain permissions to interact with AppSync.

4. The React web dashboard application is written in Typescript and subscribes to the AppSync sensor subscriptions.  When new  values are received, the map on the screen is updated in real-time to reflect the new sensor values. The application uses Cognito to authenticate users and allow them to perform the AppSync subscription. 

5. The Quicksight dashboard generates charts / reports for Business Intelligence functions using data from the IoT Analytics timeseries optimised datastore. 

## Getting Started

### **Prerequisites**

1. An AWS account in which you have Administrator access.

2. [Node JS](https://nodejs.org/en/download/) (^10.0) with NPM (^5.2)

3. [Amplify CLI](https://aws-amplify.github.io/docs/) (^4.0.0).
4. A [Mapbox](https://www.mapbox.com/) account with a free *Default Public Access Token*

After you have installed and configured Amplify, take note of the AWS profile you selected during the configuration.  If you created a profile other than **default**, you will need the profile name for later steps in the deployment.

### **Installing**

If you run into issues installing or configuring anything in this project please checkout the [Troubleshooting](#troubleshooting) section below.


**Clone this code repository**

```
$ git clone ssh://git.amazon.com/pkg/AWS-iotjumpstart-appsync-workshop
```

**Switch to the app's folder and initialize your Amplify environment**

```
$ cd aws-appsync-iot-core-realtime-dashboard

$ amplify init

? Enter a name for the environment: mysandbox

? Choose your default editor: [select your favorite IDE]

? Do you want to use an AWS profile? Yes

? Please choose the profile you want to use: default

? Do you want to configure Lambda Triggers for Cognito? (Y/n) n
```

When you select your profile, make sure to select the same profile you used when configuring Amplify.

Amplify will then begin to provision your account for the project deployment.

Once your account has been provisioned, entering the 'amplify status' command will show you the resources Amplify will create in your account:

```
$ amplify status
```

**Deploy the app infrastructure to your AWS account**

```
$ amplify push

? Do you want to update code for your updated GraphQL API (Y/n) Y

? This will overwrite your current graphql queries, mutations and subscriptions Y
```
You will then see a series of output messages as Amplify builds and deploys the app's CloudFormation Templates, creating the app infrastucture in your AWS account. 

Resources being created in your account include:

- AppSync GraphQL API
- DynamoDB Table
- Cognito User Pool
- Lambda Functions (3)
- IoT Rules (2)
- IoT Analytic

**Install the web app's Node js packages**

```
$ npm install
```

**Configure Mapbox API key**

This application uses maps from [Mapbox](https://www.mapbox.com/) to display the sensor locations.  You must create an account and request a free ***default access token***.  Once you have the token, update the ***src/settings.json*** file with the token value.

***src/settings.json***
```
{
    "mapboxApiAccessToken": "your-token-here"
}
```

**Install the IoT sensor simulator**

Open a new terminal window then switch to the app's sensor folder (aws-appsync-iot-core-realtime-dashboard/sensor). 

Install the Node js packages, and run the Node js app to create your sensor as a 'Thing' in AWS IoT Core.  It will also create and install the certificates your sensor needs to authenticate to IoT Core.

```
$ cd sensor
$ npm install
$ node create-sensors.js
```

*Note - this will create the sensors using your default AWS profile account and region.  If you have not specified a default region in your local AWS configuration, it will default to us-east-1.

If you do not have a **default** profile or you are using a profile other than **default**, run the app with an AWS_PROFILE environment variable specifiying the profile name you would like to use.

Replace [my-aws-profile] with the name of your profile:

```
$ AWS_PROFILE=[my-aws-profile] node create-sensor.js
```

## Run the App

**Start the IoT Sensor**

From the sensor terminal window:

```
$ node index.js
```
You will see output from the app as it connects to IoT Core and publishes new messages for the sensors. Each sensor will first transmit its shadow document and then sensor readings every few seconds according the to the sensor's transmission frequency setting.

```
connected to IoT Hub

published to shadow topic $aws/things/sensor-sf-east/shadow/update {"state":{"reported":{"name":"SF Bay - Southwest","enabled":true,"geo":{"latitude":37.602464,"longitude":-122.338036}}}}

published to telemetry topic dt/bay-health/SF/sensor-sf-east/sensor-value {"pH":3.9,"temperature":6.6,"salinity":9.7,"disolvedO2":7.9,"timestamp":1584818232693}

published to telemetry topic dt/bay-health/SF/sensor-sf-east/sensor-value {"pH":7.9,"temperature":3.5,"salinity":9.2,"disolvedO2":5.5,"timestamp":1584818234707}

published to telemetry topic dt/bay-health/SF/sensor-sf-east/sensor-value {"pH":3.4,"temperature":10.6,"salinity":7.6,"disolvedO2":7.7,"timestamp":1584818234782}
```

Keep this app running and switch to the terminal window for the **root** folder for the app.

**Start the web app**

Switch back to the terminal window pointing to the **root** folder and run:

```
$ npm start
```
This will launch the application in your machine's default web browser.

**Sign-up and Sign-in**

The web app requires users to authenticate via Cognito.  The first screen you will see is a logon screen.  Click the **Create account** link and create a new account using your email address.

Cognito will then email you a confirmation code.  Enter this code into the subsequent confirmation screen and logon to the app with your credentials.

**Use the App!**

You should now see a screen similar to the one at the top of this guide.  If you look at the terminal window running the sensor app, you shoud see the values being published to the Cloud reflected in the web app's sensor gauge in real-time.

From the initial map screen, click on a sensor to navigate to the sensor's detail page.

Click on a sensor to view the detailed values received in realtime from that specific sensor.

![Image description](images/sensor.jpg)

**Use the BI Dashboard**

Go to the AWS Quicksight console in North Virginia region - 

```
a. Enroll for standard edition (if you have not used it before)
b. Click on your login user (upper right) -> Manage Quicksight -> Account Settings -> Add and Remove -> Check IOT Analytics -> Apply
c. Click on Quicksight logo (upper left) to navigate to home page 
d. Change the region to your working region now
```
Once the configuration is complete , please do the following - 
```
a. Select New Analysis -> New data set -> Choose AWS IOT Analytics
b. Select an AWS IOT Analytics dataset to import - Choose jumpstart_dataset
d. Click Create data source -> Visualize
e. Determine the home energy consumption - 
    i.   Choose sensorid for Y axis 
    ii.  Choose all the sensor* readings for Value axis
    iii. Choose average from Value drop down
```
The graphs may look similar to below.

![Image description](images/quicksight.jpg)

Please feel free to play with different visual types for visualizing other smart home related information. 


## Cleanup

Once you are finished working with this project, you may want to delete the resources it created in your AWS account.  From the **root** folder:

```
$ amplify delete
? Are you sure you want to continue? (This would delete all the environments of the project from the cloud and wipe out all the local amplify resource files) (Y/n)  Y
```

Please navigate to AWS Quicksight console, choose all analysis and delete the jumpstart_dataset manually. 

## Troubleshooting

**Installing Amplify**
```
$ npm install -g @aws-amplify/cli
```

If you receive EACCES permisisons errors, make sure your system is setup properly to install global packages.  See this [Guide for options](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally).

## License

This sample code is made available under a modified MIT-0 license. See the LICENSE file.
