import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const marks = {
  65: <strong className="slider-mark mark-top">65&nbsp;°</strong>,
  5: <strong className="slider-mark mark-bottom">5&nbsp;°</strong>
};

class TemperatureCard extends React.Component {
  changeTimer;
  changeTimer2;

  constructor(props) {
    super(props);

    this.state = {
      displayedTemp: 5,
      originalTemp: 5,
      color: "",
      blinking: false
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.sensor.payload.temperature !==
      this.props.sensor.payload.temperature
    ) {
      const temp = this.props.sensor.payload.temperature;
      clearTimeout(this.changeTimer2);

      this.setState({
        displayedTemp: temp,
        originalTemp: temp,
        color: this.getValueColor(temp),
        blinking: false
      });
    }
  }

  onSetTemperatureChange = value => {
    const { originalTemp } = this.state;
    this.setState({
      displayedTemp: value,
      color: this.getValueColor(value)
    });

    // start blinking only after value changing STOP + 300 ms delay
    clearTimeout(this.changeTimer);
    this.changeTimer = setTimeout(() => {
      this.setState({ blinking: true });
    }, 300);

    // start timer to reset value only after value changing STOP + 3 seconds delay
    clearTimeout(this.changeTimer2);
    this.changeTimer2 = setTimeout(() => {
      this.setState({
        blinking: false,
        displayedTemp: originalTemp,
        color: this.getValueColor(originalTemp)
      });
    }, 3000);
  };

  getValueColor = value => {
    let color = "#eb5e54";
    if (value >= 5 && value <= 20) {
      color = "#4f82e9";
    } else if (value > 20 && value <= 35) {
      color = "#f8d700";
    } else if (value > 35 && value <= 50) {
      color = "eb5e54";
    } else {
      color = "#eb5e54";
    }

    return color;
  };

  render() {
    return (
      <div className="dashboard-card temperature-card" style={{ height: 500 }}>
        <div className="dashboard-card__header">TEMPERATURE</div>

        <div className="dashboard-card__body">
          <span
            className={`dashboard-card__value set-value ${this.state.blinking &&
              "text-blink"}`}
            style={{ color: this.state.color, marginRight: -35 }}
          >
            {this.state.displayedTemp}
            {"°"}
          </span>
          <br />
          <span className="current-temperature">Celcius</span>
        </div>

        <div className="slider-wrapper">
          <Slider
            min={5}
            max={65}
            step={1}
            vertical
            onChange={this.onSetTemperatureChange}
            marks={marks}
            dotStyle={{ display: "none" }}
            handleStyle={{
              marginLeft: -5,
              border: "1px solid #eee",
              boxShadow: "none",
              width: 15,
              height: 15
            }}
          />
        </div>
      </div>
    );
  }
}

export default TemperatureCard;
