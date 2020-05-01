import React from "react";
import Icon from "@material-ui/core/Icon";
import Initial from "./Initial";
import Confirm from "./Confirm";
import Success from "./Success";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stepIndex: 0, email: "" };
  }

  render() {
    return (
      <div className="auth-screen">
        <div className="back-header">
          <Icon
            onClick={() => this.props.history.push("/login")}
            className="hover-opacity"
          >
            arrow_back
          </Icon>
        </div>
        <div className="content forgot">
          <div className="middle">
            {this.state.stepIndex === 0 && (
              <Initial
                onComplete={email => this.setState({ stepIndex: 1, email })}
              />
            )}
            {this.state.stepIndex === 1 && (
              <Confirm
                email={this.state.email}
                onComplete={() => this.setState({ stepIndex: 2 })}
              />
            )}
            {this.state.stepIndex === 2 && (
              <Success onComplete={() => this.props.history.push("/login")} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
