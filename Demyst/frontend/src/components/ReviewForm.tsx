import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import BalanceSheet from "./BalanceSheet";
import approveApplication from "../services/approveApplication";

const ReviewForm = () => {
    const { state, dispatch } = useContext(AppContext);

    return <Container component="main" data-testid="review-data">
        <Typography component="h1" variant="h5">
            Balance Review
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
                <TextField
                    value={state.company?.companyName}
                    label="Company Name"
                    disabled
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    value={state.company?.estYear}
                    label="Est.Year"
                    disabled
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    value={state.loanAmount}
                    disabled
                    fullWidth
                    label="Loan Amount"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    value={state.loanAmount}
                    disabled
                    fullWidth
                    label="Account Provider"
                />
            </Grid>
            <Grid item xs={12}>
                <BalanceSheet sheet={state.balanceSheet} />
            </Grid>
        </Grid>
        <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={approveApplication(dispatch, state)}
            data-testid="review-data-submit"
        >
            Submit
        </Button>
    </Container>
}
export default ReviewForm;


