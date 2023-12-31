import { Stack, Alert } from "@mui/material";
import { ActionTypes } from "../redux/appReducer";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export default function Notification() {
    const { state, dispatch } = useContext(AppContext);
    return (
        <Stack spacing={2} maxWidth='md' margin={"0 auto"}  >
            {state.message && <Alert severity="error" onClose={() => dispatch({ type: ActionTypes.cleanMessage })}>{state.message}</Alert>}
        </Stack>
    );
}