import {
    Alert,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Paper, Snackbar, TextField,
    Typography
} from "@mui/material";
import {githubUser} from "../model/userModel.ts";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState} from "react";
import { updateUserMotivation} from "../service/userService.ts";


export default function Motivation( { user }: Readonly<{ user: githubUser }>) {
    const [currentUser, setCurrentUser] = useState(user);
    const [newMotivation, setNewMotivation] = useState('');
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [stopSnackbarOpen, setStopSnackbarOpen] = useState(false);

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setNewMotivation('');
        setError('');
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleCloseStopSnackbar = () => {
        setStopSnackbarOpen(false);
    };

    const handleAddMotivation = () => {
        if (newMotivation.trim() === '') {
            setError('Motivation darf nicht leer sein');
            return;
        }
        const updatedMotivation = [...currentUser.mainMotivation, newMotivation];
        updateUserMotivation(currentUser, updatedMotivation)
            .then(updatedUser => {
                setCurrentUser(updatedUser);
                handleCloseDialog();
            });
        setSnackbarOpen(true);
    };

    const handleRemoveMotivation = (index: number) => {
        const updatedMotivation = currentUser.mainMotivation.filter((_, i) => i !== index);
        updateUserMotivation(currentUser, updatedMotivation)
            .then(updatedUser => {
                setCurrentUser(updatedUser);
            });
        setStopSnackbarOpen(true);
    };

    return (
        <div>
            {currentUser.mainMotivation.map((motivation, index) => (
                <Paper key={motivation} >
                    <Typography variant="body1">{motivation}</Typography>
                    <div >

                        <IconButton onClick={() => handleRemoveMotivation(index)}>
                            <DeleteOutlineOutlinedIcon color="error" fontSize="small"/>
                        </IconButton>
                    </div>
                </Paper>
            ))}
            <Button size="small" color="primary" onClick={handleOpenDialog}>
                Hinzufügen
            </Button>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Neue Motivation hinzufügen</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bitte geben Sie Ihre neue Motivation ein:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Motivation"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newMotivation}
                        onChange={(e) => setNewMotivation(e.target.value)}
                        error={!!error}
                        helperText={error}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Abbrechen
                    </Button>
                    <Button onClick={handleAddMotivation} color="primary">
                        Speichern
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}>
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Motivation hinzugefügt!
                </Alert>
            </Snackbar>

            <Snackbar
                open={stopSnackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseStopSnackbar}
            >
                <Alert
                    onClose={handleCloseStopSnackbar}
                    severity="warning"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Motivation gelöscht!
                </Alert>
            </Snackbar>
        </div>
    )
}