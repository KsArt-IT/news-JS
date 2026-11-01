import type { ApiOptions, RequestOptions } from '../../types/news-api';
import { ApiMethod, HttpStatus } from '../../types/news-api';

class Loader {
    private baseLink: string;
    private options: ApiOptions;

    constructor(baseLink: string, options: ApiOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: { endpoint: string; options?: RequestOptions },
        callback: (data: T) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>(ApiMethod.Get, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === HttpStatus.Unauthorized || res.status === HttpStatus.NotFound) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions: RequestOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.entries(urlOptions).forEach(([key, value]) => {
            url += `${key}=${value}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: ApiMethod,
        endpoint: string,
        callback: (data: T) => void,
        options: RequestOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response) => this.errorHandler(res))
            .then((res: Response) => res.json())
            .then((data: T) => callback(data))
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
