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