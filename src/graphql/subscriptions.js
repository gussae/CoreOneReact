/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateSensor = /* GraphQL */ `
  subscription OnUpdateSensor($device_id: ID!) {
    onUpdateSensor(device_id: $device_id) {
      device_id
      device_type
      timestamp
      payload
    }
  }
`;
export const onUpdateSensors = /* GraphQL */ `
  subscription OnUpdateSensors {
    onUpdateSensors {
      device_id
      device_type
      timestamp
      payload
    }
  }
`;
