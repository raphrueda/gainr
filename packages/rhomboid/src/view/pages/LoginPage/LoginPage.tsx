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
    Typography,
} from '@material-ui/core';
import { FitnessCenter } from '@material-ui/icons';
import { Form, Formik } from 'formik';
import * as React from 'react';

import { TextField } from '../../components/form';

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
                    <Formik
                        initialValues={{ usernameEmail: '', password: '' }}
                        onSubmit={(val) => alert(JSON.stringify(val))}
                    >
                        <Form className={styles.form} noValidate>
                            <TextField
                                name="usernameEmail"
                                label="Username/Email address"
                                margin="normal"
                                required
                                autoFocus
                            />
                            <TextField
                                name="password"
                                label="Password"
                                type="password"
                                margin="normal"
                                required
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
                        </Form>
                    </Formik>
                </Paper>
            </Container>
        </div>
    );
};
