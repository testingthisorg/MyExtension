import { Checkbox, FormControlLabel, FormHelperText } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import React from "react";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import classes from "./Input.module.scss";

// import { DropzoneArea } from "material-ui-dropzone";

const input = props => {
  let inputElement = null;
  //   const inputClasses = [classes.InputElement];
  let showError = false;
  if (props.invalid && props.shouldValidate && props.touched) {
    //   inputClasses.push(classes.Invalid);
    showError = true;
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <FormControl style={{ width: "100%" }}>
          <TextField
            required={props.required}
            error={showError}
            variant="outlined"
            {...props.elementConfig}
            value={props.value ? props.value : ""}
            onChange={props.changed}
          />
          {props.elementConfig.formhelpertext ? props.elementConfig.formhelpertext.map((k, idx) => {
            return <FormHelperText key={idx}>{k}</FormHelperText>
          }) : null}
        </FormControl>
      );
      break;
    case "file-upload":
      inputElement = (
        <React.Fragment>
          <input hidden
            accept="image/*"
            className={classes.fileInput}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              component="span"
              className={classes.button}
            >
              Upload
            </Button>
          </label>
        </React.Fragment>
      );
      break;
    case "textarea":
      inputElement = (
        <FormControl style={{ width: "100%" }}>
          <TextField
            rows={5}
            rowsMax={5}
            multiline
            required={props.required}
            error={showError}
            variant="outlined"
            {...props.elementConfig}
            value={props.value ? props.value : ""}
            onChange={props.changed}
          />
        </FormControl>
      );
      break;
    case "select":
      inputElement = (
        <FormControl
          required={props.required}
          error={showError}
          variant="outlined"
          fullWidth
        >
          <InputLabel htmlFor={props.id}>
            {props.elementConfig.label}
          </InputLabel>
          <Select
            value={props.value ? props.value : ""}
            onChange={props.changed}
            {...props.elementConfig}
            input={
              <OutlinedInput
                name={props.id}
                labelWidth={props.elementConfig.labelWidth}
                id={props.id}
              />
            }
          >
            <MenuItem value="" />
            {props.elementConfig.options.map(option => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
      break;
    case "checkbox":
      inputElement = (<FormControlLabel
        control={
          <Checkbox
            required={false}
            {...props.elementConfig}
            onChange={props.changed}
            checked={props.checked}
          />
        }
        label={props.elementConfig.label}
      />);
      break;
    default:
      inputElement = (
        <TextField
          variant="outlined"
          //   className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return <div className={classes.Input}>{inputElement}</div>;
};

export default input;
