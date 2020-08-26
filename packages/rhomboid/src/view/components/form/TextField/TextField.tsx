import { FieldHookConfig, useField } from 'formik';
import { TextField as MaterialTextField, BaseTextFieldProps } from '@material-ui/core';
import * as React from 'react';

interface TextFieldProps extends BaseTextFieldProps {
    label: BaseTextFieldProps['label'];
}

type TextFieldAllProps = TextFieldProps & FieldHookConfig<string>;

export const TextField: React.FunctionComponent<TextFieldAllProps> = ({ onFocus, ...props }) => {
    const [field, meta] = useField({
        ...props,
        validate: (val) => {
            if (val === 'forceError') return 'Forced error';
            return;
        },
    });
    return (
        <MaterialTextField
            // Formik field injections
            value={field.value}
            onChange={field.onChange as any}
            onBlur={field.onBlur as any}
            // Formik validation injections
            error={!!meta.error}
            helperText={meta.error}
            // TextField defaults
            variant="outlined"
            margin="dense"
            fullWidth
            // User props
            {...props}
        />
    );
};
