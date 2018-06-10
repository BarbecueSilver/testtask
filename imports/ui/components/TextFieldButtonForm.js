import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

class TextFieldButtonForm extends Component {
  state = {
    isActionDisabled: false,
    textFieldValue: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.handleAction();
    }
  };

  handleAction = () => {
    // Arrange
    const { action } = this.props;

    // Act
    // TODO: disable inputs while action is processing
    // this.setState({ isActionDisabled: true });
    action(this.state.textFieldValue);
    // this.setState({ isActionDisabled: false });
    this.setState({ textFieldValue: "" });
  };

  render() {
    const { inputLabel, buttonLabel } = this.props;

    return (
      <div>
        <TextField
          id="chatNameToJoin"
          label={inputLabel}
          value={this.state.textFieldValue}
          onChange={this.handleChange("textFieldValue")}
          onKeyPress={this.handleKeyPress}
          disabled={this.state.isActionDisabled}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={this.handleAction}
          disabled={this.state.isActionDisabled}
        >
          {buttonLabel}
        </Button>
      </div>
    );
  }
}

TextFieldButtonForm.propTypes = {
  inputLabel: PropTypes.string,
  buttonLabel: PropTypes.string,
  action: PropTypes.func
};

export default TextFieldButtonForm;
