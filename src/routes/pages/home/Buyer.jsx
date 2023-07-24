import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectProdactById } from '../../../featuers/prodacts/prodactSlice'
import useAuth from '../../../hooks/useAuth'
import BuyerPodact from './BuyerPodact'

const BuyerNew = () => {
    const { id } = useParams()
    const { ide = id } = useAuth()

    const prodact = useSelector(state => selectProdactById(state, id))
    const user = ide


    const content = prodact && user ? <BuyerPodact prodact={prodact} user={user} /> : <p>Loading...</p>

    return content
}
export default BuyerNew