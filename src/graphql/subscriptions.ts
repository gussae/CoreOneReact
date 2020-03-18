// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateSensorValue = /* GraphQL */ `
  subscription OnCreateSensorValue($sensorId: String!) {
    onCreateSensorValue(sensorId: $sensorId) {
      id
      sensorId
      valueType
      value
      status
      timestamp
    }
  }
`;
export const onCreateSensorValues = /* GraphQL */ `
  subscription OnCreateSensorValues {
    onCreateSensorValues {
      id
      sensorId
      valueType
      value
      status
      timestamp
    }
  }
`;
