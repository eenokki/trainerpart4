import React, { Fragment } from "react";
import { Button } from "uiw";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function Addtraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '', duration: '', activity: '', customer: props.training.links[0].href
    })
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        setTraining({ ...training, [e.target.name]: e.target.value })
    };

    const addTraining = () => {
        props.saveTraining(training);
        handleClose();
    }
    const dateChanged = (newDate) => {
        setTraining({ ...training, date: newDate.toISOString() });
    }

    return (
        <div>
            <Button style={{ margin: 10 }} size="small" icon="file-add" type="success" onClick={handleClickOpen}>
                Add Training
            </Button>
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Add new training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        label="Activity"
                        fullWidth
                    />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Fragment>
                            <DateTimePicker
                                autoOk
                                ampm={false}
                                disableFuture
                                value={training.date}
                                onChange={newDate => dateChanged(newDate)}
                                label="Date"
                            />
                        </Fragment>
                    </MuiPickersUtilsProvider>

                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        label="Duration in minutes"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>


    );

}
export default Addtraining;