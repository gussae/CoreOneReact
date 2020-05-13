/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCoreOneLatestData = /* GraphQL */ `
  query GetCoreOneLatestData($device_id: String!) {
    getCoreOneLatestData(device_id: $device_id) {
      device_id
      device_type
      payload
      timestamp
    }
  }
`;
export const listCoreOne = /* GraphQL */ `
  query ListCoreOne($client_id: String!) {
    listCoreOne(client_id: $client_id) {
      client_id
      device_id
      device_type
      status_value
    }
  }
`;
export const getCoreOneAssigned = /* GraphQL */ `
  query GetCoreOneAssigned($id: ID!) {
    getCoreOneAssigned(id: $id) {
      client_id
      device_id
      device_type
      status_value
    }
  }
`;
export const listCoreOneAssigneds = /* GraphQL */ `
  query ListCoreOneAssigneds(
    $filter: ModelCoreOneAssignedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCoreOneAssigneds(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        client_id
        device_id
        device_type
        status_value
      }
      nextToken
    }
  }
`;
export const getCoreOneIncomingData = /* GraphQL */ `
  query GetCoreOneIncomingData($id: ID!) {
    getCoreOneIncomingData(id: $id) {
      device_id
      device_type
      payload
      timestamp
    }
  }
`;
export const listCoreOneIncomingDatas = /* GraphQL */ `
  query ListCoreOneIncomingDatas(
    $filter: ModelCoreOneIncomingDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCoreOneIncomingDatas(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        device_id
        device_type
        payload
        timestamp
      }
      nextToken
    }
  }
`;
export const getCoreOneOutgoingData = /* GraphQL */ `
  query GetCoreOneOutgoingData($id: ID!) {
    getCoreOneOutgoingData(id: $id) {
      device_id
      device_type
      payload
      timestamp
    }
  }
`;
export const listCoreOneOutgoingDatas = /* GraphQL */ `
  query ListCoreOneOutgoingDatas(
    $filter: ModelCoreOneOutgoingDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCoreOneOutgoingDatas(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        device_id
        device_type
        payload
        timestamp
      }
      nextToken
    }
  }
`;
