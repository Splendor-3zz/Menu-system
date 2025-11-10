import { cartItemsAction } from "../../action/action"

const CartLength = async () => {
     const carts = await cartItemsAction()
            const cartsLength = carts.length
        return(
            <div className="text-red-500 pl-1">
                {cartsLength === 0 ? null : cartsLength}
            </div>
            )
}

export default CartLength