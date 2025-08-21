import { CardFormCustomClasses, CardFormCustomStyles, CardFormCustomTexts } from '../customization';
import { CardFormData } from '../data/card-form.data';
import { Form } from '../form.enum';
import { FormProps } from '../form-props';
import { WrapperSettings } from '../wrapper-settings';
import { Settings } from '../data/common.data';
export type CardFormSettings = WrapperSettings & {
    form: `${Form.Card}`;
    props: FormProps<CardFormData, Settings> & {
        customTexts?: CardFormCustomTexts;
        customStyles?: CardFormCustomStyles;
        customClasses?: CardFormCustomClasses;
    };
};
