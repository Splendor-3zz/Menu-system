export interface ICate{
    id: string
    title: string
    imageUrl: string
    createdAt?: Date
}
export interface IItem{
    id: string
    title: string
    imageUrl: string
    slug?: string
    price: number
    createdAt?: Date
    categoryId?: string
}