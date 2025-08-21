import { CardFormSettings } from './types/settings/card-form-settings';
import { CardSavingFormSettings } from './types/settings/card-saving-settings';
import { PayFormSettings } from './types/settings/pay-form-settings';
import { PayTokenFormSettings } from './types/settings/pay-token-form-settings';
type Settings = CardFormSettings | PayFormSettings | PayTokenFormSettings | CardSavingFormSettings;
type Result = {
    /**
     * Destroys the js-sdk by removing the iframe and event listeners.
     * @returns Promise<void> - Promise that resolves when the js-sdk is destroyed.
     */
    destroy: () => Promise<void>;
    /**
     * Submits the form in the iframe.
     * @return void - No return value, the form is submitted to the iframe.
     */
    submit: () => void;
};
export declare function iframeExist(id: string): boolean;
/**
 * The function allows you to embed an element into the DOM tree that will display an iframe with the required payment form
 * @param settings - Parameters with settings for displaying the form
 * @returns object with result, contains destroy callback for destroying js-sdk
 */
export declare function loadJsSdk(settings: Settings): Promise<Result>;
export { CardFormSettings, CardSavingFormSettings, PayFormSettings, PayTokenFormSettings };
export default loadJsSdk;
