import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
// const initialState = {
//   selectedSimDef: {
//     nodes: [
//       {
//         nid: 1,
//         type: "Constant",
//         name: "My Value 1",
//         nodeValue: 100,
//         x: 300,
//         y: 300,
//         fields: {
//           in: [],
//           out: [{ name: "output" }]
//         }
//       },
//       {
//         nid: 3,
//         type: "Constant",
//         name: "My Value 2",
//         nodeValue: 22,
//         x: 266,
//         y: 542,
//         fields: {
//           in: [],
//           out: [{ name: "output" }]
//         }
//       },
//       {
//         nid: 2,
//         type: "Function",
//         name: "f(x,y)",
//         body: (x, y) => {
//           return x + y;
//         },
//         x: 662,
//         y: 531,
//         fields: {
//           in: [{ name: "X" }, { name: "Y" }],
//           out: [{ name: "output" }]
//         }
//       },
//       {
//         nid: 14,
//         type: "Result",
//         name: "Result",
//         x: 900,
//         y: 400,
//         fields: {
//           in: [{ name: "input" }],
//           out: []
//         }
//       }
//     ],
//     connections: [
//       { from_node: 1, from: "output", to_node: 2, to: "X" },
//       { from_node: 3, from: "output", to_node: 2, to: "Y" },
//       { from_node: 2, from: "output", to_node: 14, to: "input" }
//     ]
//   }
// };

const reducer = (state = {}, action) => {
  let nodes = [];
  // let connections = [];
  // var newNode = {};
  // switch (action.type) {
  //   // case actionTypes.ADD_CONSTANT_NODE:
  //   //   nodes = state.selectedSimDef.nodes;
  //   //   connections = state.selectedSimDef.connections;
  //   //   newNode = {
  //   //     nid: GenerateId(),
  //   //     type: "Constant",
  //   //     x: 400,
  //   //     y: 400,
  //   //     fields: {
  //   //       in: [],
  //   //       out: [{ name: "output" }]
  //   //     }
  //   //   };
  //   //   return {
  //   //     ...state,
  //   //     selectedSimDef: {
  //   //       nodes: [...nodes, newNode],
  //   //       connections: [...connections]
  //   //     }
  //   //   };
  //   // case actionTypes.ADD_MODEL_NODE:
  //   //   nodes = state.selectedSimDef.nodes;
  //   //   connections = state.selectedSimDef.connections;
  //   //   newNode = {
  //   //     nid: GenerateId(),
  //   //     type: "Function",
  //   //     body: (x, y) => {
  //   //       return x + y;
  //   //     },
  //   //     x: 300,
  //   //     y: 300,
  //   //     fields: {
  //   //       in: [{ name: "var 1" }, { name: "var 2" }],
  //   //       out: [{ name: "output" }]
  //   //     }
  //   //   };
  //   //   return {
  //   //     ...state,
  //   //     selectedSimDef: {
  //   //       nodes: nodes.concat(newNode),
  //   //       connections: [...connections]
  //   //     }
  //   //   };
  //   // case actionTypes.ADD_CONNECTOR:
  //     // nodes = state.selectedSimDef.nodes;
  //     // connections = state.selectedSimDef.connections;
  //     // var newConn = {
  //     //   from_node: action.n1,
  //     //   from: action.o,
  //     //   to_node: action.n2,
  //     //   to: action.i
  //     // };
  //     // return {
  //     //   ...state,
  //     //   selectedSimDef: {
  //     //     nodes: [...nodes],
  //     //     connections: connections.concat(newConn)
  //     //   }
  //     // };
  //   // case actionTypes.REMOVE_CONNECTOR:
  //     // nodes = state.selectedSimDef.nodes;
  //     // connections = state.selectedSimDef.connections.filter(connection => {
  //     //   return connection !== action.connector;
  //     // });
  //     // return updateObject(state, {
  //     //   selectedSimDef: {
  //     //     nodes: [...nodes],
  //     //     connections: [...connections]
  //     //   }
  //     // });

  //   // case actionTypes.REMOVE_NODE:
  //   //   const id = 2;
  //   default:
  //     return state;
  // }
  return state;
};

export default reducer;
