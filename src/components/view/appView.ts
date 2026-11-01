import type { Article, EverythingResponse, Source, SourcesResponse } from '../../types/news-api';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: EverythingResponse): void {
        const values: Article[] = data.articles;
        this.news.draw(values);
    }

    public drawSources(data: SourcesResponse): void {
        const values: Source[] = data.sources;
        this.sources.draw(values);
    }

    public setActiveSource(sourceId: string): void {
        this.sources.setActive(sourceId);
    }
}

export default AppView;
