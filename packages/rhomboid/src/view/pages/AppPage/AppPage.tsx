import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { isAuthenticated } from '@utils/api/access';

// TODO Design a proper home page
export const AppPage: React.FunctionComponent = () => {
    if (!isAuthenticated()) return <Redirect to="/login" />;
    return <div>App page</div>;
};
