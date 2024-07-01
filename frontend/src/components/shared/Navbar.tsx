import {useState} from "react";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import {HomeOutlined, FlagCircleOutlined, TipsAndUpdatesOutlined } from "@mui/icons-material";
import {useNavigate} from "react-router-dom";


export default function Navbar() {
    const navigate = useNavigate();
    const [value, setValue] = useState(1);
    return (
        <nav style={{height: '70px'}}>
            <Box sx={{position: 'fixed', bottom: 0, left: 0, right: 0, }}>
                <BottomNavigation
                    style={{backgroundColor: '#f5f5f5', color: '#333333', height: '70px'}}
                    showLabels
                    value={value}
                    onChange={(_event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Goals" icon={<FlagCircleOutlined />} onClick={()=> navigate("/goals")}/>
                    <BottomNavigationAction label="Home" icon={<HomeOutlined />} onClick={()=> navigate("/")}/>
                    <BottomNavigationAction label="Tips" icon={<TipsAndUpdatesOutlined />} />
                </BottomNavigation>
            </Box>
        </nav>
    )
}