import { styled } from "@mui/system";
import { Paper } from "@mui/material";

export const StyledMoneyPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginInline: '16px',
    marginBottom: theme.spacing(2),
    backgroundColor: '#1A73E8',
    color: 'white',
    width: 'calc(100% - 32px)',
    maxWidth: '400px'

}));

export const StyledMotivationPaperNoActions = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginInline: '16px',
    marginBottom: theme.spacing(2),
    backgroundColor: '#44AA44',
    color: '#EAEAEA',
    width: 'calc(100% - 32px)',
    maxWidth: '400px',
    textAlign: 'center',

}));

export const StyledMotivationPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2,0),
    marginInline: '16px',
    marginBottom: theme.spacing(2),
    backgroundColor: '#44AA44',
    color: '#EAEAEA',
    width: 'calc(100% - 32px)',
    maxWidth: '400px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

}));

export const StyledGoalPaperNoActions = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1,2),
    marginInline: '16px',
    marginBottom: theme.spacing(2),
    backgroundColor: '#1A73E8',
    color: 'white',
    width: 'calc(100% - 32px)',
    maxWidth: '400px',
    textAlign: 'center',

}));

export const StyledGoalPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1,0),
    marginInline: '16px',
    marginBottom: theme.spacing(2),
    backgroundColor: '#1A73E8',
    color: 'white',
    width: 'calc(100% - 32px)',
    maxWidth: '400px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));