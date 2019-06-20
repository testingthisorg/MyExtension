export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    if (!Array.isArray(value)) {
      isValid = ("" + value).trim() !== "" && isValid;
    } else {
      isValid = value.length > 0 && isValid;
    }
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail && !Array.isArray(value)) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric && !Array.isArray(value)) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.isGuid && !Array.isArray(value)) {
    const pattern = /(\{){0,1}[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(\}){0,1}/;
    isValid = pattern.test(value) && isValid;
  }
  return isValid;
};

export const notifyMsgFromHttpRespErr = err => {
  let errMsg = "";
  errMsg = err.message ? err.message + ": " : "";

  if (!!err.response) {
    switch (err.response.status) {
      case 404:
      case 500:
        errMsg += err.response.statusText + ": ";
        break;
      case 403:
        errMsg = "User is not authorized to perfom this action.";
        break;
      default:
        errMsg += err.response.statusText + ": ";
        break;
    }
    errMsg += err.response.data.type === 1 ? err.response.data.text : "";
    errMsg += err.response.data.username ? err.response.data.username : "";
    errMsg += err.response.data.password ? err.response.data.password : "";
  }
  console.log(err);
  console.log(errMsg);
  return errMsg;
};

export const GenerateId = () => {
  return Math.floor(Math.random() * 1000000000000) + 1;
}

export const RandomSleep = (minSecs, maxSecs) => {
  var delay = Math.floor(Math.random() * maxSecs) + minSecs;
  return new Promise(resolve => setTimeout(resolve, delay * 1000));
}