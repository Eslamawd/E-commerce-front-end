import { useNavigate } from 'react-router-dom'
import { memo } from 'react'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectProdactById } from '../../../featuers/prodacts/prodactSlice'









const Prodact = ({ prodactId }) => {

  const prodact = useSelector(state => selectProdactById(state, prodactId))


    const navigate = useNavigate()


    if (prodact) {
 
        const handleBuy = () => navigate(`${prodactId}`)

        return (
      
          
          
              <div>
            <h4>{prodact.name}</h4>
                <img src={prodact.image} alt="" />
                <div>
                        <h4>{prodact.name}</h4>
                      <p>
                    <span>{prodact.price}$</span>
                    <hr />
                      {prodact.title.slice(0, 30)}
                    </p>
          
                </div>
                <button className="button"
                  onClick={handleBuy}
                  >
                  BUY
                  </button>
        
                </div>      
          
          
        )
        

    } 
}

const memoizedProdact = memo(Prodact)

export default memoizedProdact 


//* <div className="home">
  //    <div className="prodact" >
    /*   {filteredIds.map((pro) => (
        <div key={pro._id}>
      <h4>{pro.name}</h4>
          <img src="" alt="" />
          <div>
                  <h4>{pro.name}</h4>
                <p>
              <span>{pro.price}$</span>
              <hr />
                {pro.title.slice(0, 30)}
              </p>
    
          </div>
          <button className="button">
            <Link to={{ pathname: 'prodact', state: { pro }}}>
            BUY
            </Link>
            </button>
  
          </div>     
        ))}
      //</div>  
    //</div> */