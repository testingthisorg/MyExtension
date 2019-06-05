import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Button from "../UI/Button/Button";
import { DialogActions, Divider } from "@material-ui/core";
import classes from './ConfirmationDialog.module.scss';
import { MdWarning } from "react-icons/md";


export default function ConfirmationDialog(props) {

    return (
        <Dialog
            onWheel={evt => evt.stopPropagation()}
            onMouseDown={evt => evt.stopPropagation()}
            maxWidth="sm"
            fullWidth
            open={props.open}
            TransitionComponent={(props) => <Slide direction="up" {...props} />}
            onClose={props.onCancel}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >

            <div className={classes.titleBar}><MdWarning style={{ fontSize: '3rem' }} /> &nbsp;Please Confirm
                            </div>

            <DialogContent>
                <div className={classes.content}>
                    <MdWarning className={classes.warningIcon}></MdWarning>
                    {props.message}
                </div>
                <Divider></Divider>
            </DialogContent>
            <DialogActions>
                <div className={classes.dialogActions}>

                    <Button
                        clicked={props.onCancel}
                        variant="outlined"
                        color="primary"
                    >
                        CANCEL
</Button>
                    <Button
                        clicked={props.onOk}
                        variant="contained"
                        color="secondary"
                    >
                        CONFIRM
</Button>
                </div>
            </DialogActions>
        </Dialog>

    )
}

