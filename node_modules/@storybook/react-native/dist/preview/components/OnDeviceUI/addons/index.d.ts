import { PureComponent } from 'react';
export default class Addons extends PureComponent<{}, {
    addonSelected: string;
}> {
    panels: import("@storybook/addons").Collection;
    constructor(props: {});
    onPressAddon: (addonSelected: string) => void;
    render(): JSX.Element;
}
