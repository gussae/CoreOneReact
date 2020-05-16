import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MaterialIcon from "material-icons-react";
import { logout } from "../api/User";
import { selectSensor, GetSensors } from "../api/Sensors";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      anchorElDevices: null,
    };
  }

  toggleMenu = (event) => {
    if (event !== false) {
      this.setState({ anchorEl: event.currentTarget });
    } else {
      this.setState({ anchorEl: null });
    }
  };

  toggleDevicesList = (event) => {
    if (event !== false) {
      this.setState({ anchorElDevices: event.currentTarget });
    } else {
      this.setState({ anchorElDevices: null });
    }
  };

  selectDevice = (device_id) => {
    this.toggleDevicesList(false);
    this.props.GetSensors().then((sensors) => {
      this.props.selectSensor(sensors.find((d) => d.device_id === device_id));
    });
  };

  render() {
    const { user, sensor } = this.props;
    const listItems = sensor.sensors.map((device, index) => (
      <MenuItem
        onClick={() => this.selectDevice(device.device_id)}
        key={`menu__${index}`}
      >
        {sensor.currentSensor.device_id === device.device_id ? (
          <span>Current:</span>
        ) : (
          ""
        )}{" "}
        {device.device_id}
      </MenuItem>
    ));

    return (
      <span className="profile">
        <span onClick={this.toggleDevicesList} className="device-list mr-4">
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipse",
              whiteSpace: "nowrap",
            }}
          >
            Device: {sensor.currentSensor.device_id}{" "}
          </span>
          <div>
            <MaterialIcon size={20} icon="arrow_drop_down" />
          </div>
        </span>

        <Menu
          anchorEl={this.state.anchorElDevices}
          keepMounted
          open={Boolean(this.state.anchorElDevices)}
          onClose={() => this.toggleDevicesList(false)}
        >
          {listItems}
        </Menu>

        <span className="name">
          {user.userData.name}
          <span onClick={this.toggleMenu} className="avatar">
            {user.userData.name
              ? user.userData.family_name[0].toUpperCase() +
                user.userData.name[0].toUpperCase()
              : "?"}
          </span>
          <div>
            <MaterialIcon size={20} icon="arrow_drop_down" />
          </div>
        </span>

        <Menu
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={() => this.toggleMenu(false)}
        >
          <MenuItem onClick={this.props.logout}>Logout</MenuItem>
        </Menu>
      </span>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logout,
      GetSensors,
      selectSensor,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
