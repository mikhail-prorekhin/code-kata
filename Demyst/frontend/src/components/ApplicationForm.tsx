
import { Box, Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { ApplicationFormState, requestBalanceSheet } from '../services/requestBalanceSheet';
import useFormState from "../hooks/useFormState";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const ApplicationForm = () => {
    const { dispatch } = useContext(AppContext);
    const [state, submit] = useFormState<ApplicationFormState>(requestBalanceSheet(dispatch));
    return <>

        <Container component="main" maxWidth='xs' data-testid="account-data">
            <Typography component="h1" variant="h5">
                Balance Sheet Request
            </Typography>

            <Box component="form" noValidate onSubmit={submit} sx={{ mt: 3 }} >
                <FormHelperText error={!!state.message} sx={{ mb: 1 }}  >{state.message}</FormHelperText>
                <TextField
                    name="companyName"
                    required
                    fullWidth
                    id="companyName"
                    label="Company Name"
                    autoFocus
                    sx={{ mt: 2 }}
                    error={!!state.errors?.companyName}
                    helperText={state.errors?.companyName}
                />

                <TextField
                    required
                    fullWidth
                    name="estYear"
                    id="estYear"
                    label="Est.Year"
                    sx={{ mt: 2 }}
                    error={!!state.errors?.estYear}
                    helperText={state.errors?.estYear}
                />

                <TextField
                    required
                    fullWidth
                    name="loanAmount"
                    id="loanAmount"
                    label="Loan Amount"
                    sx={{ mt: 2 }}
                    error={!!state.errors?.loanAmount}
                    helperText={state.errors?.loanAmount}
                />
                <FormControl fullWidth sx={{ mt: 2 }}
                >
                    <InputLabel id="accountProviderLabel">Account Provider</InputLabel>
                    <Select
                        name="accountProvider"
                        error={!!state.errors?.accountProvider}
                        labelId="accountProviderLabel"
                        id="accountProvider"
                        defaultValue={""}
                        label="Account Provider"
                    >
                        <MenuItem value="myob">MYOB</MenuItem>
                        <MenuItem value="xero">Xero</MenuItem>
                    </Select>
                    <FormHelperText error={!!state.errors?.accountProvider} >{state.errors?.accountProvider}</FormHelperText>
                </FormControl>
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
        </Container>




    </>
}

export default ApplicationForm;