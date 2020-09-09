import * as React from 'react';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import { AppPage } from '@pages/AppPage';
import { LoginPage } from '@pages/LoginPage';
import { SignUpPage } from '@pages/SignUpPage';
import { isAuthenticated } from '@utils/api/access';

import '../styles/main.scss';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#4D4F56',
        },
        secondary: {
            main: '#2A7F62',
        },
        background: {
            default: '#E1DEE3',
        },
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    fontSize: '13px',
                },
            },
        },
        MuiAvatar: {
            colorDefault: { color: 'white' },
        },
    },
});

/**
 * Root component for defining routes and providers
 */
export const Root: React.FunctionComponent = () => {
    if (!isAuthenticated()) return <Redirect to="/login" />;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={AppPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/signup" component={SignUpPage} />
                    <Redirect to="/" />
                </Switch>
            </HashRouter>
        </ThemeProvider>
    );
};
