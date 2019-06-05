
import * as actionTypes from "./actionTypes";

export const projectLoadComplete = projectName => {
    return {
        type: actionTypes.PROJECT_LOADED,
        projectName: projectName
    };
};

export const projectUnloadComplete = () => {
    return {
        type: actionTypes.PROJECT_UNLOADED
    };
};