import { Container, Typography, Box, FormHelperText, TextField, Button, Tab, Tabs, IconButton, InputAdornment, FilledInput, FormControl, InputLabel } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import useFormState from "../hooks/useFormState";
import { AuthFormState, login } from "../services/login";
import GitHubIcon from '@mui/icons-material/GitHub';

const Authentification = () => {
    const { dispatch } = useContext(AppContext);
    const [tabIndex, setTabIndex] = useState(0);
    const [state, submit] = useFormState<AuthFormState>(login(dispatch));
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return <Container component="main" maxWidth='xs' data-testid="auth-data">
        <Typography component="h1" variant="h5">
            {!tabIndex ? "Please login" : "Please create a new account"}
        </Typography>
        <Tabs
            value={tabIndex}
            onChange={handleChange}
            scrollButtons="auto"
            aria-label="scrollable auto tabs example" sx={{ mt: 3 }}
            centered
        >
            <Tab label="Sign In" />
            <Tab label="Sign Up" />

        </Tabs>
        <Box component="form" noValidate onSubmit={submit}  >
            <FormHelperText error={!!state.message} sx={{ mb: 1 }}  >{state.message}</FormHelperText>
            <TextField
                name="login"
                required
                fullWidth
                id="login"
                label="User Name"
                autoFocus
                sx={{ mt: 2 }}
                error={!!state.errors?.login}
                helperText={state.errors?.login}
            />

            <TextField
                required
                fullWidth
                name="password"
                id="password"
                label="Password"
                sx={{ mt: 2 }}
                error={!!state.errors?.password}
                helperText={state.errors?.password}
                type='password'

            />
            <input
                name="tabIndex"
                id="tabIndex"
                type='hidden'
                value={tabIndex}


            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                data-testid="submit-account-data"
            >
                Submit
            </Button>

        </Box>
        <Typography component="h4" variant="subtitle1" >
            or use a social to access
        </Typography>
        <Button variant="outlined" startIcon={<GitHubIcon />}
            href="/api/oauth/github" fullWidth
        >
            GitHub
        </Button>
    </Container>
}
export default Authentification;