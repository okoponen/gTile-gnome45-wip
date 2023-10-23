

type PangoXft10 = typeof import('./pangoxft-1.0.js').default;

declare global {
    export interface GjsGiImports {
        PangoXft: PangoXft10;
    }
}

export default GjsGiImports;


