import webpack from 'webpack';
export declare function storybookDevServer(options: any): Promise<{
    address: string;
    networkAddress: string;
    managerStats?: webpack.Stats;
    managerTotalTime?: [number, number];
    previewStats?: webpack.Stats;
    previewTotalTime?: [number, number];
}>;
