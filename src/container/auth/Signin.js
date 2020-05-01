import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import logo from "../../assets/img/logo_full.png";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { userLoginRequest } from "../../api/User";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  render() {
    const { isAuthenticated, isFetchingUser, FetchingUserError } = this.props;
    if (isAuthenticated) {
      return (
        <Redirect
          to={
            this.props.location.state
              ? this.props.location.state.from || "/"
              : "/"
          }
        />
      );
    }

    return (
      <div className="auth-screen">
        <div className="shadow"></div>
        <div className="content sign-in">
          <form onSubmit={e => this.signIn(e)}>
            <div className="header secondary font-light">
              <img width="200" src={logo} alt="" />
              <br />
              <span>Control & Monitor your CoreOne</span>
              <br />
              <span>from anywhere, anytime</span>
            </div>
            <div className="middle">
              <div className="fields-block">
                <TextField
                  className="app-style"
                  autoComplete="new-password"
                  maxLength="200"
                  value={this.state.email}
                  onChange={e =>
                    this.setState({ email: e.target.value.toLowerCase() })
                  }
                  required
                  type="email"
                  label="Email"
                />
                <hr />
                <TextField
                  className="app-style"
                  autoComplete="new-password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                  required
                  type="password"
                  label="Password"
                />
              </div>
              {FetchingUserError && (
                <p className="alert-error">{FetchingUserError.message}</p>
              )}
              <button
                disabled={isFetchingUser}
                className="hover-opacity with-spinner"
              >
                {isFetchingUser && (
                  <CircularProgress color="inherit" size={14} thickness={2} />
                )}
                Sign In
              </button>
            </div>
            <div className="bottom font-12 secondary">
              <span
                onClick={() => this.props.history.push("/forgot-password")}
                className="hover-opacity"
              >
                Forgotten Password?
              </span>
              <hr />
              <span
                onClick={() => this.props.history.push("/signup")}
                className="hover-opacity"
              >
                Create an account
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  signIn = async e => {
    e.preventDefault();
    await this.props.userLoginRequest(this.state.email, this.state.password);
    this.props.history.push("/");
  };
}

const mapStateToProps = state => {
  return state.user;
};

const mapDispatchToProps = {
  userLoginRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
