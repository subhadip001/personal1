import { useRouter } from 'next/router'
import { useAuth } from '@/store/AuthContext'

const AuthenticatedComponent = ({ children }) => {
    const router = useRouter()
    const { isLoggedIn, login, logout } = useAuth()

    if (!isLoggedIn) {
        // If the user is not logged in, redirect to the login page.
        router.push('/login')
        return null
    }

    // If the user is logged in, render the children.
    return children
}

export default AuthenticatedComponent