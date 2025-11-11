export interface ICate{
    id: string
    title: string
    imageUrl: string
}
export interface IItem{
    id: string
    title: string
    imageUrl: string
    price: number
    categoryId: string

}
export interface ICart{
    id: string
    quantity: number
}