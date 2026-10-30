import type { EverythingResponse, SourcesResponse } from '../../types/news-api';
import { getTypeOrNull } from '../../utils/dom';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const container: HTMLElement | null = getTypeOrNull(document.querySelector('.sources'), HTMLElement);
        if (!container) throw new Error('Error: news sources not found');

        container.addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews(e, (data: EverythingResponse) => this.view.drawNews(data))
        );
        this.controller.getSources((data: SourcesResponse) => this.view.drawSources(data));
    }
}

export default App;
