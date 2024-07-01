import {useEffect, useState} from 'react';
import {startTracking, stopTracking} from "../service/userService.ts";
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
import {githubUser} from "../model/userModel.ts";



export default function SmokeFreeTracker( { user }: Readonly<{ user: githubUser }> )  {
    const [cigarettes, setCigarettes] = useState<number>(0);
    const [trackingActive, setTrackingActive] = useState<boolean>();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [stopSnackbarOpen, setStopSnackbarOpen] = useState(false);
    const [inputIsTouched, setInputIsTouched] = useState(false);



    const handleDialog = () => {
        setDialogOpen(!dialogOpen);
    };

    const handleStartTracking = () => {
        setTrackingActive(true);
        setDialogOpen(false);
        setSnackbarOpen(true);
        startTracking(user, cigarettes)
            .then(() => {
                console.log(`Tracking started with ${cigarettes} cigarettes`);
            })
            .catch((error) => {
                console.error('Error starting tracking', error);
            });
        console.log(`Tracking started with ${cigarettes} cigarettes`);
    };

    const handleConfirmDialog = () => {
        setConfirmDialogOpen(!confirmDialogOpen);
    };

    const handleStopTracking = () => {
        setConfirmDialogOpen(false);
        setCigarettes(0);
        setTrackingActive(false);
        setStopSnackbarOpen(true);
        stopTracking(user)
            .then(() => {
                console.log('Tracking stopped');
            })
            .catch((error) => {
                console.error('Error stopping tracking', error);
            });
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




    return (
        <div>
            {trackingActive ? (
                <div>
                    <Typography variant="body1">
                        Drücken Sie den Button, wenn Sie eine Zigarette geraucht haben.
                    </Typography>
                    <Button variant="contained" color="secondary" onClick={handleConfirmDialog}>
                        Zigarette geraucht
                    </Button>
                </div>
            ) : (
                <div>
                    <Button variant="contained" color="primary" onClick={handleDialog}>
                        Rauchfrei-Tracking starten
                    </Button>
                </div>
            )}

            <Dialog open={dialogOpen} onClose={handleDialog}>
                <DialogTitle>Anzahl gerauchter Zigaretten/Tag</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Anzahl eingeben"
                        value={cigarettes}
                        onChange={(e) => {
                            setCigarettes(+e.target.value);
                        }}
                        onFocus={() => setInputIsTouched(true)}
                        fullWidth
                        required
                        InputProps={{ inputProps: { min: 1 } }}
                        error={cigarettes < 1 && inputIsTouched}
                        helperText={cigarettes < 1 && inputIsTouched ? 'Bitte eine Zahl größer als 0 eingeben' : ''}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialog} color="secondary">
                        Abbrechen
                    </Button>
                    <Button onClick={handleStartTracking} color="primary" disabled={cigarettes <= 0}>
                        Bestätigen
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmDialogOpen} onClose={handleConfirmDialog}>
                <DialogTitle>Bestätigung</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Sind Sie sicher, dass Sie eine Zigarette geraucht haben möchten?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmDialog} color="secondary">
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
