import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { ActionType, ActionTypes } from "../redux/appReducer";

export const onClose = (dispatch: React.Dispatch<ActionType>) => (_: any) => dispatch({ type: ActionTypes.Clean })

const ApplicationForm = () => {
    const { dispatch, state } = useContext(AppContext);
    return <Container component="main" maxWidth='xs' data-testid="review-decision" >
        <Typography component="h1" variant="h5" sx={{ mt: 3, mb: 3 }}>
            The Decision Engine Respponse
        </Typography>
        <Typography component="h1" variant="h5" sx={{ mt: 3, mb: 3 }} color="red" >
            <>{state.decision}</></Typography>
        <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onClose(dispatch)}
            data-testid="review-decision_submit"
        >
            OK
        </Button>
    </Container>
}
export default ApplicationForm;