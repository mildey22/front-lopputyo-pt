import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fetchCustomers } from '../customerapi';

export default function AddTraining({ handleAdd }) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: null,
        activity: '',
        duration: '',
        customer: ''
    })

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetchCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err))
    }

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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={training.date}
                            //After using the date picker, the site crashes. I have a feeling it has to do with using it using dayjs.
                            //Maybe it clashes with date-fns? My skills end here unfortunately
                            onChange={date => setTraining({ ...training, date: date.toISOString() })}
                            renderInput={(params) => <TextField {...params} />}
                            fullWidth
                            variant="standard"
                        />
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        label="Activity"
                        value={training.activity}
                        onChange={e => setTraining({ ...training, activity: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Duration (min)"
                        value={training.duration}
                        onChange={e => setTraining({ ...training, duration: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <FormControl fullWidth>
                        <InputLabel id="customer">Customer</InputLabel>
                        <Select
                            labelId="customer"
                            id="customer"
                            value={training.customer}
                            label="Customer"
                            onChange={e => setTraining({ ...training, customer: e.target.value })}
                        >
                            {customers.map(customer => (
                                <MenuItem key={customer.id} value={customer}>
                                    {customer.firstname} {customer.lastname}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}