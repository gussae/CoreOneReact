import Amplify, { API, graphqlOperation } from "aws-amplify";
import { listSensors, listClientDevices } from "../graphql/queries";
import { onCreateSensor } from "../graphql/subscriptions";
import aws_exports from "../aws-exports";

Amplify.configure(aws_exports);

export const GetSensorStatusColor = status => {
  let r = "";
  if (status) {
    r = "green";
  } else {
    r = "red";
  }

  return r;
};

export const selectSensor = sensor => {
  return dispatch => {
    dispatch({ type: "UPDATE_SENSOR", currentSensor: sensor });
  };
};

export const GetSensors = () => {
  return async (dispatch, getState) => {
    try {
      let mysensors = [];

      // get devices id list
      const resCDs = await API.graphql(
        graphqlOperation(listClientDevices, {
          filter: { client_id: { eq: getState().user.userData.sub } }
        })
      );
      const cds = resCDs.data.listClientDevices.items;

      for (let device of cds) {
        const res = await API.graphql(
          graphqlOperation(listSensors, {
            filter: { device_id: { eq: device.device_id } },
            limit: 20
          })
        );
        const items = res.data.listSensors.items;
        if (items && items.length > 0) {
          let t = items[0]
          t.payload = JSON.parse(t.payload)
          mysensors.push(t);
        }
      }

      mysensors = mysensors.sort((a, b) => {
        if (a.device_id > b.device_id) return 1
        if (a.device_id < b.device_id) return -1
        return 0
      })

      dispatch({ type: "GET_SENSORS_LIST", getSensorsList: mysensors });
      console.log("sensors---", mysensors);
      return mysensors;
    } catch (error) {
      console.log(error);
    }
  };
};

export const SubscribeSensor = device_id => {
  return dispatch => {
    const subscriber = API.graphql(graphqlOperation(onCreateSensor)).subscribe({
      next: response => {
        const sensor = response.value.data.onCreateSensor;
        if (sensor.device_id === device_id) {
          sensor.payload = JSON.parse(sensor.payload);
          sensor.payload = JSON.parse(sensor.payload);
          dispatch({
            type: "UPDATE_SENSOR",
            currentSensor: sensor
          });
        }
      },
      error: error => {
        console.log("error on sensor subscription", error);
      }
    });

    return () => {
      console.log("terminating subscription to sensor", device_id);
      subscriber.unsubscribe();
    };
  };
};
