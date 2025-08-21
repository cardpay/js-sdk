export type Urls = {
    generateMobileToken: string;
};
export type FormProps<T, S> = {
    urls: Urls;
    data: T;
    styles: Record<string, unknown>;
    settings?: S;
};
