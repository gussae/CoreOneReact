/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSensor = /* GraphQL */ `
  mutation CreateSensor(
    $input: CreateSensorInput!
    $condition: ModelSensorConditionInput
  ) {
    createSensor(input: $input, condition: $condition) {
      device_id
      device_type
      timestamp
      payload
    }
  }
`;
export const updateSensor = /* GraphQL */ `
  mutation UpdateSensor(
    $input: UpdateSensorInput!
    $condition: ModelSensorConditionInput
  ) {
    updateSensor(input: $input, condition: $condition) {
      device_id
      device_type
      timestamp
      payload
    }
  }
`;
export const deleteSensor = /* GraphQL */ `
  mutation DeleteSensor(
    $input: DeleteSensorInput!
    $condition: ModelSensorConditionInput
  ) {
    deleteSensor(input: $input, condition: $condition) {
      device_id
      device_type
      timestamp
      payload
    }
  }
`;
export const createClientDevice = /* GraphQL */ `
  mutation CreateClientDevice(
    $input: CreateClientDeviceInput!
    $condition: ModelClientDeviceConditionInput
  ) {
    createClientDevice(input: $input, condition: $condition) {
      client_id
      device_id
      device_type
    }
  }
`;
export const updateClientDevice = /* GraphQL */ `
  mutation UpdateClientDevice(
    $input: UpdateClientDeviceInput!
    $condition: ModelClientDeviceConditionInput
  ) {
    updateClientDevice(input: $input, condition: $condition) {
      client_id
      device_id
      device_type
    }
  }
`;
export const deleteClientDevice = /* GraphQL */ `
  mutation DeleteClientDevice(
    $input: DeleteClientDeviceInput!
    $condition: ModelClientDeviceConditionInput
  ) {
    deleteClientDevice(input: $input, condition: $condition) {
      client_id
      device_id
      device_type
    }
  }
`;
