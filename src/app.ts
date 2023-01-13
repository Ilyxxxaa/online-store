import { Draw } from './components/draw/dataDraw';
import { Loader } from './components/loader/loader';
import { Filter } from './components/filters/filter';
import { Sorter } from './components/sorter/sorter';
import { Search } from './components/search/search';

import './styles/style.scss';
import 'simplebar';
import 'simplebar/dist/simplebar.css';
import { Cart } from './components/cart/cart';

class App {
    draw: Draw;
    loader: Loader;
    filter: Filter;
    sorter: Sorter;
    search: Search;
    cart: Cart;
    constructor() {
        this.filter = new Filter();
        this.draw = new Draw();
        this.loader = new Loader('assets/data/data.json');
        this.sorter = new Sorter();
        this.search = new Search();
        this.cart = new Cart();
    }

    async initialize() {
        alert('Самооценка в консоли');
        console.log(`%cOnline-store-task`, 'font-weight: bold; font-size: 18px');
        console.log(` Selftest: \n https://iodized-paw-06e.notion.site/Online-store-RS-School-Task-e806c001238044e885746f7771becd12\n\n`);

        const data = await this.loader.load();
        await this.draw.draw(data);
        await this.filter.start();
        await this.addListeners();
        await this.cart.addListenerToRemoveItem();
    }

    async render() {
        const data = await this.loader.load();
        const filtredData = await this.filter.filter(data);
        const searchedData = await this.search.searchItems(filtredData);
        const sortedData = await this.sorter.sort(searchedData);
        await this.draw.draw(sortedData);
        await this.cart.drawCart();
    }

    async addListeners() {
        this.filter.filterByType.flowerFilterButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                this.render();
            });
        });
        this.filter.filterByPrice.priceFilterSlider.noUiSlider?.on('update', () => {
            this.render();
        });
        this.filter.filterByAmount.amountFilterSlider.noUiSlider?.on('update', () => {
            this.render();
        });
        this.filter.filterByColor.colorFilterButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                this.render();
            });
        });
        this.filter.filterByPackaging.packagingFilter?.addEventListener('click', () => this.render());
        this.filter.filterByPopular.popularCheckbox?.addEventListener('click', () => this.render());
        this.filter.resetFilters.resetBtn?.addEventListener('click', () => this.render());
        this.sorter.sortSelect.addEventListener('change', () => this.render());
        this.search.searchInput.addEventListener('input', () => this.render());
        this.search.clearSearchBtn.addEventListener('click', () => {
            this.search.searchInput.value = '';
            this.render();
        });
    }
}

const app = new App();
app.initialize();
