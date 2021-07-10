import { PureComponent } from 'react';
export interface Props {
    index: number;
    onPress: (id: number) => void;
}
export default class Bar extends PureComponent<Props> {
    render(): JSX.Element;
}
