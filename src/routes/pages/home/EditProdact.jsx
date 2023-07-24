import { useState, useEffect } from "react"
import { useUpdateProdactMutation, useDeleteProdactMutation } from "../../../featuers/prodacts/prodactSlice"
import { useNavigate } from "react-router-dom"


const EditProdactForm = ({ prodact, user }) => {

    const [updateProdact, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateProdactMutation()

    const [deleteProdact, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteProdactMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(prodact.title)
    const [name, setName] = useState(prodact.name)
    const [id, setId] = useState(prodact._id)
    const [price, setPrice] = useState(prodact.price)
    const [userId, setUserId] = useState(user)



    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setName('')
            setId('')
            setUserId('')
            navigate('/')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onNameChanged = e => setName(e.target.value)
    const onPriceChanged = e => setPrice(e.target.value)


    const canSave = [title, name, userId, price].every(Boolean) && !isLoading

    const onSaveProdactClicked = async (e) => {
        if (canSave) {
            await updateProdact({ id, user: userId, title, name, price })
        }
    }

    const onDeleteProdactClicked = async () => {
        await deleteProdact({ id, user: userId })
    }


    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validNameClass = !name ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Prodact #{prodact.name}</h2>
                <textarea
                    className={`form__input ${validTitleClass}`}
                    id="prodact-title"
                    name="title"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={onTitleChanged}
                />

                
                <input
                    className={`form__input form__input--name ${validNameClass}`}
                    id="name"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={onNameChanged}
                />
                <input
                    className={`form__input form__input--name ${validNameClass}`}
                    id="price"
                    type="number"
                    placeholder="Price"
                    name="price"
                    value={price}
                    onChange={onPriceChanged}
                />
                
                        <button
                            className="button"
                            title="Save"
                            onClick={onSaveProdactClicked}
                            disabled={!canSave}
                        >
                            Save
    
                        </button>
                        <button
                            className="button"
                            title="Delete"
                            onClick={onDeleteProdactClicked}
                            >
                                Delete
                        </button>
                    </div>
            </form>
        </>
    )

    return content
}

export default EditProdactForm