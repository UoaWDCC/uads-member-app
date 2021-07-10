import { Animated } from 'react-native';
export declare const getNavigatorPanelPosition: (animatedValue: Animated.Value, previewWidth: number) => {
    transform: {
        translateX: Animated.AnimatedInterpolation;
    }[];
    width: number;
}[];
export declare const getAddonPanelPosition: (animatedValue: Animated.Value, previewWidth: number) => {
    transform: {
        translateX: Animated.AnimatedInterpolation;
    }[];
    width: number;
}[];
export declare const getPreviewPosition: (animatedValue: Animated.Value, previewWidth: number, previewHeight: number, slideBetweenAnimation: boolean) => {
    transform: ({
        translateX: Animated.AnimatedInterpolation;
        translateY?: undefined;
    } | {
        translateY: Animated.AnimatedInterpolation;
        translateX?: undefined;
    })[];
};
export declare const getPreviewScale: (animatedValue: Animated.Value, slideBetweenAnimation: boolean) => {
    transform: {
        scale: Animated.AnimatedInterpolation;
    }[];
};
