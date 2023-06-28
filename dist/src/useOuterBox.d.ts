/**
 * Create outer border box for given target html element.
 * @param options
 * options.target: wrapped html element.
 * options.boxWidth: wrapped box width.
 * options.boxStyle: wrapped box style (solid, dashed and other border style css property).
 * options.boxColor: wrapped box color.
 * @returns
 */
export declare function useOuterBox(options?: UseOuterBoxOptions): {
    outerBox: HTMLElement;
    update: () => void;
    setTarget: (newTarget?: HTMLElement) => void;
};
export interface UseOuterBoxOptions {
    target?: HTMLElement;
    boxWidth?: number;
    boxStyle?: string;
    boxColor?: string;
}
