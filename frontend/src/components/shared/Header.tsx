
import { Box } from "@mui/material";

export default function Header() {
    return (
        <header>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <p>Logo</p>
                <h1>Time to Quit</h1>
                <p>Logout</p>
            </Box>
        </header>
    )
}