import { Avatar, Divider, Typography } from "@material-ui/core";
import { MdGroup, MdHome } from "react-icons/md";
import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Drawer from "@material-ui/core/Drawer";
import ExtensionIcon from '@material-ui/icons/Extension';
import Grow from "@material-ui/core/Grow";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { NavLink } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Toolbar from "@material-ui/core/Toolbar";
import classes from "./Layout.module.scss";
import { connect } from "react-redux";
import logo from '../../assets/ad-assassins-club-logo-3-icon.svg';
import { withRouter } from "react-router-dom";

class Layout extends Component {
  state = {
    anchorEl: null,
    popper: false,
    drawer: false
  };
  handleClickProfileMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleToggle = evt => {
    const target = evt.currentTarget.id;
    this.setState(state => ({ [target]: !state.popper }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ drawer: false, popper: false });
  };
  handleNavSecondaryActions = (evt, to) => {
    localStorage.setItem('last-visited', to);
    this.handleClose(evt);
  }

  render() {
    const { popper, drawer } = this.state;
    let activeStyle = {
      color: "#fff",
      backgroundColor: "#ccc",
      borderColor: "transparent",
      textDecoration: "none"
    };
    const HomeLink = props => (
      <NavLink
        activeStyle={activeStyle}
        exact
        to="/home"
        {...props}
      />
    );

    const UserManagementLink = props => (
      <NavLink
        activeStyle={activeStyle}
        exact
        to="/user-management"
        {...props}
      />
    );



    const AdminLink = props => (
      <NavLink
        activeStyle={activeStyle}
        exact
        to="/administration"
        {...props}
      />
    );
    const LogoutLink = props => (
      <NavLink activeStyle={activeStyle} exact to="/logout" {...props} />
    );

    let sideLinksArr = [];
    let contextMenuLinkArr = [];
    if (this.props.isAuthenticated) {

      sideLinksArr.push(
        <ListItem
          key="HomeLink"
          className={classes.linkBtn}
          variant="outlined"
          color="secondary"
          component={HomeLink}
          onClick={(evt) => this.handleNavSecondaryActions(evt, HomeLink().props.to)}
        >
          <ListItemIcon>
            <MdHome />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
      );
      sideLinksArr.push(
        <ListItem
          key="UserManagementLink"
          className={classes.linkBtn}
          variant="outlined"
          color="secondary"
          component={UserManagementLink}
          onClick={(evt) => this.handleNavSecondaryActions(evt, UserManagementLink().props.to)}
        >
          <ListItemIcon>
            <MdGroup />
          </ListItemIcon>
          <ListItemText>User Management</ListItemText>
        </ListItem>
      );

      contextMenuLinkArr.push(
        <MenuItem key="admin" component={AdminLink}
          onClick={(evt) => this.handleNavSecondaryActions(evt, AdminLink().props.to)}
        >
          <ListItemIcon>
            <ExtensionIcon />
          </ListItemIcon>
          <ListItemText>Administration</ListItemText>

        </MenuItem>
      );
      contextMenuLinkArr.push(<Divider key="hr-po-1" />);

      contextMenuLinkArr.push(
        <MenuItem key="logout" component={LogoutLink} onClick={this.handleClose}>
          Logout
        </MenuItem>
      );
    }

    let leftToolbarClasses = [classes.toolbarLeft];
    if (this.state.drawer) {
      leftToolbarClasses.push(classes.drawerOpen);
    }

    return (
      <React.Fragment>
        {/* <CssBaseline /> */}
        {this.props.isAuthenticated ? (
          <AppBar position="fixed"
          // style={{ zIndex: "1100" }}
          >

            <Toolbar className={classes.toolbar}>
              <div className={leftToolbarClasses.join(' ')}>
                <Button id="drawer" onClick={this.handleToggle}>
                    <img src={logo} alt="Ad Assassins Club" className={classes.drawerToggle}/>
                </Button>
                <Typography variant="h5" color="inherit" style={{ marginLeft: "1rem" }}>
                  {this.props.projectName}
                </Typography>
              </div>
              <Button
                id="popper"
                className={classes.avatarBtn}
                buttonRef={node => {
                  this.anchorEl = node;
                }}
                aria-owns={popper ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={this.handleToggle}
              >
                <img
                  alt="profile-icon"
                  src={this.props.avatarUrl}
                  className={classes.avatarToolbar}
                />
              </Button>
              <Popper
                style={{ zIndex: "1100" }}
                open={popper}
                anchorEl={this.anchorEl}
                transition
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom"
                    }}
                  >
                    <Paper style={{ padding: "10px" }}>
                      <ClickAwayListener onClickAway={this.handleClose}>
                        <div>
                          <div className={classes.containerMenu}>
                            <img
                              alt="profile-icon"
                              src={this.props.avatarUrl}
                              className={classes.avatarMenu}
                            />
                            <span className={classes.emailMenu}>
                              {this.props.email}
                            </span>
                          </div>
                          <Divider />
                          <MenuList>{contextMenuLinkArr}</MenuList>
                        </div>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Toolbar>
          </AppBar>
        ) : null}
        <Drawer open={drawer} onClose={this.handleClose}
        // style={{ zIndex: "11001" }}
        >
          <div className={classes.drawerHeader}>
            <Avatar
              src={this.props.avatarUrl}
              style={{ height: "85px", width: "85px" }}>

            </Avatar>
            <div className={classes.drawerFullName}>{this.props.fullName}</div>
            <div className={classes.drawerEmail}>{this.props.email}</div>
          </div>
          <Divider />
          {/* <div
            tabIndex={0}
            role="button"
            onClick={this.handleClose}
            onKeyDown={this.handleClose}
          > */}
          <nav className={classes.navContainer}>
            {this.props.isAuthenticated ? (
              <List>
                {sideLinksArr}
                {/* {sideLinksArr.map((item, id) => (
                  <ListItem key={id}>
                  {item}
                  </ListItem>
                ))} */}
              </List>
            ) : null}
          </nav>
          {/* </div> */}
        </Drawer>
        <main>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    avatarUrl: state.auth.avatarUrl,
    email: state.auth.email,
    roles: state.auth.roles,
    fullName: state.auth.fullName,
    projectName: state.project.projectName
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onAddDataSourceNode: () => dispatch(addDataSourceNodeAsync()),
//     onAddModelNode: () => dispatch(addModelNode()),
//     onNewConnector: (n1, o, n2, i) => dispatch(addConnectorAsync(n1, o, n2, i)),
//     onRemoveConnector: (connector) => dispatch(removeConnector(connector))
//   }
// }

export default withRouter(connect(mapStateToProps)(Layout));
