import { useNavigate } from "react-router-dom"
import { useCreatProdactMutation } from "../../../featuers/prodacts/prodactSlice"
import useAuth from '../../../hooks/useAuth'


import './createpro.css'

const NewProdactForm = () => {

    const { id } = useAuth()
    const [createProdact, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useCreatProdactMutation()

    const navigate = useNavigate()
    
  
    
    const onSubmit = async(e) => {
        e.preventDefault()
        
        const formData = new FormData(e.target)
        formData.append('user',`${id}`)

        try {
            console.log(formData)
            await createProdact(formData).unwrap()
            alert("Product created successfully!")
            if (isSuccess) {
                navigate('/')
            }
        } catch (error) {
            console.error('Failed to create product:', error)
        }
    }


    const content = (
        <>
        {isError && <p>{error.message}</p>}
            <div className="home">
              <div className="create">
                <div className="form__title-row">
                    <h2>New Prodact</h2>
                  
                </div>
            <form className="form" encType="multipart/form-data" onSubmit={onSubmit}>

                
                <textarea
                    name="title"
                    type="text"
                    placeholder="Title"
                    autoComplete="off"
                />
                <input 
                    type="file" 
                    name="image"
                 />
           
                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    
                />
                <input
                    
                    name="prodacttype"
                    placeholder="Prodact Type"
                    type="text"
                />
                <input
                    name="price"
                    type="number"
                    placeholder="Price"
                />

                <button className="button btn" type="submit" disabled={isLoading}>
                    {isLoading ? "Sharing..." : "Share"}  
                </button>
                        
            </form>
            </div>
            </div>
        </>
    )

    return content ;
}

export default NewProdactForm










































/*import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCreatProdactMutation } from "../../../featuers/prodacts/prodactSlice"
import useAuth from '../../../hooks/useAuth'
import { useForm } from "react-hook-form"

import './createpro.css'

const NewProdactForm = () => {

   
    const { id } = useAuth()
    const [createProdact, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useCreatProdactMutation()

    //const { register, handleSubmit, reset } = useForm()
    const [data, setData] = useState({
        name: '',
        title: '',
        image: null,
        price: '',
        prodacttype: '',
        user: `${id}`

    })
    
    const navigate = useNavigate()
    
    
    const handleImageChange = (event) => {
        
        setData({
            ...data,
            image: event.target.files[0]
        })
        
        
    }
    
    const handleInputChange = (event) => {
        const { name, value } = event.target
        
        setData({
            ...data,
            [name]: value
        })
    }
    
        const onSubmit = async(e) => {
        
            e.preventDefault()
    
            console.log(data)
           await createProdact(data)
              .unwrap()
              .then(() => {
                alert("Product created successfully!")
              })
          }

    const content = (
        <>
        {isError && <p>{error.message}</p>}
            <div className="home">
              <div className="create">
                <div className="form__title-row">
                    <h2>New Prodact</h2>
                  
                </div>
            <form className="form" onSubmit={onSubmit}>
                
                <textarea
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title"
                    autoComplete="off"
                    value={data.title}
                    onChange={handleInputChange}
                />
                   <input 
                    type="file" 
                    name="image"
                    id="image"
                    onChange={handleImageChange}
                 />
           
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
               
                  onChange={handleInputChange}
                  value={data.name}
                />
                <input
                    id="prodacttype"
                    name="prodacttype"
                    placeholder="Prodact Type"
                    type="text"
                  onChange={handleInputChange}
                  value={data.prodacttype}
                />
                <input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Price"
                  value={data.price}
                  onChange={handleInputChange}
                   />


                <button className="button btn" type="submit" disabled={isLoading}>
                {isLoading ? "Shareing..." : "Share"}  
                        </button>
                        
            </form>
            </div>
            </div>
        </>
    )

    return content ;
}

export default NewProdactForm


*/

      /*
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        image: null,
        price: Number,
        prodacttype: '',
        user: id

    })


       //  {...register("name", { required: true })}
    const [title, setTitle] = useState('')
    const [name, setName] = useState('')
    const [prodacttype, setProdacttype] = useState('')
    const [price, setPrice] = useState(Number)
    const [image, setImage] = useState(null)
    const imageRef = useRef()
    const [user, setUser] = useState(id) 


   const onTitleChanged = e => setTitle(e.target.value)
    const onNameChanged = e => setName(e.target.value)
    const onProdacttypeChanged = e => setProdacttype(e.target.value)
    const onPriceChanged = e => setPrice(e.target.value)
    const onUsereChanged = e => setUser(e.target.value)
    const onImageChange = (event) => {
        
            setImage(event.target.files[0])
        

    }

const handleInputChange = (event) => {
    const { name, value } = event.target

    setFormData({
        ...formData,
        [name]: value
    })
}

const handleImageChange = (event) => {
    setFormData({
        ...formData,
        image: event.target.files[0]
    })
}

    const canSave = [formData].every(Boolean) && !isLoading

    
    const onSaveProdactClicked =  (e) => {
      
        
        const data = new FormData()
        
            data.append("image", formData.image)
            data.append("user", formData.name)
            data.append("price", formData.price)
            data.append("title", formData.title)
            
       const data = {
            user: user,
                 name: name,
                 image: image,
                 price: price,
                 title: title,
                 prodacttype: prodacttype
            }
            */

            

        
    



    
