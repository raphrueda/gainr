import * as classnames from 'classnames';
import * as React from 'react';

const CLASS_NAME = 'inline';
const ITEM_CLASS_NAME = `${CLASS_NAME}__item`;

interface InlineProps {
    spacing?: InlineSpacing;
    center?: boolean;
    pullRight?: boolean;
}

export enum InlineSpacing {
    None = 'none',
    ExtraSmall = 'xs',
    Small = 'sm',
    Medium = 'md',
    Large = 'lg',
    ExtraLarge = 'xl',
}

export const Inline: React.FunctionComponent<InlineProps> = ({
    spacing,
    center,
    pullRight,
    children,
}) => {
    const className = classnames(CLASS_NAME, {
        [`${CLASS_NAME}--center`]: center,
        [`${CLASS_NAME}--pull-right`]: pullRight,
    });

    if (!Array.isArray(children)) return <div className={className}>{children}</div>;

    return (
        <div className={className}>
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
