import { itemCard, Data } from '../types/types';
import { DrawResultAmount } from './drawResultAmount';

export class Draw {
    drawResultAmount: DrawResultAmount;
    constructor() {
        this.drawResultAmount = new DrawResultAmount();
    }

    async draw(data: Data) {
        this.drawResultAmount.drawResultAmount(data.length);

        const fragment = document.createDocumentFragment();
        const itemTemplate = document.querySelector<HTMLTemplateElement>('.content__item-template');
        const itemsContainer = document.querySelector<HTMLElement>('.content__items');

        data.forEach((item: itemCard) => {
            const itemClone = itemTemplate?.content.cloneNode(true) as HTMLElement;
            const itemCard = itemClone.querySelector<HTMLElement>('.content__item');
            const itemTitle = itemClone.querySelector<HTMLElement>('.content__item-title');
            const itemColor = itemClone.querySelector<HTMLElement>('.content__item-color-value');
            const itemCountry = itemClone.querySelector<HTMLElement>('.content__item-country-value');
            const itemIMG = itemClone.querySelector<HTMLElement>('.content__item-img');
            const itemPrice = itemClone.querySelector<HTMLElement>('.content__item-cart-price-value');
            if (itemPrice) {
                if (!item.typeOfFlowers) {
                    itemPrice.textContent = 'Call for a price';
                }
                if (item.typeOfFlowers === 'Roses') {
                    itemPrice.textContent = `${+item.numberOfFlowers * 2}`;
                }
                if (item.typeOfFlowers === 'Chrysanthemums') {
                    itemPrice.textContent = `${+item.numberOfFlowers * 1.5}`;
                }
                if (item.typeOfFlowers === 'Lilies') {
                    itemPrice.textContent = `${+item.numberOfFlowers * 3}`;
                }
                if (item.typeOfFlowers === 'Peonies') {
                    itemPrice.textContent = `${+item.numberOfFlowers * 2.5}`;
                }
                if (item.typeOfFlowers === 'Tulips') {
                    itemPrice.textContent = `${+item.numberOfFlowers}`;
                }
                if (item.typeOfFlowers === 'Orchids') {
                    itemPrice.textContent = `${+item.numberOfFlowers * 2.5}`;
                }
                if (item.typeOfFlowers === 'Carnations') {
                    itemPrice.textContent = `${+item.numberOfFlowers}`;
                }
            }
            itemCard?.setAttribute('data-type', item.typeOfFlowers);
            itemCard?.setAttribute('data-color', item.color);
            itemCard?.setAttribute('data-id', item.name);
            if (itemTitle) {
                itemTitle.textContent = item.name;
            }
            if (itemColor) {
                itemColor.textContent = item.color;
            }
            if (itemCountry) itemCountry.textContent = item.packaging;
            itemIMG?.setAttribute('src', item.img);

            fragment.append(itemClone);
        });

        if (itemsContainer) itemsContainer.innerHTML = '';
        itemsContainer?.append(fragment);
    }
}
