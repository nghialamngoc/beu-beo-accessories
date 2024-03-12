export interface IProduct extends IProductInfo {
  sku: string
  parentSKU?: string
  title?: string
  collection: string
  quantity: number
  prices: IProductPrice
  imageUrl?: string
  imageUrls?: string[]
}

export interface IProductInfo {
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
