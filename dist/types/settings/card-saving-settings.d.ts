import { CardSavingFormCustomTexts, CardSavingFormCustomStyles, CardSavingFormCustomClasses } from '../customization';
import { Settings } from '../data/common.data';
import { FormProps } from '../form-props';
import { Form } from '../form.enum';
import { WrapperSettings } from '../wrapper-settings';
export type CardSavingFormSettings = WrapperSettings & {
    form: `${Form.CardSaving}`;
    props: Omit<FormProps<{}, Settings>, 'data'> & {
        customTexts?: CardSavingFormCustomTexts;
        customStyles?: CardSavingFormCustomStyles;
        customClasses?: CardSavingFormCustomClasses;
    };
};
