// tslint:disable
// this is an auto generated file. This will be overwritten

export const getSensorValue = /* GraphQL */ `
  query GetSensorValue($id: ID!) {
    getSensorValue(id: $id) {
      id
      sensorId
      valueType
      value
      status
      timestamp
    }
  }
`;
export const listSensorValues = /* GraphQL */ `
  query ListSensorValues(
    $filter: ModelSensorValueFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSensorValues(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sensorId
        valueType
        value
        status
        timestamp
      }
      nextToken
    }
  }
`;
