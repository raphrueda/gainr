import { Formik, Form as FormikForm, FormikConfig, FormikValues } from 'formik';
import * as React from 'react';

interface FormProps {
    className: string;
    initialValues: FormikValues;
    onSubmit?: FormikConfig<FormikValues>['onSubmit'];
}

export const Form: React.FunctionComponent<FormProps> = ({ children, className, ...restProps }) => (
    <Formik onSubmit={() => {}} {...restProps}>
        <FormikForm className={className}>{children}</FormikForm>
    </Formik>
);
