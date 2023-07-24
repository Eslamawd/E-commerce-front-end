
import { useGetCartQuery } from '../../../featuers/cart/cartSlice'




const CartLest = ({ Byuer }) => {


    const { data: cart,
        isLoading,
        isSuccess,
        isError
     } = useGetCartQuery(Byuer)

         let contant

         if (isLoading){
            contant = (
                <>
                <div>
                    Pleace await...
                </div>
                </>
            )
         }
         else if (isError) {
            contant = (
                <>
                <div>
                    <h1>
                        Error
                    </h1>
                </div>
                </>
            )
         }
         else if (isSuccess){
            contant = (
                <>
                <div className='home'>
                    <span>{cart}</span>
                </div>
                </>
            )
         }
 
console.log(cart)
    return contant
}


export default CartLest