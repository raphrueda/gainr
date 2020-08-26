import { Button, Link, Paper, TextField, Typography } from '@material-ui/core';
import * as React from 'react';

import { Inline, InlineSpacing, Stack, StackSpacing } from '../../components/layout';

const CLASS_NAME = 'login-page';
const LOGIN_CLASS_NAME = `${CLASS_NAME}__login-section`;

export const LoginPage: React.FunctionComponent = () => (
    <div className={CLASS_NAME}>
        <Paper className={LOGIN_CLASS_NAME}>
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
