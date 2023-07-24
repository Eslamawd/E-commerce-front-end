import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectProdactById } from '../../../featuers/prodacts/prodactSlice'
import useAuth from '../../../hooks/useAuth'
import EditProdactForm from './EditProdactForm'

const EditProdact = () => {
    const { id } = useParams()
    const { ide = id } = useAuth()

    const prodact = useSelector(state => selectProdactById(state, id))
    const user = ide


    const content = prodact && user ? <EditProdactForm prodact={prodact} user={user} /> : <p>Loading...</p>

    return content
}
export default EditProdact