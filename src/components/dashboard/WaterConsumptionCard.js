import React from "react";
import ReactEcharts from "echarts-for-react";

class WaterConsumptionCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      xAxisData: [],
      data: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { xAxisData, data } = this.state;
    const { sensor } = this.props;
    if (prevProps.sensor.payload.Flow !== sensor.payload.Flow) {
      xAxisData.push(
        xAxisData.length === 0 ? 0 : xAxisData[xAxisData.length - 1] + 1
      );
      data.push(sensor.payload.Flow);
      if (xAxisData.length > 50) {
        xAxisData.shift();
        data.shift();
      }
      this.setState({ xAxisData, data });
    }
    if (prevProps.sensor.device_id !== sensor.device_id) {
      this.setState({ xAxisData: [], data: [] });
    }
  }

  render() {
    const { xAxisData, data } = this.state;
    const options = {
      grid: {
        left: 30,
        top: 30,
        right: 15,
        bottom: 30,
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        show: false,
        splitLine: { show: false },
      },
      series: [
        {
          color: "lightblue",
          name: "bar",
          type: "bar",
          data: data,
          animationDelay: function (idx) {
            return idx * 10;
          },
        },
      ],
      animationEasing: "elasticOut",
      animationDelayUpdate: function (idx) {
        return idx * 5;
      },
    };
    return (
      <div className="dashboard-card" style={{ height: 500 }}>
        <div className="dashboard-card__header">WATER CONSUMPTION</div>

        <div className="dashboard-card__body text-center">
          <span className="dashboard-card__value color-blue">
            {this.props.sensor.payload.Flow}
          </span>
          <br />
          <span className="secondary">Litre/Hour</span>
        </div>

        <ReactEcharts
          style={{ height: 350, width: "100%" }}
          option={options}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
    );
  }
}

export default WaterConsumptionCard;
