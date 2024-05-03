import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddTraining({ handleAdd }) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '',
        activity: '',
        duration: '',
        customer: ''
    })
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        handleAdd(training);
        setOpen(false);
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add training
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>New training</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Brand"
                        value={training.date}
                        onChange={e => setTraining({...training, date: e.target.value})}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Model"
                        value={car.model}
                        onChange={e => setCar({...car, model: e.target.value})}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Color"
                        value={car.color}
                        onChange={e => setCar({...car, color: e.target.value})}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Fuel"
                        value={car.fuel}
                        onChange={e => setCar({...car, fuel: e.target.value})}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Model Year"
                        value={car.modelYear}
                        onChange={e => setCar({...car, modelYear: e.target.value})}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Price (€)"
                        value={car.price}
                        onChange={e => setCar({...car, price: e.target.value})}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}