/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
