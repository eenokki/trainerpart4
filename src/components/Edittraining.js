import React,{Fragment} from "react";
import { Button, Icon } from "uiw";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function Edittraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        activity: '', date: '', duration: ''
    })
    const handleClickOpen = () => {
        setTraining({
            activity: props.training.activity, date: props.training.date,
            duration: props.training.duration
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        setTraining({ ...training, [e.target.name]: e.target.value })
    };

    const updateTraining = () => {
        props.updateTraining(training, props.training.links[0].href);
        handleClose();
    }

    const dateChanged = (newDate) => {
        setTraining({ ...training, date: newDate.toISOString() });
    }

    return (
        <div>
            <Button size="small" style={{ margin: 10 }} type="light" onClick={handleClickOpen}>
                <Icon type="copy" />
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Training</DialogTitle>
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
                    <Button onClick={updateTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default Edittraining;
