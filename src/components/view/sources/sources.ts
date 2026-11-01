import type { SourceItem } from '../../../types/news-api';
import { getTypeOrNull } from '../../../utils/dom';
import './sources.css';

class Sources {
    public draw(data: SourceItem[]): void {
        const container: HTMLElement | null = getTypeOrNull(document.querySelector('.sources'), HTMLElement);
        const sourceItemTemp: HTMLTemplateElement | null = getTypeOrNull(
            document.querySelector('#sourceItemTemp'),
            HTMLTemplateElement
        );
        if (container === null || sourceItemTemp === null) return;

        const fragment: DocumentFragment = document.createDocumentFragment();

        data.forEach((item: SourceItem) => {
            const sourceClone: DocumentFragment | null = getTypeOrNull(
                sourceItemTemp.content.cloneNode(true),
                DocumentFragment
            );
            if (sourceClone === null) return;

            const sourceItemName: HTMLElement | null = getTypeOrNull(
                sourceClone.querySelector('.source__item-name'),
                HTMLElement
            );
            const sourceItem: HTMLElement | null = getTypeOrNull(
                sourceClone.querySelector('.source__item'),
                HTMLElement
            );
            if (sourceItem === null || sourceItemName === null) return;

            sourceItemName.textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        container.append(fragment);
    }

    public setActive(sourceId: string): void {
        document.querySelectorAll<HTMLElement>('.source__item').forEach((item: HTMLElement) => {
            const isActive: boolean = item.dataset.sourceId === sourceId;
            item.classList.toggle('source__item-active', isActive);
            item.setAttribute('aria-pressed', String(isActive));
        });
    }
}

export default Sources;
