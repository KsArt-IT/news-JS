import type { Article } from '../../../types/news-api';
import { getTypeOrNull } from '../../../utils/dom';
import './news.css';

class News {
    public draw(data: Article[]): void {
        const container: HTMLElement | null = getTypeOrNull(document.querySelector('.news'), HTMLElement);
        const newsItemTemp: HTMLTemplateElement | null = getTypeOrNull(
            document.querySelector('#newsItemTemp'),
            HTMLTemplateElement
        );
        if (container === null || newsItemTemp === null) return;

        if (data.length === 0) {
            const message: HTMLElement = document.createElement('div');
            message.classList.add('news__empty');
            message.textContent = 'No news for this source yet. Try another one.';
            container.replaceChildren(message);
            return;
        }

        const news: Article[] = data.slice(0, 10);

        const fragment: DocumentFragment = document.createDocumentFragment();

        news.forEach((item: Article, idx: number) => {
            const newsClone: DocumentFragment | null = getTypeOrNull(
                newsItemTemp.content.cloneNode(true),
                DocumentFragment
            );
            if (newsClone === null) return;

            if (idx % 2) {
                this.updateElement(newsClone, '.news__item', (element) => element.classList.add('alt'));
            }
            this.updateElement(
                newsClone,
                '.news__meta-photo',
                (element) => (element.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`)
            );
            this.updateElement(
                newsClone,
                '.news__meta-author',
                (element) => (element.textContent = item.author || item.source.name)
            );
            this.updateElement(
                newsClone,
                '.news__meta-date',
                (element) => (element.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-'))
            );
            this.updateElement(newsClone, '.news__description-title', (element) => (element.textContent = item.title));
            this.updateElement(
                newsClone,
                '.news__description-source',
                (element) => (element.textContent = item.source.name)
            );
            this.updateElement(
                newsClone,
                '.news__description-content',
                (element) => (element.textContent = item.description)
            );
            this.updateElement(newsClone, '.news__read-more a', (element) => element.setAttribute('href', item.url));

            fragment.append(newsClone);
        });

        container.replaceChildren(fragment);
    }

    private updateElement(root: DocumentFragment, selector: string, update: (element: HTMLElement) => void): void {
        const element: HTMLElement | null = getTypeOrNull(root.querySelector(selector), HTMLElement);
        if (element === null) return;
        update(element);
    }
}

export default News;
