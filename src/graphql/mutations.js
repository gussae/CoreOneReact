/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateCoreOne = /* GraphQL */ `
  mutation UpdateCoreOne($device_id: String!, $input: CoreOneDeviceDataInput!) {
    updateCoreOne(device_id: $device_id, input: $input) {
      device_id
      device_type
      payload
      timestamp
    }
  }
`;
export const createCoreOneAssigned = /* GraphQL */ `
  mutation CreateCoreOneAssigned(
    $input: CreateCoreOneAssignedInput!
    $condition: ModelCoreOneAssignedConditionInput
  ) {
    createCoreOneAssigned(input: $input, condition: $condition) {
      client_id
      device_id
      device_type
      status_value
    }
  }
`;
export const updateCoreOneAssigned = /* GraphQL */ `
  mutation UpdateCoreOneAssigned(
    $input: UpdateCoreOneAssignedInput!
    $condition: ModelCoreOneAssignedConditionInput
  ) {
    updateCoreOneAssigned(input: $input, condition: $condition) {
      client_id
      device_id
      device_type
      status_value
    }
  }
`;
export const deleteCoreOneAssigned = /* GraphQL */ `
  mutation DeleteCoreOneAssigned(
    $input: DeleteCoreOneAssignedInput!
    $condition: ModelCoreOneAssignedConditionInput
  ) {
    deleteCoreOneAssigned(input: $input, condition: $condition) {
      client_id
      device_id
      device_type
      status_value
    }
  }
`;
export const createCoreOneIncomingData = /* GraphQL */ `
  mutation CreateCoreOneIncomingData(
    $device_id: String!
    $timestamp: AWSTimestamp!
    $payload: AWSJSON!
    $device_type: String!
  ) {
    createCoreOneIncomingData(
      device_id: $device_id
      timestamp: $timestamp
      payload: $payload
      device_type: $device_type
    ) {
      device_id
      device_type
      payload
      timestamp
    }
  }
`;
export const updateCoreOneIncomingData = /* GraphQL */ `
  mutation UpdateCoreOneIncomingData(
    $input: UpdateCoreOneIncomingDataInput!
    $condition: ModelCoreOneIncomingDataConditionInput
  ) {
    updateCoreOneIncomingData(input: $input, condition: $condition) {
      device_id
      device_type
      payload
      timestamp
    }
  }
`;
export const deleteCoreOneIncomingData = /* GraphQL */ `
  mutation DeleteCoreOneIncomingData(
    $input: DeleteCoreOneIncomingDataInput!
    $condition: ModelCoreOneIncomingDataConditionInput
  ) {
    deleteCoreOneIncomingData(input: $input, condition: $condition) {
      device_id
      device_type
      payload
      timestamp
    }
  }
`;
export const createCoreOneOutgoingData = /* GraphQL */ `
  mutation CreateCoreOneOutgoingData(
    $device_id: String!
    $timestamp: AWSTimestamp!
    $payload: AWSJSON!
    $device_type: String!
  ) {
    createCoreOneOutgoingData(
      device_id: $device_id
      timestamp: $timestamp
      payload: $payload
      device_type: $device_type
    ) {
      device_id
      device_type
      payload
      timestamp
    }
  }
`;
export const updateCoreOneOutgoingData = /* GraphQL */ `
  mutation UpdateCoreOneOutgoingData(
    $input: UpdateCoreOneOutgoingDataInput!
    $condition: ModelCoreOneOutgoingDataConditionInput
  ) {
    updateCoreOneOutgoingData(input: $input, condition: $condition) {
      device_id
      device_type
      payload
      timestamp
    }
  }
`;
export const deleteCoreOneOutgoingData = /* GraphQL */ `
  mutation DeleteCoreOneOutgoingData(
    $input: DeleteCoreOneOutgoingDataInput!
    $condition: ModelCoreOneOutgoingDataConditionInput
  ) {
    deleteCoreOneOutgoingData(input: $input, condition: $condition) {
      device_id
      device_type
      payload
      timestamp
    }
  }
`;
