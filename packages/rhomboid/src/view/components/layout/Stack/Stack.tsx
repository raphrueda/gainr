import * as classnames from 'classnames';
import * as React from 'react';

const CLASS_NAME = 'stack';
const ITEM_CLASS_NAME = `${CLASS_NAME}__item`;

interface StackProps {
    spacing?: StackSpacing;
}

export enum StackSpacing {
    None = 'none',
    ExtraSmall = 'xs',
    Small = 'sm',
    Medium = 'md',
    Large = 'lg',
    ExtraLarge = 'xl',
}

export const Stack: React.FunctionComponent<StackProps> = ({ spacing, children }) => {
    if (!Array.isArray(children)) return <div className={ITEM_CLASS_NAME}>{children}</div>;

    return (
        <div className={CLASS_NAME}>
            {React.Children.map(children, (child, index) => (
                <div
                    className={classnames(ITEM_CLASS_NAME, {
                        [`${ITEM_CLASS_NAME}--spacing-${spacing}`]:
                            index !== children.length - 1 && !!spacing,
                    })}
                >
                    {child}
                </div>
            ))}
        </div>
    );
};
