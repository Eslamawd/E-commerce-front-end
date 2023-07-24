import React, { useState } from 'react'
import { useCreatProdactMutation } from '../../featuers/prodacts/prodactSlice'
import { useSelector } from 'react-redux'
import { slectCarntToken } from '../../featuers/auth/authSlice'

import './createpro.css'

const CreateProdact = () => {

  const user  = useSelector(slectCarntToken)

  console.log(user)

  const [ createPro, {data, isLoding, error} ] = useCreatProdactMutation()

  const [ image, setImage ] = useState([])

  const [dataa, setData] = useState(
    {
    name: "",
    title: "", 
    prodacttype: [""], 
    price:  Number,
    }

  );



  const handleChange = (e)=> {
    setData({ ...dataa, [e.target.name]: e.target.value });
  
  };

  const handleImage = (event) => {

    const files = Array.from(event.target.files)
    const imagesData = files.map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
      data: file,
    }))

    setImage([ ...image, imagesData])

  }

  const handleSubmit = async(e) => {
    e.preventDefault();
if (isLoding) {
  await createPro({dataa, image})

 } 
 else if (data) {

 } else  console.log(error)


  }
  return (
    <div className="home">
      <div className="create">
       <form  onSubmit={handleSubmit}>
  
        <input 
        type="text"
        name='name'
        placeholder='Name'
        onChange={handleChange}
        value={dataa.name}
        
        />
        <input 
        type="file" 
        multiple 
        onChange={handleImage}
         value={image}
        
        />
        <input  
        type="text"
        name='title'
        placeholder='Title'
        onChange={handleChange}
        value={dataa.title}
        />
        <input 
        type="text"
        name='prodacttype'
        placeholder='Prodacttype'
        onChange={handleChange}
        value={dataa.prodacttype}
        />
        <input 
        type="number"
        name='price'
        placeholder='Price'
        onChange={handleChange}
        value={dataa.price}
        />
        <button className='button  btn' type="submit">
            Sheare
            </button>
    </form>
    </div>
    </div>
  )
}

export default CreateProdact