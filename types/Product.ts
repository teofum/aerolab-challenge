interface Product {
  img: {
    url: string,
    hdUrl: string
  },
  _id: string,
  name: string,
  cost: number,
  category: string
}

export default Product;