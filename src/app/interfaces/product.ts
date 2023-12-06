export interface CartDataRes {
    id: string,
    productId: string,
    quantity: number,
    userId: string,
    createdAt: string,
    updatedAt: string,
    Product: ProductData
}
 
export interface ProductData {
    id: string,
    productId: number,
    productSku: string,
    category: string,
    productName: string,
    productPrice: number,
    productDescription: string,
    createdDate: string,
    deliveryTimeSpan: number,
    categoryId: number,
    productImageUrl:string
    createdAt: string,
    updatedAt: string
}