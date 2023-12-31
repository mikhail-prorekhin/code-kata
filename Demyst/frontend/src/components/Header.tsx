import { Box, AppBar, Toolbar, Button, Typography } from "@mui/material";
import Notification from "./Notification"
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { isUserAuthentificated } from "../redux/appReducer";
import { logout } from "../services/logout";
import { GWTDataType } from "../types/GWTData";


const Header = () => {
    const { state, dispatch } = useContext(AppContext);
    return <Box position="sticky" top={0} zIndex={100}>
        <AppBar position="static"  >
            <Toolbar >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    demyst.com
                </Typography>
                {isUserAuthentificated(state) && <Button color="inherit" onClick={logout(dispatch, state.user?.gwt as GWTDataType)}  >Logout {state.user?.login}</Button>}
            </Toolbar>
        </AppBar>
        <Notification />
    </Box>
}


export default Header;