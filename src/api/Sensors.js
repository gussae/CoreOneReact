import { API, graphqlOperation } from "aws-amplify";
import {
  listCoreOneDeviceData,
  listCoreOneInventories,
} from "../graphql/queries";
import { onUpdateCoreOneInventory } from "../graphql/subscriptions";

const parseToJson = (val) => {
  const values = val.substring(1, val.length - 1);
  const obj = {};
  values.split(", ").forEach((item) => {
    obj[item.split("=")[0]] = item.split("=")[1];
  });
  return obj;
};

export const GetSensorStatusColor = (status) => {
  let r = "";
  if (status) {
    r = "green";
  } else {
    r = "red";
  }

  return r;
};

export const selectSensor = (sensor) => {
  return (dispatch) => {
    dispatch({ type: "UPDATE_SENSOR", currentSensor: sensor });
  };
};

export const GetSensors = () => {
  return async (dispatch, getState) => {
    try {
      // get devices id list
      const resCDs = await API.graphql(
        graphqlOperation(listCoreOneInventories)
      );
      const cds = resCDs.data.listCoreOneInventories.items;

      // get my devices list
      const resSensors = await API.graphql(
        graphqlOperation(listCoreOneDeviceData)
      );
      let sensors = resSensors.data.listCoreOneDeviceData.items;

      let mysensors = [];

      for (let cd of cds) {
        for (let sensor of sensors) {
          if (cd.device_id === sensor.device_id) {
            sensor.payload = parseToJson(sensor.payload);
            mysensors.push(sensor);
            break;
          }
        }
      }

      dispatch({ type: "GET_SENSORS_LIST", getSensorsList: mysensors });
      console.log("sensors---", mysensors);
      return mysensors;
    } catch (error) {
      console.log(error);
    }
  };
};

export const SubscribeSensor = (device_id) => {
  return (dispatch) => {
    const subscriber = API.graphql(
      graphqlOperation(onUpdateCoreOneInventory, { device_id: device_id })
    ).subscribe({
      next: (response) => {
        const sensor = response.value.data.onUpdateSensor;
        if (sensor.device_id === device_id) {
          sensor.payload = JSON.parse(sensor.payload);
          dispatch({
            type: "UPDATE_SENSOR",
            currentSensor: sensor,
          });
        }
      },
      error: (error) => {
        console.log("error on sensor subscription", error);
      },
    });

    return () => {
      console.log("terminating subscription to sensor", device_id);
      subscriber.unsubscribe();
    };
  };
};
