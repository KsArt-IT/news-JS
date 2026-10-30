import type { EverythingResponse, SourcesResponse } from '../../types/news-api';
import { ApiEndpoint } from '../../types/news-api';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    private static getHTMLElement(element: EventTarget | null): HTMLElement | null {
        return element instanceof HTMLElement ? element : null;
    }

    public getSources(callback: (data: SourcesResponse) => void): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: ApiEndpoint.Sources,
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: (data: EverythingResponse) => void): void {
        let target: HTMLElement | null = AppController.getHTMLElement(e.target);
        const newsContainer: HTMLElement | null = AppController.getHTMLElement(e.currentTarget);
        if (newsContainer === null) return;

        while (target !== null && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<EverythingResponse>(
                        {
                            endpoint: ApiEndpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;
