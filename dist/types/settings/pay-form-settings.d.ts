import { PayFormCustomClasses, PayFormCustomStyles, PayFormCustomTexts } from '../customization';
import { PayFormData } from '../data/pay-form.data';
import { Form } from '../form.enum';
import { FormProps } from '../form-props';
import { WrapperSettings } from '../wrapper-settings';
export type PayFormSettings = WrapperSettings & {
    form: `${Form.Pay}`;
    props: FormProps<PayFormData> & {
        customTexts?: PayFormCustomTexts;
        customStyles?: PayFormCustomStyles;
        customClasses?: PayFormCustomClasses;
    };
};
