import {useEffect, useState} from 'react';
import { updateUser } from "../service/userService.ts";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    TextField,
    Typography,
    Alert
} from '@mui/material';
import {githubUser, UserDTO} from "../model/userModel.ts";



export default function SmokeFreeTracker( { user }: Readonly<{ user: githubUser }> )  {
    const [cigarettes, setCigarettes] = useState(1);
    const [trackingActive, setTrackingActive] = useState<boolean>();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [stopSnackbarOpen, setStopSnackbarOpen] = useState(false);



    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };


    const handleStartTracking = () => {
        setTrackingActive(true);
        setDialogOpen(false);
        setSnackbarOpen(true);
        startTracking(user);
        console.log(`Tracking started with ${cigarettes} cigarettes`);
    };

    const handleOpenConfirmDialog = () => {
        setConfirmDialogOpen(true);
    };

    const handleCloseConfirmDialog = () => {
        setConfirmDialogOpen(false);
    };

    const handleStopTracking = () => {
        setConfirmDialogOpen(false);
        setCigarettes(1);
        setTrackingActive(false);
        setStopSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleCloseStopSnackbar = () => {
        setStopSnackbarOpen(false);
    };

    useEffect(() => {
        if (user.dailySmokedCigarettes > 1) {
            setTrackingActive(true);
        } else {
            setTrackingActive(false);
        }
    }, [user.dailySmokedCigarettes]);


    function startTracking(user : githubUser){
        const updatedUser: UserDTO = {
            dailySmokedCigarettes: cigarettes,
            mainMotivation: user.mainMotivation,
            quitDate: new Date().toISOString(),
            goals: user.goals
        };
        updateUser(updatedUser, user.id)
            .then(() => {
                console.log('User updated', updatedUser)
            })
            .catch((error) => {
                console.error('Error updating user', error);
            });
    }

    return (
        <div>
            {trackingActive ? (
                <div>
                    <Typography variant="body1">
                        Drücken Sie den Button, wenn Sie eine Zigarette geraucht haben.
                    </Typography>
                    <Button variant="contained" color="secondary" onClick={handleOpenConfirmDialog}>
                        Zigarette geraucht
                    </Button>
                </div>
            ) : (
                <div>
                    <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                        Rauchfrei-Tracking starten
                    </Button>
                </div>
            )}

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Anzahl gerauchter Zigaretten/Tag</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Anzahl eingeben"
                        value={cigarettes}
                        onChange={(e) => {
                            setCigarettes(+e.target.value);
                        }}
                        fullWidth
                        required
                        InputProps={{ inputProps: { min: 1 } }}
                        error={cigarettes < 1}
                        helperText={cigarettes < 1 ? 'Bitte eine Zahl größer als 0 eingeben' : ''}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Abbrechen
                    </Button>
                    <Button onClick={handleStartTracking} color="primary" disabled={cigarettes <= 0}>
                        Bestätigen
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmDialog}>
                <DialogTitle>Bestätigung</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Sind Sie sicher, dass Sie eine Zigarette geraucht haben möchten?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDialog} color="secondary">
                        Abbrechen
                    </Button>
                    <Button onClick={handleStopTracking} color="primary">
                        Ja, Zigarette geraucht
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
                    Dein Rauchfrei-Leben beginnt!
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
                    Rauchfrei-Tracking beendet
                </Alert>
            </Snackbar>
        </div>
    );
}
