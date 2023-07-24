import React from 'react'
import './Home.css'
import { useGetProdactQuery } from '../../../featuers/prodacts/prodactSlice'
import useAuth from "../../../hooks/useAuth"
import Prodact from './Prodact'

const Home = () => {

  const { username, Admin, Editor, id } = useAuth()


  console.log(id)

  const { 
    data: prodact, 
    isLoading, 
    isError, 
    isSuccess
   } = useGetProdactQuery()





  let contant

  if(isLoading && !prodact) {

  
    contant = <p>pleace Wait...</p>

  } 
 else if (isError) {
 console.log(isError)
 }

  else if(isSuccess) {
   
    const { ids } = prodact

    

     

      const prodactCon = ids?.length ? ids.map(prodactId => <Prodact key={prodactId} prodactId={prodactId} />) : null

      contant = (
        <div className="home">
            <div className="prodact" >
          {prodactCon}
          </div>
        </div>
      )
        

      }


      return contant


  

  
  
}

export default Home