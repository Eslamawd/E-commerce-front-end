
import { useCreatCartMutation } from '../../../featuers/cart/cartSlice'


const BuyrProdact = ({ user, prodact }) => {

 
    


    const [createCart, {
        isLoading,
        isSuccess,
        isError,
        error

    }] = useCreatCartMutation()


    console.log(user)
    console.log(prodact)

const handleSubmit = async(e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    formData.append("prodact", `${prodact._id}`)
    formData.append("Buyer", `${user}`)

    try {
        console.log(formData)
        await createCart(formData).unwrap()
        alert("Product created successfully!")
    
    } catch (error) {
        console.error('Failed to create product:', error)
    }

}


let content = (

    <div className="home">

        <div className='buyer'>
            <form onSubmit={handleSubmit}>

                <input 
                type="text"
                name='location'
                placeholder='Location'
                 />

                 <button type='submit'>
                    Up to Cart Now

                 </button>

            </form>

        </div>

   </div>
  )



 

  return content;


}

export default BuyrProdact