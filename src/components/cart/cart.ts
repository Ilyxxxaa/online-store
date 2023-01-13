export class Cart {
    cartContentList: HTMLElement;
    cartQuantuty: HTMLElement;
    cartFullPrice: HTMLElement;
    price: number;
    cart: HTMLElement;
    constructor() {
        this.cart = document.querySelector<HTMLElement>('.header__cart') as HTMLElement;
        this.cartContentList = document.querySelector('.cart__content-list') as HTMLElement;
        this.cartQuantuty = document.querySelector('.header__cart-quantity') as HTMLElement;
        this.cartFullPrice = document.querySelector('.cart__total-price-value') as HTMLElement;
        this.price = 0;
    }

    async drawCart() {
        const contentItemBtns = document.querySelectorAll('.content__item-cart-btn');
        contentItemBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const self = <HTMLElement>e.currentTarget;
                const parent = self?.closest('.content__item');
                const img = parent?.querySelector('.content__item-img')?.getAttribute('src');
                const name = parent?.querySelector('.content__item-title')?.textContent;
                const data = parent?.getAttribute('data-id');
                const price = parent?.querySelector('.content__item-cart-price-value')?.textContent;
                if (price && img && name && data) {
                    this.plusFullPrice(price);
                    this.printFullPrice();
                    this.cartContentList.insertAdjacentHTML('afterbegin', this.generateCartItem(img, name, price, data));
                    this.printQuantity();
                }
                this.disableBtn(btn as HTMLButtonElement);
            });
        });
    }

    async addListenerToRemoveItem() {
        this.cartContentList.addEventListener('click', (e) => {
            const target = <HTMLElement>e.target;
            if (target.classList.contains('cart__item-delete')) {
                const cartItem = target.closest<HTMLElement>('.cart__item');
                if (cartItem) {
                    this.removeItem(cartItem);
                }
            }
        });
    }

    plusFullPrice(fullPrice: string) {
        return (this.price += +fullPrice);
    }
    minusFullPrice(fullPrice: string) {
        return (this.price -= +fullPrice);
    }
    printFullPrice() {
        this.cartFullPrice.textContent = `${this.price} $`;
    }
    printQuantity() {
        const quantity = this.cartContentList.children.length;
        this.cartQuantuty.textContent = `${quantity}`;
        if (quantity > 0) {
            this.cart.classList.add('active');
        } else this.cart.classList.remove('active');

        if (quantity > 20) {
            alert('Sorry, all slots are full');
        }
    }
    disableBtn(btn: HTMLButtonElement) {
        btn.classList.add('content__item-cart-btn--active');
        btn.textContent = 'Already in Сart';
        btn.disabled = true;
    }
    enableBtn(btn: HTMLButtonElement) {
        btn.classList.remove('content__item-cart-btn--active');
        btn.textContent = 'Add to Cart';
        btn.disabled = false;
    }

    removeItem(item: HTMLElement) {
        const id = item.getAttribute('data-name');
        const contentItem = document.querySelector<HTMLElement>(`.content__item[data-id="${id}"]`);
        const btn = contentItem?.querySelector<HTMLButtonElement>('.content__item-cart-btn');
        const currentPrice = item.querySelector<HTMLElement>('.cart__item-price-value')?.textContent ?? '';
        if (btn) {
            this.enableBtn(btn);
        }
        this.minusFullPrice(currentPrice);
        this.printFullPrice();
        item.remove();
        this.printQuantity();
    }

    private generateCartItem(img: string, name: string, price: string, data: string) {
        return `<li class="cart__item" data-name = "${data}">
        <div class="cart__item-image">
            <img class="cart__item-img" src="${img}"
                alt="">
        </div>
        <div class="cart__item-info">
            <div class="cart__item-title">${name}</div>

            <div class="cart__item-price"><span class = "cart__item-price-value">${price}</span> $</div>
        </div>
        <button class="cart__item-delete"></button>
    </li>`;
    }
}
