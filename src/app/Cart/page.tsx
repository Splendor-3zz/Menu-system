import { Heading1 } from "lucide-react"
import { cartItemsAction, getCategoriesAction, getCurrentUserAction, getItemsAction } from "../../../action/action"
import Link from "next/link"
import Header from "@/components/Header"
import { Role } from "@prisma/client"
import { EditFormCate } from "@/components/EditFormCate"
import DeleteButton from "@/components/DeleteButton"
import EditCart from "@/components/EditCart"


const page = async () => {
      
    const carts = await cartItemsAction()
    const totalPrice = carts.reduce((sum, cart) => sum + cart.price * cart.quantity, 0);
    return(
        <div>
            <Header/>
            <div className="flex flex-col justify-center mx-10  content-center items-center border-2 border-gray-500 mb-5">
            <div>
                {!carts.length ? <h1>your cart is empty</h1> : carts.map((cart) => (
                    <div
              key={cart.id}
              className="flex justify-center m-5 contain-content border-2 border-gray-500 h-40  hover:mask-y-from-45"
            >
              <div>
                <img
                  src={`${cart.imageUrl}`}
                  alt={"food"}
                  width={300}
                  height={300}
                />
              </div>

              <div className="p-5 space-x-3 space-y-2 w-75">
                <div className="flex justify-center text-2xl px-2">
                    
                    {cart.title}
                </div>
                <div className="flex justify-between px-2">
                    <div>
                        quantity: {cart.quantity}
                    </div>
                    <div>
                        price: {cart.price * cart.quantity}$
                    </div>
                </div>
                <div className="flex justify-around">
                    <EditCart id={cart.id} />
                    <DeleteButton cate={cart} />
                </div>
              </div>
            </div>
            
                ))}
                <div className="flex justify-center">
                    <button className="my-5 cursor-pointer bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded">
                    Buy {totalPrice}$
                </button>
                </div>
                
            </div>
        </div>
        </div>
    )
}

export default page