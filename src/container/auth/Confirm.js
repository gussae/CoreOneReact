import React from "react";
import logo from "../../assets/img/logo.png";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Auth } from "aws-amplify";

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      vcode: ""
    };
  }

  componentDidMount() {
    const email =
      this.props.location.state !== undefined
        ? this.props.location.state.email
        : "";
    this.setState({ email });
  }

  render() {
    return (
      <div className="auth-screen">
        <div className="content sign-up">
          <form onSubmit={e => this.confirm(e)}>
            <div className="middle">
              <img src={logo} width="30" alt="logo" />
              <div className="font-light color-main mb-3">
                Verify confirm code
              </div>
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
                  value={this.state.vcode}
                  onChange={e => this.setState({ vcode: e.target.value })}
                  required
                  label="Code"
                />
              </div>
              <br />
              <p className="alert-error">{this.state.error}</p>
              <button
                disabled={this.state.loading}
                className="hover-opacity with-spinner"
              >
                {this.state.loading && (
                  <CircularProgress color="inherit" size={14} thickness={2} />
                )}
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  confirm = async e => {
    e.preventDefault();

    this.setState({ loading: true, error: "" });
    const { email, vcode } = this.state;
    try {
      await Auth.confirmSignUp(email, vcode);
      this.props.history.push("/login");
    } catch (e) {
      this.setState({ loading: false, error: e.message });
    }
  };
}

export default Confirm;
