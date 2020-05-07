/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCoreOneAssigned = /* GraphQL */ `
  mutation CreateCoreOneAssigned(
    $condition: ModelCoreOneAssignedConditionInput
    $input: CreateCoreOneAssignedInput!
  ) {
    createCoreOneAssigned(condition: $condition, input: $input) {
      client_id
      device_id
      device_type
      status_value
    }
  }
`;
export const createCoreOneIncomingData = /* GraphQL */ `
  mutation CreateCoreOneIncomingData(
    $condition: ModelCoreOneIncomingDataConditionInput
    $input: CreateCoreOneIncomingDataInput!
  ) {
    createCoreOneIncomingData(condition: $condition, input: $input) {
      device_id
      device_type
      payload
      timestamp
    }
  }
`;
export const createCoreOneOutgoingData = /* GraphQL */ `
  mutation CreateCoreOneOutgoingData(
    $condition: ModelCoreOneOutgoingDataConditionInput
    $input: CreateCoreOneOutgoingDataInput!
  ) {
    createCoreOneOutgoingData(condition: $condition, input: $input) {
      device_id
      device_type
      payload
      timestamp
    }
  }
`;
export const deleteCoreOneAssigned = /* GraphQL */ `
  mutation DeleteCoreOneAssigned(
    $condition: ModelCoreOneAssignedConditionInput
    $input: DeleteCoreOneAssignedInput!
  ) {
    deleteCoreOneAssigned(condition: $condition, input: $input) {
      client_id
      device_id
      device_type
      status_value
    }
  }
`;
export const deleteCoreOneIncomingData = /* GraphQL */ `
  mutation DeleteCoreOneIncomingData(
    $condition: ModelCoreOneIncomingDataConditionInput
    $input: DeleteCoreOneIncomingDataInput!
  ) {
    deleteCoreOneIncomingData(condition: $condition, input: $input) {
      device_id
      device_type
      payload
      timestamp
    }
  }
`;
export const deleteCoreOneOutgoingData = /* GraphQL */ `
  mutation DeleteCoreOneOutgoingData(
    $condition: ModelCoreOneOutgoingDataConditionInput
    $input: DeleteCoreOneOutgoingDataInput!
  ) {
    deleteCoreOneOutgoingData(condition: $condition, input: $input) {
      device_id
      device_type
      payload
      timestamp
    }
  }
`;
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
export const updateCoreOneAssigned = /* GraphQL */ `
  mutation UpdateCoreOneAssigned(
    $condition: ModelCoreOneAssignedConditionInput
    $input: UpdateCoreOneAssignedInput!
  ) {
    updateCoreOneAssigned(condition: $condition, input: $input) {
      client_id
      device_id
      device_type
      status_value
    }
  }
`;
export const updateCoreOneIncomingData = /* GraphQL */ `
  mutation UpdateCoreOneIncomingData(
    $condition: ModelCoreOneIncomingDataConditionInput
    $input: UpdateCoreOneIncomingDataInput!
  ) {
    updateCoreOneIncomingData(condition: $condition, input: $input) {
      device_id
      device_type
      payload
      timestamp
    }
  }
`;
export const updateCoreOneOutgoingData = /* GraphQL */ `
  mutation UpdateCoreOneOutgoingData(
    $condition: ModelCoreOneOutgoingDataConditionInput
    $input: UpdateCoreOneOutgoingDataInput!
  ) {
    updateCoreOneOutgoingData(condition: $condition, input: $input) {
      device_id
      device_type
      payload
      timestamp
    }
  }
`;
