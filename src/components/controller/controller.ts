import type { EverythingResponse, SourcesResponse } from '../../types/news-api';
import { ApiEndpoint } from '../../types/news-api';
import { getTypeOrNull } from '../../utils/dom';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources(callback: (data: SourcesResponse) => void): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: ApiEndpoint.Sources,
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: (data: EverythingResponse) => void): void {
        let target: HTMLElement | null = getTypeOrNull(e.target, HTMLElement);
        const newsContainer: HTMLElement | null = getTypeOrNull(e.currentTarget, HTMLElement);
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
