import * as React from 'react';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import { AppPage } from './pages/AppPage/AppPage';
import { LoginPage } from './pages/LoginPage/LoginPage';

import '../styles/main.scss';

const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    fontSize: '13px',
                },
            },
        },
    },
});

/**
 * Root component for defining routes and providers
 */
export const Root: React.FunctionComponent = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter>
            <Switch>
                <Route exact path="/" component={AppPage} />
                <Route exact path="/login" component={LoginPage} />
                <Redirect to="/login" />
            </Switch>
        </HashRouter>
    </ThemeProvider>
);
