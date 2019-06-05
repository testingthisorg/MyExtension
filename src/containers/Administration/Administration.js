import * as actions from "../../store/actions/index";

import { AppBar, Button, Fab, FormControlLabel, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Radio, Tab, Tabs, Tooltip } from "@material-ui/core";
import { MdBackup, MdFileDownload, MdRefresh, MdSettings } from "react-icons/md";
import React, { Component } from "react";

import { FaFileAlt } from "react-icons/fa";
import classes from './Administration.module.scss';
import { connect } from "react-redux";

// import Axios from "axios";



// import { notifyMsgFromHttpRespErr } from "../../shared/utility";


class Administration extends Component {
    constructor(props) {
        super(props);
        this.state = { interfaces: [], tab: 0 }
    }


    render() {
        return (
            <div className={classes.container}>
                <div className={classes.header}>
                    <h1>Administration</h1>
                    <div className={classes.warning}>
                        <strong>Warning:</strong> Do not alter this page unless you absolutely know what you are doing.
                    </div>
                    <div className={classes.headerBtnContainer}>
                        <Tooltip title="Refresh List">
                            <div>
                                <Fab
                                    disabled
                                    onClick={() => this.refreshData()}
                                    size="small"
                                    color="primary"
                                    aria-label="Refresh"
                                >
                                    <MdRefresh size="1.5rem" />
                                </Fab>
                            </div>
                        </Tooltip>

                    </div>

                </div>
                <AppBar position="static" color="primary">
                    <Tabs value={this.state.tab}
                        onChange={this.handleTabChange}
                        // variant="fullWidth"
                        indicatorColor="secondary"
                        textColor="secondary">
                        <Tab label="Interface Files" icon={<FaFileAlt size="1.5rem" />} />
                        <Tab label="Settings" icon={<MdSettings size="1.5rem" />} />
                    </Tabs>
                </AppBar>
                {this.state.tab === 0 &&
                    <React.Fragment>
                        <div className={classes.listsContainer}>
                            {this.state.interfaces.map((k) => (
                                <div key={"list-" + k.id} className={classes.listContainer}>
                                    <div className={classes.listHeader}>
                                        <h5>{k.name}</h5>
                                        {k.isUploadable ?
                                            <Tooltip title={"Upload " + k.name}>
                                                <div>
                                                    <input
                                                        hidden
                                                        accept=".dll"
                                                        className={classes.fileInput}
                                                        id="contained-button-file"
                                                        name={k.id}
                                                        onChange={(evt) => this.onFileSelected(evt)}
                                                        type="file"
                                                        ref={ref => this["fileInput" + k.id] = ref}
                                                    />
                                                    <label
                                                        className={classes.fileUploadLabel}
                                                        htmlFor="contained-button-file"
                                                    >
                                                        <Fab
                                                            onClick={() => this.setState({ fileCategoryId: k.id })}
                                                            size="small"
                                                            component="span"
                                                            color="secondary">
                                                            <MdBackup size="1.5rem" />
                                                        </Fab>
                                                    </label>
                                                </div>
                                            </Tooltip>
                                            : null}
                                    </div>

                                    <List>
                                        {k.items.map(m => (
                                            <ListItem
                                                key={"file-" + k.id + "-" + m.id}
                                                button={k.isSelectable}
                                                onClick={() => this.setFile(k.id, m.id)}
                                            //onClick={() => this.downloadFile(m.id)}
                                            >
                                                <FormControlLabel
                                                    control={k.isSelectable ? <Radio color="secondary" /> : <div></div>}
                                                    checked={m.id === k.selectedId} />
                                                <ListItemText primary={m.version} />
                                                {k.isDownloadable ?
                                                    <ListItemSecondaryAction>
                                                        <IconButton onClick={() => this.downloadFile(m.id, m.fileName)} >
                                                            <MdFileDownload size="1.5rem" />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                    : null}
                                            </ListItem>
                                        ))}
                                    </List>

                                </div>
                            ))}

                        </div>
                        <div className={classes.bottomBtnContainer}>
                            <Button disabled fullWidth={true} variant="contained" color="primary" size="large" onClick={this.save}>SAVE</Button>
                        </div>
                    </React.Fragment>
                }
            </div>);
    }
}
const mapDispatchToProps = dispatch => {
    return {
        spinStart: msg => dispatch(actions.spinnerStart(msg)),
        spinStop: () => dispatch(actions.spinnerStop()),
        notify: (msg, variant) => dispatch(actions.notificationAdd(msg, variant))
    };
};
export default connect(
    null,
    mapDispatchToProps
)(Administration);