import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


const initialState = {
    projectName: ""
};

const projectLoadComplete = (state, action) => {
    return updateObject(state, { projectName: action.projectName });
}
const projectUnloadComplete = (state, action) => {
    return updateObject(state, { projectName: "" });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PROJECT_LOADED:
            return projectLoadComplete(state, action);
        case actionTypes.PROJECT_UNLOADED:
            return projectUnloadComplete(state, action);
        default:
            return state;
    }

}

export default reducer;