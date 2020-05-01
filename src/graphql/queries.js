/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSensor = /* GraphQL */ `
  query GetSensor($id: ID!) {
    getSensor(id: $id) {
      device_id
      device_type
      timestamp
      payload
    }
  }
`;
export const listSensors = /* GraphQL */ `
  query ListSensors(
    $filter: ModelSensorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSensors(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const searchSensors = /* GraphQL */ `
  query SearchSensors(
    $filter: SearchableSensorFilterInput
    $sort: SearchableSensorSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchSensors(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        device_id
        device_type
        timestamp
        payload
      }
      nextToken
      total
    }
  }
`;
export const getClientDevice = /* GraphQL */ `
  query GetClientDevice($id: ID!) {
    getClientDevice(id: $id) {
      client_id
      device_id
      device_type
    }
  }
`;
export const listClientDevices = /* GraphQL */ `
  query ListClientDevices(
    $filter: ModelClientDeviceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClientDevices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        client_id
        device_id
        device_type
      }
      nextToken
    }
  }
`;
export const searchClientDevices = /* GraphQL */ `
  query SearchClientDevices(
    $filter: SearchableClientDeviceFilterInput
    $sort: SearchableClientDeviceSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchClientDevices(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        client_id
        device_id
        device_type
      }
      nextToken
      total
    }
  }
`;
