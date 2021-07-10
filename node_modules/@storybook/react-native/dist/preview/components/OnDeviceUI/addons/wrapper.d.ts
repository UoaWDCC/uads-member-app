import { PureComponent } from 'react';
import { Collection } from '@storybook/addons';
export interface Props {
    panels: Collection;
    addonSelected: string;
}
export default class Wrapper extends PureComponent<Props> {
    static defaultProps: {
        addonSelected: string;
    };
    render(): JSX.Element[];
}
