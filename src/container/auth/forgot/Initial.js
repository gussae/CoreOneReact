import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import img from "../../../assets/img/forgot_question.png";
import { Auth } from 'aws-amplify';

class Initial extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, email: "", error: "" };
    this.resetPassword = this.resetPassword.bind(this);
  }

  resetPassword = async e => {
    const { email } = this.state
    e.preventDefault();
    this.setState({ loading: true, error: "" })
    try {
      await Auth.forgotPassword(email)
      this.props.onComplete(email)
    } catch (err) {
      this.setState({ loading: false, error: err.message})
    }
  }

  render() {
    return (
      <form onSubmit={e => this.resetPassword(e)}>
        <div>
          <img src={img} className="ml-2" alt="" />
          <div className="mt-3 color-main">Forgotten Password</div>
          <p className="font-light font-13 secondary mb-4">
            Please enter your email address
            <br />
            below to reset your password.
          </p>
          <div className="outline-field-wrapper">
            <TextField
              className="app-style"
              autoComplete="new-password"
              value={this.state.email}
              onChange={e =>
                this.setState({ email: e.target.value.toLowerCase() })
              }
              required
              type="email"
              label="Email"
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
            Reset
          </button>
        </div>
      </form>
    );
  }
}

export default Initial;
