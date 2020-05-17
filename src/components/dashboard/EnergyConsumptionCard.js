import React from "react";
import ReactEcharts from "echarts-for-react";
import _ from "lodash";
import moment from "moment";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { MAIN_COLOR } from "../utils";

class EnergyConsumptionCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      xAxisData: [[], [], [], []],
      data: [[], [], [], []],
      lastData: [[], [], [], []],
      lastTimestamp: 0,
      anchorEl: null,
      type: 0,
    };
  }

  toggleMenu = (event) => {
    if (event !== false) {
      this.setState({ anchorEl: event.currentTarget });
    } else {
      this.setState({ anchorEl: null });
    }
  };

  arrAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  createReport() {
    const { sensor } = this.props;

    const results = [];
    const labels = [];
    const lasts = [];

    // daily data generate - start

    let groups = _.groupBy(sensor.data, function ({ timestamp }) {
      return moment(timestamp).startOf("hour").valueOf();
    });

    let current = moment().startOf("hour").valueOf();
    let result = [];
    let label = [];
    let last = {
      timestamp: current,
      count: (groups[current + ""] || []).length,
    };

    for (let i = 0; i < 24; i++) {
      const group = groups[current + ""];
      let res;
      if (!group) {
        res = 0;
      } else if (group.length === 1) {
        res = group[0].payload.Energy;
      } else {
        res = this.arrAvg(group.map((item) => item.payload.Energy));
      }
      result = [res, ...result];
      label = [moment(current).format("h a"), ...label];
      current -= 3600000;
    }

    results.push(result);
    labels.push(label);
    lasts.push(last);

    // daily data generate - end

    // weekly data generate - start

    groups = _.groupBy(sensor.data, function ({ timestamp }) {
      return moment(timestamp).startOf("day").valueOf();
    });

    current = moment().startOf("day").valueOf();
    result = [];
    label = [];
    last = {
      timestamp: current,
      count: (groups[current + ""] || []).length,
    };

    for (let i = 0; i < 7; i++) {
      const group = groups[current + ""];
      let res;
      if (!group) {
        res = 0;
      } else if (group.length === 1) {
        res = group[0].payload.Energy;
      } else {
        res = this.arrAvg(group.map((item) => item.payload.Energy));
      }
      result = [res, ...result];
      label = [moment(current).format("ddd"), ...label];
      current -= 86400000;
    }

    results.push(result);
    labels.push(label);
    lasts.push(last);

    // weekly data generate - end

    // monthly data generate - start

    groups = _.groupBy(sensor.data, function ({ timestamp }) {
      return moment(timestamp).startOf("month").valueOf();
    });

    current = moment().startOf("month").valueOf();
    result = [];
    label = [];
    last = {
      timestamp: current,
      count: (groups[current + ""] || []).length,
    };

    for (let i = 0; i < 12; i++) {
      const group = groups[current + ""];
      let res;
      if (!group) {
        res = 0;
      } else if (group.length === 1) {
        res = group[0].payload.Energy;
      } else {
        res = this.arrAvg(group.map((item) => item.payload.Energy));
      }
      result = [res, ...result];
      label = [moment(current).format("MMM"), ...label];
      current = moment(current).subtract(1, "months").valueOf();
    }

    results.push(result);
    labels.push(label);
    lasts.push(last);

    // monthly data generate - end

    // yearly data generate - start

    groups = _.groupBy(sensor.data, function ({ timestamp }) {
      return moment(timestamp).startOf("year").valueOf();
    });

    current = moment().startOf("year").valueOf();
    result = [];
    label = [];
    last = {
      timestamp: current,
      count: (groups[current + ""] || []).length,
    };

    for (let i = 0; i < 10; i++) {
      const group = groups[current + ""];
      let res;
      if (!group) {
        res = 0;
      } else if (group.length === 1) {
        res = group[0].payload.Energy;
      } else {
        res = this.arrAvg(group.map((item) => item.payload.Energy));
      }
      result = [res, ...result];
      label = [moment(current).format("YYYY"), ...label];
      current = moment(current).subtract(1, "years").valueOf();
    }

    results.push(result);
    labels.push(label);
    lasts.push(last);

    // yearly data generate - end

    this.setState({ data: results, xAxisData: labels, lastData: lasts });
  }

  updateReport() {
    const { sensor } = this.props;

    const results = [];
    const labels = [];
    const lasts = [];

    const newData = [];
    for (let i = sensor.data.length - 1; i >= 0; i--) {
      newData.push(sensor.data[i]);
      if (sensor.data[i - 1].timestamp <= this.state.lastTimestamp) {
        break;
      }
    }

    // daily data generate - start

    let groups = _.groupBy(newData, function ({ timestamp }) {
      return moment(timestamp).startOf("hour").valueOf();
    });

    let current = moment().startOf("hour").valueOf();
    let result = this.state.data[0];
    let label = this.state.xAxisData[0];
    let newResults = [];
    let newLabels = [];
    let last = {
      timestamp: current,
      count:
        (groups[current + ""] || []).length +
          this.state.lastData[0].timestamp ===
        current
          ? this.state.lastData[0].count
          : 0,
    };

    for (let i = 0; i < 24; i++) {
      const group = groups[current + ""] || [];
      let res;
      if (group.length === 0) {
        res = 0;
      } else if (group.length === 1) {
        res = group[0].payload.Energy;
      } else {
        res = this.arrAvg(group.map((item) => item.payload.Energy));
      }
      if (this.state.lastData[0].timestamp === current) {
        result[23] =
          (result[23] * this.state.lastData[0].count + res * group.length) /
          (this.state.lastData[0].count + group.length);
        break;
      } else {
        newResults = [res, ...newResults];
        newLabels = [moment(current).format("h a"), ...newLabels];
        current -= 3600000;
      }
    }

    results.push(result.splice(newResults.length).concat(newResults));
    labels.push(label.splice(newLabels.length).concat(newLabels));
    lasts.push(last);

    // daily data generate - end

    // weekly data generate - start

    groups = _.groupBy(newData, function ({ timestamp }) {
      return moment(timestamp).startOf("day").valueOf();
    });

    current = moment().startOf("day").valueOf();
    result = this.state.data[1];
    label = this.state.xAxisData[1];
    newResults = [];
    newLabels = [];
    last = {
      timestamp: current,
      count:
        (groups[current + ""] || []).length +
          this.state.lastData[1].timestamp ===
        current
          ? this.state.lastData[1].count
          : 0,
    };

    for (let i = 0; i < 7; i++) {
      const group = groups[current + ""] || [];
      let res;
      if (group.length === 0) {
        res = 0;
      } else if (group.length === 1) {
        res = group[0].payload.Energy;
      } else {
        res = this.arrAvg(group.map((item) => item.payload.Energy));
      }
      if (this.state.lastData[1].timestamp === current) {
        result[6] =
          (result[6] * this.state.lastData[1].count + res * group.length) /
          (this.state.lastData[1].count + group.length);
        break;
      } else {
        newResults = [res, ...newResults];
        newLabels = [moment(current).format("ddd"), ...newLabels];
        current -= 86400000;
      }
    }

    results.push(result.splice(newResults.length).concat(newResults));
    labels.push(label.splice(newLabels.length).concat(newLabels));
    lasts.push(last);

    // weekly data generate - end

    // monthly data generate - start

    groups = _.groupBy(newData, function ({ timestamp }) {
      return moment(timestamp).startOf("month").valueOf();
    });

    current = moment().startOf("month").valueOf();
    result = this.state.data[2];
    label = this.state.xAxisData[2];
    newResults = [];
    newLabels = [];
    last = {
      timestamp: current,
      count:
        (groups[current + ""] || []).length +
          this.state.lastData[2].timestamp ===
        current
          ? this.state.lastData[2].count
          : 0,
    };

    for (let i = 0; i < 12; i++) {
      const group = groups[current + ""] || [];
      let res;
      if (group.length === 0) {
        res = 0;
      } else if (group.length === 1) {
        res = group[0].payload.Energy;
      } else {
        res = this.arrAvg(group.map((item) => item.payload.Energy));
      }
      if (this.state.lastData[2].timestamp === current) {
        result[11] =
          (result[11] * this.state.lastData[2].count + res * group.length) /
          (this.state.lastData[2].count + group.length);
        break;
      } else {
        newResults = [res, ...newResults];
        newLabels = [moment(current).format("MMM"), ...newLabels];
        current = moment(current).subtract(1, "months").valueOf();
      }
    }

    results.push(result.splice(newResults.length).concat(newResults));
    labels.push(label.splice(newLabels.length).concat(newLabels));
    lasts.push(last);

    // monthly data generate - end

    // yearly data generate - start

    groups = _.groupBy(newData, function ({ timestamp }) {
      return moment(timestamp).startOf("year").valueOf();
    });

    current = moment().startOf("year").valueOf();
    result = this.state.data[3];
    label = this.state.xAxisData[3];
    newResults = [];
    newLabels = [];
    last = {
      timestamp: current,
      count:
        (groups[current + ""] || []).length +
          this.state.lastData[3].timestamp ===
        current
          ? this.state.lastData[3].count
          : 0,
    };

    for (let i = 0; i < 10; i++) {
      const group = groups[current + ""] || [];
      let res;
      if (group.length === 0) {
        res = 0;
      } else if (group.length === 1) {
        res = group[0].payload.Energy;
      } else {
        res = this.arrAvg(group.map((item) => item.payload.Energy));
      }
      if (this.state.lastData[3].timestamp === current) {
        result[9] =
          (result[9] * this.state.lastData[3].count + res * group.length) /
          (this.state.lastData[3].count + group.length);
        break;
      } else {
        newResults = [res, ...newResults];
        newLabels = [moment(current).format("YYYY"), ...newLabels];
        current = moment(current).subtract(1, "years").valueOf();
      }
    }

    results.push(result.splice(newResults.length).concat(newResults));
    labels.push(label.splice(newLabels.length).concat(newLabels));
    lasts.push(last);

    // yearly data generate - end

    this.setState({ data: results, xAxisData: labels, lastData: lasts });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sensor.device_id !== this.props.sensor.device_id) {
      this.setState({ xAxisData: [], data: [], lastTimestamp: 0 });
      this.createReport();
      this.setState({
        lastTimestamp: this.props.sensor.data[this.props.sensor.data.length - 1]
          .timestamp,
      });
    } else if (
      prevProps.sensor.data?.length !== this.props.sensor.data?.length
    ) {
      if (this.state.lastTimestamp === 0) {
        this.createReport();
        this.setState({
          lastTimestamp: this.props.sensor.data[
            this.props.sensor.data.length - 1
          ].timestamp,
        });
      } else {
        this.updateReport();
      }
    }
  }

  render() {
    const { xAxisData, data, type } = this.state;
    const options = {
      grid: {
        left: 30,
        top: 30,
        right: 15,
        bottom: 30,
      },
      tooltip: {
        show: true,
        showContent: true,
        triggerOn: "mousemove",
        trigger: "axis",
        formatter: (items) => {
          return `${Math.round(items[0].value * 1000) / 1000} kW/Hour`;
        },
      },
      xAxis: {
        data: xAxisData[type],
        silent: false,
        axisLabel: {
          interval: 0,
          rotate: 30, //If the label names are too long you can manage this by rotating the label.
        },
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
          color: MAIN_COLOR,
          name: "bar",
          type: "bar",
          data: data[type],
          animationDelay: function (idx) {
            return idx * 10;
          },
          silent: true,
        },
      ],
      animationEasing: "elasticOut",
      animationDelayUpdate: function (idx) {
        return idx * 5;
      },
    };

    return (
      <div
        className="dashboard-card"
        style={{ height: 500, position: "relative" }}
      >
        <div className="dashboard-card__header">ENERGY CONSUMPTION</div>

        <div className="dashboard-card__body text-center">
          <span className="dashboard-card__value color-main">
            {this.props.sensor.payload.Energy
              ? this.props.sensor.payload.Energy
              : "--"}
          </span>
          <br />
          <span className="secondary">kW/Hour</span>
        </div>

        <div style={{ position: "absolute", right: 20, top: 5 }}>
          <Select
            value={this.state.type}
            onChange={(e) => this.setState({ type: e.target.value })}
          >
            <MenuItem value={0}>Daily</MenuItem>
            <MenuItem value={1}>Weekly</MenuItem>
            <MenuItem value={2}>Monthly</MenuItem>
            <MenuItem value={3}>Yearly</MenuItem>
          </Select>
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

export default EnergyConsumptionCard;
