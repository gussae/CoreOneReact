import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TemperatureCard from "../components/dashboard/TemperatureCard";
import Scheduler from "../components/dashboard/Scheduler";
import WaterPressureCard from "../components/dashboard/WaterPressureCard";
import SunlightCard from "../components/dashboard/SunlightCard";
import SurfaceAngleCard from "../components/dashboard/SurfaceAngleCard";
import EnergyConsumptionCard from "../components/dashboard/EnergyConsumptionCard";
import WaterConsumptionCard from "../components/dashboard/WaterConsumptionCard";
import LocationCard from "../components/dashboard/LocationCard";
import { GetSensors, SubscribeSensor, selectSensor } from "../api/Sensors";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subscriber: () => {},
    };
  }

  async componentDidMount() {
    const { GetSensors } = this.props;
    const sensors = await GetSensors();
    if (sensors && sensors.length > 0) {
      this.props.selectSensor(sensors[0]);
    }
  }

  finishSubscriber() {
    this.state.subscriber();
  }

  startSubscriber() {
    const { sensor, SubscribeSensor } = this.props;
    const subscriber = SubscribeSensor(sensor.currentSensor.device_id);
    this.setState({ subscriber });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.sensor.currentSensor.device_id !==
      this.props.sensor.currentSensor.device_id
    ) {
      this.finishSubscriber();
      this.startSubscriber();
    }
  }

  componentWillUnmount() {
    // finish subscribe
    this.finishSubscriber();
  }

  render() {
    const { currentSensor } = this.props.sensor;
    return (
      <div className="h-100">
        <div className="dashboard-wrapper">
          <div className="dashboard-content">
            <div className="row header-center-text">
              <h4>
                {currentSensor.device_id || "--"} :{" "}
                {currentSensor.device_type || "--"}
              </h4>
            </div>
            <div className="row">
              <div className="col-4">
                <TemperatureCard sensor={currentSensor} />
              </div>
              <div className="col-8">
                <Scheduler sensor={currentSensor} />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <WaterPressureCard sensor={currentSensor} />
              </div>
              <div className="col-4">
                <SunlightCard sensor={currentSensor} />
              </div>
              <div className="col-4">
                <SurfaceAngleCard sensor={currentSensor} />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <EnergyConsumptionCard sensor={currentSensor} />
              </div>
              <div className="col-6">
                <WaterConsumptionCard sensor={currentSensor} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <LocationCard sensor={currentSensor} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      GetSensors,
      SubscribeSensor,
      selectSensor,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
