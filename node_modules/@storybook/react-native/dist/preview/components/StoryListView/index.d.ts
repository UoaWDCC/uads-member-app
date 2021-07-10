import { Component } from 'react';
interface Props {
    stories: any;
}
interface State {
    data: any[];
    originalData: any[];
}
export default class StoryListView extends Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    forceReRender: () => void;
    handleStoryAdded: () => void;
    handleChangeSearchText: (text: string) => void;
    changeStory(storyId: string): void;
    render(): JSX.Element;
}
export {};
