import React from 'react'
import { 
  useGetProdactQuery,
} from '../../featuers/prodacts/prodactSlice'
import './Prodact.css'

const Porodact = ({ props }) => {
  const { pro } = props.location.state;

  console.log(pro)

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetProdactQuery()


  if(isLoading) {

 <p>pleace Wait...</p>
  } else if (isSuccess) {
 Promise.all(data.map((pro) => {

      return (
        <div className="prodacttt" key={pro.id}>
            <img src="" alt="" />
            <div>
                <h1>{pro.name}</h1>
                <h5>{pro.price} $</h5>
            </div>
            <hr />
            <p>
                {pro.title}
            </p>

            <button className='button'>
              BUY NOW
        </button>
      
        </div>
      )

        
    }))
  } else if (isError) {
  <p>{error}</p>
  }

 
}

export default Porodact