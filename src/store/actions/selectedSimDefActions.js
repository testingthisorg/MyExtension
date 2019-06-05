// import * as actionTypes from './actionTypes';

// export const addDataSourceNode = () => {
//     return {
//         type: actionTypes.ADD_CONSTANT_NODE
//     };
// }

// export const addDataSourceNodeAsync = () => {
//     return dispatch => {
//         dispatch(addDataSourceNode());
//     }

// };

// export const addModelNode = () => {
//     return {
//         type: actionTypes.ADD_MODEL_NODE
//     };
// };



// export const addConnectorSync = (n1, o, n2, i) => {
//     return {
//         type: actionTypes.ADD_CONNECTOR,
//         n1: n1, o: o, n2: n2, i: i
//     };
// };
// export const addConnectorAsync = (n1, o, n2, i) => {
//     return dispatch => {
//         setTimeout(() => {
//             dispatch(addConnectorSync(n1, o, n2, i));
//         }, 2000);
//     }
// };

// export const removeConnector = (connector) => {
//     return {
//         type: actionTypes.REMOVE_CONNECTOR,
//         connector: connector
//     };
// };

// export const removeNode = () => {
//     return {
//         type: actionTypes.REMOVE_NODE
//     };
// };