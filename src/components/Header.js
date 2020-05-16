import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div
        className="main-header"
        style={
          this.props.shadow === false
            ? {
                boxShadow: "none",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }
            : {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }
        }
      >
        <div>{this.props.left}</div>
        <div
          className="text-center"
          style={{ flexGrow: 1, position: "relative" }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              width: "100vw",
              textAlign: "center",
              zIndex: 1,
            }}
          >
            {this.props.middle}
          </div>
        </div>
        <div
          className="text-right"
          style={{
            zIndex: 2,
          }}
        >
          {this.props.right}
        </div>
      </div>
    );
  }
}

export default Header;
