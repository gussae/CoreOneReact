import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Auth } from "aws-amplify";

class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      code: "",
      password: "",
      passwordConfirm: ""
    };
    this.confirm = this.confirm.bind(this);
  }

  confirm = async e => {
    e.preventDefault();
    const { code, password, passwordConfirm } = this.state;

    this.setState({ loading: true, error: "" });
    if (password !== passwordConfirm) {
      this.setState({ loading: false, error: "Password doesn't match" });
      return;
    }
    try {
      await Auth.forgotPasswordSubmit(this.props.email, code, password);
      this.props.onComplete();
    } catch (err) {
      this.setState({ loading: false, error: err.message });
    }

    this.setState({ loading: true });
  };

  render() {
    return (
      <form onSubmit={e => this.confirm(e)}>
        <div>
          <p className="font-light font-13 secondary mb-3">
            Please enter your new password and the
            <br />
            Verification code sent to you.
          </p>
          <div className="outline-field-wrapper mb-3">
            <TextField
              className="app-style"
              autoComplete="new-password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
              required
              type="password"
              label="New Password"
            />
          </div>
          <div className="outline-field-wrapper mb-3">
            <TextField
              className="app-style"
              autoComplete="new-password"
              value={this.state.passwordConfirm}
              onChange={e => this.setState({ passwordConfirm: e.target.value })}
              required
              type="password"
              label="Confirm New Password"
            />
          </div>
          <div className="outline-field-wrapper">
            <TextField
              className="app-style"
              autoComplete="new-password"
              value={this.state.code}
              onChange={e => this.setState({ code: e.target.value })}
              required
              type="number"
              label="Verification Code"
            />
          </div>
          <p className="alert-error">{this.state.error}</p>
          <button
            disabled={this.state.loading}
            className="with-spinner hover-opacity"
          >
            {this.state.loading && (
              <CircularProgress color="inherit" size={14} thickness={2} />
            )}
            Next
          </button>
        </div>
      </form>
    );
  }
}

export default Confirm;
