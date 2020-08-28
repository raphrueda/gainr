import {
    Avatar,
    Button,
    Container,
    Grid,
    Link,
    makeStyles,
    Paper,
    Typography,
} from '@material-ui/core';
import { FitnessCenter } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { AxiosRequestConfig } from 'axios';
import * as React from 'react';

import { useAxios } from '@utils/api';
import { Form, TextField } from '@components/form';

const useStyles = makeStyles((theme) => ({
    signUpPage: {
        display: 'flex',
        height: '100vh',
    },
    signUpContainer: {
        marginTop: theme.spacing(20),
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
    },
    alert: {
        marginTop: theme.spacing(1),
        width: '100%',
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
}));

const axiosConfig: AxiosRequestConfig = {
    url: 'http://localhost:9002/auth/signup',
    method: 'POST',
};

export const SignUpPage: React.FunctionComponent = () => {
    const styles = useStyles();
    const [{ loading, data, error }, register] = useAxios(axiosConfig, { initialFetch: false });

    if (!loading && data) console.log(data);

    return (
        <div className={styles.signUpPage}>
            <Container className={styles.signUpContainer} component="main" maxWidth="xs">
                <Paper className={styles.paper}>
                    <Avatar className={styles.avatar}>
                        <FitnessCenter fontSize="large" />
                    </Avatar>
                    <Typography variant="h4">Sign up</Typography>
                    {error && (
                        <Alert className={styles.alert} severity="error">
                            Sign up failed.
                        </Alert>
                    )}
                    <Form
                        className={styles.form}
                        onSubmit={({ username, email, password }) =>
                            register({
                                username,
                                email,
                                password,
                            })
                        }
                    >
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField name="firstName" label="First name" autoFocus />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="lastName" label="Last name" autoFocus />
                            </Grid>
                        </Grid>
                        <TextField name="username" label="Username" />
                        <TextField name="email" label="Email address" required />
                        <TextField name="password" label="Password" type="password" required />
                        <TextField
                            name="confirmPassword"
                            label="Confirm password"
                            type="password"
                            required
                        />
                        <Button
                            className={styles.submit}
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                        >
                            Sign up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Form>
                </Paper>
            </Container>
        </div>
    );
};
