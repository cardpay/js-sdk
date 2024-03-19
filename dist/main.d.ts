import { CardFormSettings } from './types/settings/card-form-settings';
import { PayFormSettings } from './types/settings/pay-form-settings';
import { PayTokenFormSettings } from './types/settings/pay-token-form-settings';
type Settings = CardFormSettings | PayFormSettings | PayTokenFormSettings;
type Result = {
    destroy: () => Promise<void>;
};
export declare function iframeExist(id: string): boolean;
/**
 * The function allows you to embed an element into the DOM tree that will display an iframe with the required payment form
 * @param settings - Parameters with settings for displaying the form
 * @returns object with result, contains destroy callback for destroying js-sdk
 */
export declare function loadJsSdk(settings: Settings): Promise<Result>;
export {};
