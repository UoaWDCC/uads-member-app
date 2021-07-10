import { PureComponent } from 'react';
interface Props {
    initialUiVisible?: boolean;
    tabOpen: number;
    onChangeTab: (index: number) => void;
}
export default class Navigation extends PureComponent<Props> {
    state: {
        isUIVisible: boolean;
    };
    handleToggleUI: () => void;
    handleSwipeLeft: () => void;
    handleSwipeRight: () => void;
    render(): JSX.Element;
}
export {};
