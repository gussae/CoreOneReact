import Amplify, { API, graphqlOperation } from "aws-amplify";
import { listSensors, listClientDevices } from "../graphql/queries";
import { onUpdateSensor } from "../graphql/subscriptions";
import aws_exports from "../aws-exports";

Amplify.configure(aws_exports);

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
      const resCDs = await API.graphql(graphqlOperation(listClientDevices))
      const cds = resCDs.data.listClientDevices.items
      
      // get my devices list
      const resSensors = await API.graphql(graphqlOperation(listSensors))
      let sensors = resSensors.data.listSensors.items
      let mysensors = []

      for (let sensor of sensors) {
        for (let cd of cds) {
          if (cd.client_id === getState().user.userData.sub && cd.device_id === sensor.device_id) {
            sensor.payload = JSON.parse(sensor.payload)
            mysensors.push(sensor)
            break
          }
        }
      }

      dispatch({ type: "GET_SENSORS_LIST", getSensorsList: mysensors });
      console.log("sensors---", mysensors)
      return mysensors;
    } catch (error) {
      console.log(error);
    }
  };
};

export const SubscribeSensor = (device_id) => {
  return (dispatch) => {
    const subscriber = API.graphql(
      graphqlOperation(onUpdateSensor, { device_id: device_id })
    ).subscribe({
      next: (response) => {
        const sensor = response.value.data.onUpdateSensor
        if (sensor.device_id === device_id) {
          sensor.payload = JSON.parse(sensor.payload)
          sensor.payload = JSON.parse(sensor.payload)
          dispatch({
            type: "UPDATE_SENSOR",
            currentSensor: sensor
          });
        }
      },
      error: (error) => {
        console.log("error on sensor subscription", error);
      }
    });

    return () => {
      console.log("terminating subscription to sensor", device_id);
      subscriber.unsubscribe();
    };
  };
};
