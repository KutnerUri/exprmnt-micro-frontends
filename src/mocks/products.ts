import { Product } from "../entities/product";

const product1: Product = { id: "1", name: "Laptop", price: 1000 };
const product2: Product = { id: "2", name: "Smartphone", price: 800 };
const product3: Product = { id: "3", name: "Headphones", price: 150 };
const product4: Product = { id: "4", name: "Keyboard", price: 80 };
const product5: Product = { id: "5", name: "Mouse", price: 40 };
const product6: Product = { id: "6", name: "Monitor", price: 200 };
const product7: Product = { id: "7", name: "USB Drive", price: 20 };
const product8: Product = { id: "8", name: "Webcam", price: 50 };
const product9: Product = { id: "9", name: "Speaker", price: 100 };
const product10: Product = {
  id: "10",
  name: "External Hard Drive",
  price: 120,
};

export const mocked_searchResults: Product[] = [
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
  product7,
  product8,
  product9,
  product10,
];

export const mocked_cartItems: Product[] = [product1, product4, product8];
