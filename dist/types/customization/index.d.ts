export type CardFormCustomTexts = {
    title?: string;
    'card-number.label'?: string;
    'expiry-date.label'?: string;
    'cvv2-cvc2.label'?: string;
    submit?: string;
};
export type PayFormCustomTexts = {
    total?: string;
    order?: string;
    'card-number.label'?: string;
    'expiry-date.label'?: string;
    'cvv2-cvc2.label'?: string;
    'save-card.label'?: string;
    submit?: string;
};
export type PayBySavedCardFormCustomTexts = {
    total?: string;
    order?: string;
    'card-number.label'?: string;
    'cvv2-cvc2.label'?: string;
    submit?: string;
};
export type StyleDeclarations = {
    [key: string]: string;
};
export type BaseFormCustomStyles = Partial<{
    $textInput: Partial<{
        container: StyleDeclarations;
        control: StyleDeclarations;
        rightSlot: StyleDeclarations;
        label: StyleDeclarations;
        input: StyleDeclarations;
        error: StyleDeclarations;
    }>;
    $checkbox?: Partial<{
        container: StyleDeclarations;
        label: StyleDeclarations;
    }>;
    $button: Partial<{
        container: StyleDeclarations;
        button: StyleDeclarations;
    }>;
    $loader: Partial<{
        container: StyleDeclarations;
        block: StyleDeclarations;
        spinner: StyleDeclarations;
        text: StyleDeclarations;
    }>;
    $footer: Partial<{
        container: StyleDeclarations;
    }>;
}>;
export type CardFormCustomStyles = BaseFormCustomStyles & {
    $cardForm: Partial<{
        container: StyleDeclarations;
        body: StyleDeclarations;
        title: StyleDeclarations;
        textInput: StyleDeclarations;
        submit: StyleDeclarations;
        footer: StyleDeclarations;
    }>;
};
export type PayFormCustomStyles = BaseFormCustomStyles & {
    $payForm: Partial<{
        container: StyleDeclarations;
        body: StyleDeclarations;
        title: StyleDeclarations;
        total: StyleDeclarations;
        order: StyleDeclarations;
        textInput: StyleDeclarations;
        checkbox: StyleDeclarations;
        submit: StyleDeclarations;
        footer: StyleDeclarations;
    }>;
};
export type PayBySavedCardFormCustomStyles = BaseFormCustomStyles & {
    $payBySavedCard: Partial<{
        container: StyleDeclarations;
        body: StyleDeclarations;
        title: StyleDeclarations;
        total: StyleDeclarations;
        order: StyleDeclarations;
        textInput: StyleDeclarations;
        submit: StyleDeclarations;
        footer: StyleDeclarations;
    }>;
};
export type BaseFormCustomClasses = Partial<{
    $textInput: Partial<{
        container: string;
        control: string;
        rightSlot: string;
        label: string;
        input: string;
        error: string;
    }>;
    $checkbox?: Partial<{
        container: string;
        label: string;
    }>;
    $button: Partial<{
        container: string;
        button: string;
    }>;
    $loader: Partial<{
        container: string;
        block: string;
        spinner: string;
        text: string;
    }>;
    $footer: Partial<{
        container: string;
    }>;
}>;
export type CardFormCustomClasses = BaseFormCustomClasses & {
    $cardForm: Partial<{
        container: string;
        body: string;
        title: string;
        textInput: string;
        cardInput: string;
        dateInput: string;
        cvvInput: string;
        submit: string;
        footer: string;
    }>;
};
export type PayFormCustomClasses = BaseFormCustomStyles & {
    $payForm: Partial<{
        container: string;
        body: string;
        title: string;
        total: string;
        order: string;
        textInput: string;
        cardInput: string;
        dateInput: string;
        cvvInput: string;
        checkbox: string;
        submit: string;
        footer: string;
    }>;
};
export type PayBySavedCardFormCustomClasses = BaseFormCustomStyles & {
    $payBySavedCardForm: Partial<{
        container: string;
        body: string;
        title: string;
        total: string;
        order: string;
        textInput: string;
        cardInput: string;
        cvvInput: string;
        submit: string;
        footer: string;
    }>;
};
