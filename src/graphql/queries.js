/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCoreOneInventory = /* GraphQL */ `
  query GetCoreOneInventory($device_id: String!, $device_type: String!) {
    getCoreOneInventory(device_id: $device_id, device_type: $device_type) {
      device_id
      device_type
    }
  }
`;
export const listCoreOneInventories = /* GraphQL */ `
  query ListCoreOneInventories(
    $filter: TableCoreOneInventoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCoreOneInventories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        device_id
        device_type
      }
      nextToken
    }
  }
`;
export const getCoreOneDeviceData = /* GraphQL */ `
  query GetCoreOneDeviceData($device_id: String!, $timestamp: String!) {
    getCoreOneDeviceData(device_id: $device_id, timestamp: $timestamp) {
      device_id
      timestamp
      payload
    }
  }
`;
export const listCoreOneDeviceData = /* GraphQL */ `
  query ListCoreOneDeviceData(
    $filter: TableCoreOneDeviceDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCoreOneDeviceData(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        device_id
        timestamp
        payload
      }
      nextToken
    }
  }
`;
