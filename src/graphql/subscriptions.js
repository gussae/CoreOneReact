/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCoreOneInventory = /* GraphQL */ `
  subscription OnCreateCoreOneInventory(
    $device_id: String
    $device_type: String
  ) {
    onCreateCoreOneInventory(device_id: $device_id, device_type: $device_type) {
      device_id
      device_type
    }
  }
`;
export const onUpdateCoreOneInventory = /* GraphQL */ `
  subscription OnUpdateCoreOneInventory(
    $device_id: String
    $device_type: String
  ) {
    onUpdateCoreOneInventory(device_id: $device_id, device_type: $device_type) {
      device_id
      device_type
    }
  }
`;
export const onDeleteCoreOneInventory = /* GraphQL */ `
  subscription OnDeleteCoreOneInventory(
    $device_id: String
    $device_type: String
  ) {
    onDeleteCoreOneInventory(device_id: $device_id, device_type: $device_type) {
      device_id
      device_type
    }
  }
`;
export const onCreateCoreOneDeviceData = /* GraphQL */ `
  subscription OnCreateCoreOneDeviceData(
    $device_id: String
    $timestamp: String
  ) {
    onCreateCoreOneDeviceData(device_id: $device_id, timestamp: $timestamp) {
      device_id
      timestamp
      payload
    }
  }
`;
export const onUpdateCoreOneDeviceData = /* GraphQL */ `
  subscription OnUpdateCoreOneDeviceData(
    $device_id: String
    $timestamp: String
  ) {
    onUpdateCoreOneDeviceData(device_id: $device_id, timestamp: $timestamp) {
      device_id
      timestamp
      payload
    }
  }
`;
export const onDeleteCoreOneDeviceData = /* GraphQL */ `
  subscription OnDeleteCoreOneDeviceData(
    $device_id: String
    $timestamp: String
  ) {
    onDeleteCoreOneDeviceData(device_id: $device_id, timestamp: $timestamp) {
      device_id
      timestamp
      payload
    }
  }
`;
