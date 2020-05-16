const initialUserData = {
  sensors: [],
  currentSensor: { payload: {} },
};

const sensor = (state = initialUserData, action) => {
  switch (action.type) {
    case "GET_SENSORS_LIST":
      return {
        ...state,
        sensors: action.getSensorsList,
      };
    case "SELECT_SENSOR":
      const lastIndex = action.currentSensor.data.length - 1;
      return {
        ...state,
        currentSensor: {
          device_id: action.currentSensor.device_id,
          device_type: action.currentSensor.device_type,
          payload: {
            UV: action.currentSensor.data[lastIndex].payload.UV,
            CurrentTemp:
              action.currentSensor.data[lastIndex].payload.CurrentTemp,
            Energy: action.currentSensor.data[lastIndex].payload.Energy,
            Angle: action.currentSensor.data[lastIndex].payload.Angle,
            State: action.currentSensor.data[lastIndex].payload.State,
            Latitude: action.currentSensor.data[lastIndex].payload.Latitude,
            Longitude: action.currentSensor.data[lastIndex].payload.Longitude,
            Pressure: action.currentSensor.data[lastIndex].payload.Pressure,
            Flow: action.currentSensor.data[lastIndex].payload.Flow,
          },
          data: action.currentSensor.data,
        },
      };
    case "UPDATE_SENSOR":
      return {
        ...state,
        currentSensor: {
          device_id: action.currentSensor.device_id,
          device_type: action.currentSensor.device_type,
          payload: {
            UV: action.currentSensor.payload.UV,
            CurrentTemp: action.currentSensor.payload.CurrentTemp,
            Energy: action.currentSensor.payload.Energy,
            Angle: action.currentSensor.payload.Angle,
            State: action.currentSensor.payload.State,
            Latitude: action.currentSensor.payload.Latitude,
            Longitude: action.currentSensor.payload.Longitude,
            Pressure: action.currentSensor.payload.Pressure,
            Flow: action.currentSensor.payload.Flow,
          },
          data: [
            ...state.currentSensor.data,
            {
              timestamp: action.currentSensor.timestamp,
              payload: action.currentSensor.payload,
            },
          ],
        },
      };
    default:
      return state;
  }
};

export default sensor;
