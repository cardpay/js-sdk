export type Urls = {
    generateMobileToken: string;
};
export type FormProps<T> = {
    urls: Urls;
    data: T;
};
