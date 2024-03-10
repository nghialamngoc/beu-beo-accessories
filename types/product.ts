export interface IProduct {
  sku: string
  parentSKU?: string
  title?: string
  collection: string
  size?: string
  material?: string
}

export interface IProductPrice {
  initialPrice: number
  discountPrice?: number
  flashSalePrice?: number
}

export interface IProductImage {
  sku: string
  imageUrl: string
  target?: string
}

export interface IProductCollectionType {
  title: string
  slug: string
}
