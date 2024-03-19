import { PayBySavedCardFormCustomClasses, PayBySavedCardFormCustomStyles, PayBySavedCardFormCustomTexts } from '../customization';
import { PayTokenData } from '../data/pay-token.data';
import { Form } from '../form.enum';
import { FormProps } from '../form-props';
import { WrapperSettings } from '../wrapper-settings';
export type PayTokenFormSettings = WrapperSettings & {
    form: `${Form.Token}`;
    props: FormProps<PayTokenData> & {
        customTexts?: PayBySavedCardFormCustomTexts;
        customStyles?: PayBySavedCardFormCustomStyles;
        customClasses?: PayBySavedCardFormCustomClasses;
    };
};
