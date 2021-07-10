import { PureComponent } from 'react';
import { Collection } from '@storybook/addons';
export interface Props {
    panels: Collection;
    addonSelected: string;
    onPressAddon: (id: string) => void;
}
export default class AddonList extends PureComponent<Props> {
    renderTab: (id: string, title: string) => JSX.Element;
    render(): JSX.Element;
}
