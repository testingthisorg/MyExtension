import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { connect } from "react-redux";
import { updateObject, checkValidity } from "../../../shared/utility";
import Input from "../../../Components/UI/Input/Input";
import Button from "../../../Components/UI/Button/Button";
import { DialogActions } from "@material-ui/core";

class UserDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      controls: {
        email: {
          order: 1,
          elementType: "input",
          elementConfig: {
            type: "email",
            label: "Email Address"
            // placeholder: "Mail Address"
          },
          value: props.data ? props.data.email : "",
          validation: {
            required: true,
            isEmail: true
          },
          valid: false,
          touched: false
        },
        firstName: {
          order: 4,
          elementType: "input",
          elementConfig: {
            type: "text",
            label: "First Name"
          },
          value: props.data ? props.data.firstName : "",
          validation: {
            required: true
            // minLength: 6
          },
          valid: false,
          touched: false
        },
        lastName: {
          order: 5,
          elementType: "input",
          elementConfig: {
            type: "text",
            label: "Last Name"
          },
          value: props.data ? props.data.lastName : "",
          validation: {
            required: true
            // minLength: 6
          },
          valid: false,
          touched: false
        },
        role: {
          order: 2,
          elementType: "select",
          elementConfig: {
            label: "Role",
            labelWidth: 34,
            options: props.roles
          },
          value:
            props.data && props.data.userRoles ? props.data.userRoles[0].id : 0,
          validation: {
            required: true
          },
          valid: false,
          touched: false
        }
      }
    };
    console.log(props.data);
    if (!props.data.id) {
      this.state.controls.password = {
        order: 3,
        elementType: "input",
        elementConfig: {
          type: "password",
          label: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      };
    }

    // check initial validity
    let cntrlKeys = Object.keys(this.state.controls);
    for (let idx = 0; idx < cntrlKeys.length; idx++) {
      let key = cntrlKeys[idx];
      let cntrl = this.state.controls[key];
      this.state.controls[key].valid = checkValidity(
        cntrl.value,
        cntrl.validation
      );
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      })
    });
    let cntrlKeys = Object.keys(updatedControls);
    var formValid = true;
    let anyTouched = false;
    for (let idx = 0; idx < cntrlKeys.length; idx++) {
      let key = cntrlKeys[idx];
      if (!updatedControls[key].valid) {
        formValid = false;
      }
      if (updatedControls[key].touched) {
        anyTouched = true;
      }
    }

    let canSubmit = anyTouched && formValid;
    this.setState({ controls: updatedControls, canSubmit: canSubmit });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onSave({
      email: this.state.controls.email.value,
      firstName: this.state.controls.firstName.value,
      lastName: this.state.controls.lastName.value,
      password: this.state.controls.password ?  this.state.controls.password.value : "",
      roleId: this.state.controls.role.value
    });
  };
  Transition = props => {
    return <Slide direction="up" {...props} />;
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray
      .sort((a, b) => {
        if (a.config.order > b.config.order) {
          return 1;
        }
        if (b.config.order > a.config.order) {
          return -1;
        }
        return 0;
      })
      .map(formElement => (
        <Input
          id={formElement.id}
          key={formElement.id}
          required={formElement.config.validation.required}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => this.inputChangedHandler(event, formElement.id)}
        />
      ));
    return (
      <div>
        
          <Dialog
            maxWidth="xs"            
            fullWidth
            open={this.props.open}
            TransitionComponent={this.Transition}
            keepMounted
            onClose={this.props.onCancel}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
          <form onSubmit={this.submitHandler} autoComplete="off">
            <DialogTitle id="alert-dialog-slide-title">User Form</DialogTitle>
            <DialogContent>{form}</DialogContent>
            <DialogActions>
              <Button
                disabled={!this.state.canSubmit}
                btnType="submit"
                variant="contained"
                color="primary"
              >
                SAVE
              </Button>
            </DialogActions>
            </form>
          </Dialog>
        
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    roles: state.appValues.userRoles
  };
};

export default connect(mapStateToProps)(UserDialog);
