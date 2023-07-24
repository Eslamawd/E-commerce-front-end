import { useSelector } from 'react-redux'
import { slectCarntToken } from '../featuers/auth/authSlice'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(slectCarntToken)
    let Editor = false
    let Admin = false
    let status = "Employee"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles, id } = decoded.UserInfo

        Editor = roles.Editor
        Admin = roles.Admin

        if (Editor) status = "Manager"
        if (Admin) status = "Admin"

        return { username, roles, id, status, Editor, Admin }
    }

    return { username: '', roles: [], id: '', Editor, Admin, status }
}
export default useAuth