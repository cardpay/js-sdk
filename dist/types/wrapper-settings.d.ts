import { Environment } from './environment';
/**
 * Setting for js-sdk wrapper
 */
export type WrapperSettings = {
    /**
     * Dom element for mounting js-sdk
     *
     * @example Getting element
     *
     * #### HTML layout
     * ```html
     * <div id="js-sdk-element"></div>
     * ```
     *
     * #### Script
     * ```js
     * const element = document.getElementById('js-sdk-element');
     * ```
     */
    element: HTMLElement;
    /**
     * The environment in which the js-sdk runs. There are only two options: "sandbox", "production". By default "production"
     * The sandbox environment is designed to emulate the work of the js-sdk and the js-sdk embedding stage
     */
    environment?: `${Environment}`;
    /**
     * A callback function that will be called if a message arrives from an iframe
     *
     * @param message - the data that came from the iframe
     * @returns void
     */
    callback?: (message: unknown) => void;
};
