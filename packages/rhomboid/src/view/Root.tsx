import * as React from 'react';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import { AppPage } from './pages/AppPage/AppPage';
import { LoginPage } from './pages/LoginPage/LoginPage';

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
export const Root: React.FunctionComponent = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter>
            <Switch>
                <Route exact path="/" component={AppPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/signup" component={LoginPage} />
                <Redirect to="/login" />
            </Switch>
        </HashRouter>
    </ThemeProvider>
);
