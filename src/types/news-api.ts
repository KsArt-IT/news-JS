export interface SourcesResponse {
    status: string;
    sources: Source[];
}

export interface Source {
    id: string;
    name: string;
    description: Nullable<string>;
    url: string;
    category: Category;
    language: string;
    country: string;
}

export interface EverythingResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface Article {
    source: SourceArticle;
    author: Nullable<string>;
    title: string;
    description: Nullable<string>;
    url: string;
    urlToImage: Nullable<string>;
    publishedAt: string;
    content: Nullable<string>;
}

export interface SourceArticle {
    id: Nullable<string>;
    name: string;
}

export type Category = 'general' | 'business' | 'technology' | 'sports' | 'entertainment' | 'health' | 'science';

export type Nullable<T> = T | null;

export interface Options {
    apiKey: string;
    sources: string;
}
export type RequestOptions = Partial<Options>;
export type ApiOptions = Pick<Options, 'apiKey'>;

export enum ApiMethod {
    Get = 'GET',
    Post = 'POST',
}

export enum HttpStatus {
    Unauthorized = 401,
    NotFound = 404,
}

export enum ApiEndpoint {
    Sources = 'sources',
    Everything = 'everything',
}
