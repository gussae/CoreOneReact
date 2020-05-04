/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSensor = /* GraphQL */ `
  query GetSensor($device_id: ID!) {
    getSensor(device_id: $device_id) {
      device_id
      device_type
      timestamp
      payload
    }
  }
`;
export const listSensors = /* GraphQL */ `
  query ListSensors(
    $device_id: ID
    $filter: ModelSensorFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSensors(
      device_id: $device_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        device_id
        device_type
        timestamp
        payload
      }
      nextToken
    }
  }
`;
export const getClientDevice = /* GraphQL */ `
  query GetClientDevice($client_id: ID!) {
    getClientDevice(client_id: $client_id) {
      client_id
      device_id
      device_type
    }
  }
`;
export const listClientDevices = /* GraphQL */ `
  query ListClientDevices(
    $client_id: ID
    $filter: ModelClientDeviceFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listClientDevices(
      client_id: $client_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        client_id
        device_id
        device_type
      }
      nextToken
    }
  }
`;
