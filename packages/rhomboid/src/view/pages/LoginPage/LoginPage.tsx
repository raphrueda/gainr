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
import { Alert } from '@material-ui/lab';
import * as React from 'react';

import { Form, TextField } from '@components/form';
import { useAxios } from '@utils/api';
import { AxiosRequestConfig } from 'axios';

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
        margin: theme.spacing(1, 0, 2),
    },
}));

const axiosConfig: AxiosRequestConfig = { url: 'http://localhost:9002/auth/login', method: 'POST' };

export const LoginPage: React.FunctionComponent = () => {
    const styles = useStyles();

    const [config, setConfig] = React.useState(axiosConfig);
    const [{ loading, data, error }] = useAxios(config);

    if (loading) {
        return <div>TODO: Fancy loading pattern</div>;
    }

    return (
        <div className={styles.loginPage}>
            <Container className={styles.loginContainer} component="main" maxWidth="xs">
                <Paper className={styles.paper}>
                    <Avatar className={styles.avatar}>
                        <FitnessCenter fontSize="large" />
                    </Avatar>
                    <Typography variant="h4">Sign in</Typography>
                    {error && (
                        <Alert className={styles.alert} severity="error">
                            Something went wrong :c
                        </Alert>
                    )}
                    <Form
                        className={styles.form}
                        initialValues={{ usernameEmail: '', password: '' }}
                        onSubmit={(formValues) =>
                            setConfig({
                                ...config,
                                data: {
                                    username: formValues.usernameEmail,
                                    password: formValues.password,
                                },
                            })
                        }
                    >
                        <TextField
                            name="usernameEmail"
                            label="Username/Email address"
                            margin="normal"
                            validate={(value) =>
                                value === 'forceError' ? 'Forced error' : undefined
                            }
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
                            className={styles.submit}
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                        >
                            Sign in
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Form>
                </Paper>
            </Container>
        </div>
    );
};
