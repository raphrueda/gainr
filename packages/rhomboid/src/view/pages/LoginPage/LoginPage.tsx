import { Button, Link, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import * as React from 'react';

import { Inline, InlineSpacing, Stack, StackSpacing } from '../../components/layout';

const useStyles = makeStyles((theme) => ({
    loginPage: {
        display: 'flex',
        height: '100vh',
        background: '#eee',
    },
    loginPaper: {
        width: '350px',
        margin: 'auto',
        padding: '1rem',
    },
}));

export const LoginPage: React.FunctionComponent = () => {
    const styles = useStyles();
    return (
        <div className={styles.loginPage}>
            <Paper className={styles.loginPaper}>
                <Stack spacing={StackSpacing.Large}>
                    <Typography variant="h5">Hand stand</Typography>
                    <TextField
                        label="Username/email"
                        size="small"
                        variant="outlined"
                        fullWidth
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        size="small"
                        variant="outlined"
                        fullWidth
                        required
                    />
                    <Inline spacing={InlineSpacing.Medium} center pullRight>
                        <Typography>
                            <Link href="#/">Forgot password?</Link>
                        </Typography>
                        <Button variant="contained" color="default" size="medium">
                            Signup
                        </Button>
                        <Button variant="contained" color="primary" size="medium">
                            Login
                        </Button>
                    </Inline>
                </Stack>
            </Paper>
        </div>
    );
};
