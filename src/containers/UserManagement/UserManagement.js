import "react-table/react-table.css";

import * as actions from "../../store/actions/index";

import React, { Component } from "react";

import AddIcon from "@material-ui/icons/Add";
import BlockIcon from "@material-ui/icons/Block";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import ReactTable from "react-table";
import RefreshIcon from "@material-ui/icons/Refresh";
import Tooltip from "@material-ui/core/Tooltip";
import UserDialog from "./UserDialog/UserDialog";
import axios from "axios";
import classes from "./UserManagement.module.scss";
import { connect } from "react-redux";
import { notifyMsgFromHttpRespErr } from "../../shared/utility";

// import Button from "@material-ui/core/Button";













class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBusy: false,
      users: [],
      dialogOpen: false,
      currentUser: null
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    this.props.spinStart("Getting Users...");
    axios
      .get("/users")
      .then(resp => {
        this.setState({ users: resp.data });

        this.props.spinStop();
      })
      .catch(err => {
        this.props.spinStop();
        this.props.notify(notifyMsgFromHttpRespErr(err), "error");
      });
  }

  saveUser = user => {
    let url = "/users";
    let payload = {
      ...user,
      id: this.state.currentUser.id
    };
    if (!this.state.currentUser.id) {
      this.props.spinStart("Adding User...");
      axios
        .post(url, payload)
        .then(response => {
          this.props.spinStop();
          this.props.notify("User saved successfully", "success");
          this.setState({ dialogOpen: false });
        })
        .catch(err => {
          this.props.spinStop();
          this.props.notify(notifyMsgFromHttpRespErr(err), "error");
        });
    } else {
      this.props.spinStart("Updating User...");
      axios
        .patch(url, payload)
        .then(response => {
          this.props.spinStop();
          this.props.notify("User saved successfully", "success");
          this.setState({ dialogOpen: false });
        })
        .catch(err => {
          this.props.spinStop();
          this.props.notify(notifyMsgFromHttpRespErr(err), "error");
        });
    }
  };
  closeDialog = () => {
    this.setState({ dialogOpen: false });
  };
  openUserModal = (evt, id) => {
    let user = {};
    if (!!id) {
      user = this.state.users.filter(k => k.id === id)[0];
    }
    this.setState({ dialogOpen: true, currentUser: user });
  };

  openSuspendModal = (evt, id) => {
    console.log("[openSuspendModal]", id);
  };
  openDeleteModal = (evt, id) => {
    console.log("[openDeleteModal]", id);
  };
  render() {
    const columns = [
      {
        accessor: "avatarUrl",
        Cell: props => (
          <img
            alt="profile-icon"
            className={classes.avatar}
            src={props.value}
          />
        ),
        width: 54,
        sortable: false,
        resizable: false
      },
      {
        Header: "Last",
        accessor: "lastName", // String-based value accessors!,
        filterable: true
      },
      {
        Header: "First",
        accessor: "firstName",
        filterable: true
        // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      },
      {
        // id: 'friendName', // Required because our accessor is not a string
        Header: "Email",
        accessor: "email",
        filterable: true
      },
      {
        id: "roles",
        Header: "Roles",
        accessor: "userRoles",
        filterable: true,
        Cell: props => {
          return props.value.map(k => k.name).join(", ");
        }
      },
      {
        Header: "Suspended",
        accessor: "isSuspended"
      },
      {
        accessor: "id",
        sortable: false,
        resizable: false,
        width: 175,
        Cell: props => {
          return (
            <div className={classes.btnRow}>
              <Tooltip title="Edit">
                <IconButton
                  className={classes.btnEdit}
                  onClick={evt => this.openUserModal(evt, props.value)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Suspend">
                <IconButton
                  className={classes.btnSuspend}
                  onClick={evt => this.openSuspendModal(evt, props.value)}
                >
                  <BlockIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  className={classes.btnDelete}
                  onClick={evt => this.openDeleteModal(evt, props.value)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          );
        }
      }
    ];
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <h1>User Management</h1>
          <div className={classes.headerBtnContainer}>
            <Tooltip title="Refresh List">
              <Fab
                onClick={() => this.refreshData()}
                size="small"
                color="primary"
                aria-label="Refresh"
              >
                <RefreshIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="New User">
              <Fab
                onClick={this.openUserModal}
                size="small"
                color="secondary"
                aria-label="Add"
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </div>
        </div>
        <div>
          <ReactTable
            data={this.state.users}
            columns={columns}
            defaultPageSize={20}
            className="-striped -highlight"
          // style={{
          //   height: "67vh" // This will force the table body to overflow and scroll, since there is not enough room
          // }}
          />
        </div>
        {this.state.dialogOpen ? (
          <UserDialog
            open={this.state.dialogOpen}
            data={this.state.currentUser}
            onSave={this.saveUser}
            onCancel={this.closeDialog}
          />
        ) : null}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // spinStart: msg => dispatch(actions.spinnerStart(msg)),
    // spinStop: () => dispatch(actions.spinnerStop()),
    notify: (msg, variant) => dispatch(actions.notificationAdd(msg, variant))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(UserManagement);
