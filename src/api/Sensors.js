import { API, graphqlOperation } from "aws-amplify";
import {
  listCoreOneIncomingDatas,
  listCoreOneAssigneds,
} from "../graphql/queries";
import { createCoreOneOutgoingData } from "../graphql/mutations";
import { onUpdateCoreOneIncomingDataValue } from "../graphql/subscriptions";

export const GetSensorStatusColor = (status) => {
  let r = "";
  if (status) {
    r = "green";
  } else {
    r = "red";
  }

  return r;
};

export const createCoreOneOutgoing = async (value) => {
  try {
    const res = await API.graphql(
      graphqlOperation(createCoreOneOutgoingData, value)
    );
    //!
    console.log(111, "created outgoing data: ", res);
  } catch (error) {
    //!
    console.log(112, error);
  }
};

export const selectSensor = (sensor) => {
  //!
  console.log(222, "select sensor: ", sensor);
  return (dispatch) => {
    dispatch({ type: "SELECT_SENSOR", currentSensor: sensor });
  };
};

export const GetSensors = () => {
  //!
  console.log(100, "start", listCoreOneAssigneds);
  return async (dispatch, getState) => {
    try {
      // get devices id list
      //!
      console.log(
        101,
        "graphql operation",
        graphqlOperation(listCoreOneAssigneds)
      );
      const resCDs = await API.graphql(graphqlOperation(listCoreOneAssigneds));

      //!
      console.log(102, "resCDs", resCDs);
      const cds = resCDs.data.listCoreOneAssigneds.items;

      // get my devices list
      const resSensors = await API.graphql(
        graphqlOperation(listCoreOneIncomingDatas)
      );
      let sensors = resSensors.data.listCoreOneIncomingDatas.items;
      //!
      console.log(330, "incoming data", listCoreOneIncomingDatas);

      let mysensors = [];

      for (let cd of cds) {
        if (cd.client_id === getState().user.userData.sub) {
          let data = [];
          for (let sensor of sensors) {
            if (cd.device_id === sensor.device_id) {
              data.push({
                timestamp: sensor.timestamp,
                payload: JSON.parse(sensor.payload),
              });
            }
          }
          mysensors.push({
            device_id: cd.device_id,
            device_type: cd.device_type,
            data: data,
          });
        }
      }

      dispatch({ type: "GET_SENSORS_LIST", getSensorsList: mysensors });
      //!
      console.log(333, "created outgoing data: ", mysensors);
      return mysensors;
    } catch (error) {
      //!
      console.log(334, error);
    }
  };
};

export const SubscribeSensor = (device_id) => {
  return (dispatch) => {
    const subscriber = API.graphql(
      graphqlOperation(onUpdateCoreOneIncomingDataValue, {
        device_id: device_id,
      })
    ).subscribe({
      next: (response) => {
        const sensor = response.value.data.onUpdateCoreOneIncomingDataValue;
        if (sensor && sensor.device_id === device_id) {
          sensor.payload = JSON.parse(sensor.payload);
          sensor.payload = JSON.parse(sensor.payload);
          dispatch({
            type: "UPDATE_SENSOR",
            currentSensor: sensor,
          });
        }
      },
      error: (error) => {
        //!
        console.log(445, "error on sensor subscription", error);
      },
    });
    //!
    console.log(444, "device ID: ", device_id);
    return () => {
      //!
      console.log("terminating subscription to sensor", device_id);
      subscriber.unsubscribe();
    };
  };
};
