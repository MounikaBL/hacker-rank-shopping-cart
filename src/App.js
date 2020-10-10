import React, { Component } from 'react';
import './App.css';
import 'h8k-components';
import ProductList from "./components/product-list";
import Cart from "./components/cart";

const title = "HackerShop";

class App extends Component {
    constructor() {
        super();
        const products = [...PRODUCTS].map((product, index) => {
            product.id = index + 1;
            product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
            product.cartQuantity = 0;
            return product;
        });
        this.state = {
            cart: {
                items: []
            },
            products
        }
    }

    addToCart = (product, index) => {
        let items = [...this.state.cart.items];
        let products = [...this.state.products];
        products = products.map((prod, pIndex) => {
            return prod.id === product.id ? {
                ...prod,
                cartQuantity: prod.cartQuantity === 0 ? prod.cartQuantity + 1 : prod.cartQuantity
            } : prod;
        });
        if (product.cartQuantity === 0) {
            items.push({
                item: product.name,
                quantity: product.cartQuantity + 1,
                id: product.id
            })
        }
        this.setState({
            cart: {
                items: items
            },
            products
        });
    }

    addOrDeleteItems = (product, action) => {
        let items = [...this.state.cart.items];
        let products = [...this.state.products];
        products = products.map((prod) => {
            return prod.id === product.id ? {
                ...prod,
                cartQuantity: prod.cartQuantity > 0 ? (action === "-" ? prod.cartQuantity - 1 : prod.cartQuantity + 1) : prod.cartQuantity
            } : prod;
        });

        items = items.map((item) => {
            return item.id === product.id ? {
                ...item,
                quantity: item.quantity > 0 ? (action === "-" ? item.quantity - 1 : item.quantity + 1) : item.quantity
            } : item;
        }).filter(item => item.quantity);

        this.setState({
            cart: {
                items: items
            },
            products
        });
    }

    render() {
        return (
            <div>
                <h8k-navbar header={title}></h8k-navbar>
                <div className="layout-row shop-component">
                    <ProductList products={this.state.products}
                        addToCart={this.addToCart}
                        addOrDeleteItems={this.addOrDeleteItems}
                    />
                    <Cart cart={this.state.cart} />
                </div>
            </div>
        );
    }
}

export const PRODUCTS = [
    {
        name: "Cap",
        price: 5
    },
    {
        name: "HandBag",
        price: 30
    },
    {
        name: "Shirt",
        price: 35
    },
    {
        name: "Shoe",
        price: 50
    },
    {
        name: "Pant",
        price: 35
    },
    {
        name: "Slipper",
        price: 25
    }
];
export default App;
