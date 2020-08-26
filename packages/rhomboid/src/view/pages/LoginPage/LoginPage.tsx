import {
    Avatar,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Link,
    makeStyles,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core';
import { FitnessCenter } from '@material-ui/icons';
import * as React from 'react';

const useStyles = makeStyles((theme) => ({
    loginPage: {
        display: 'flex',
        height: '100vh',
    },
    loginContainer: {
        marginTop: theme.spacing(20),
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 0, 2),
    },
}));

export const LoginPage: React.FunctionComponent = () => {
    const styles = useStyles();

    return (
        <div className={styles.loginPage}>
            <Container className={styles.loginContainer} component="main" maxWidth="xs">
                <Paper className={styles.paper}>
                    <Avatar className={styles.avatar}>
                        <FitnessCenter fontSize="large" />
                    </Avatar>
                    <Typography variant="h4">Sign in</Typography>
                    <form className={styles.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            label="Username/Email address"
                            required
                            fullWidth
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            label="Password"
                            required
                            fullWidth
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            className={styles.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};
