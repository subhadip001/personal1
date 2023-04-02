import { useRouter } from 'next/router'

const AuthenticatedComponent = ({ children }) => {
    const router = useRouter()

    if (true) {
        // If the user is not logged in, redirect to the login page.
        router.push('/login')
        return null
    }

    // If the user is logged in, render the children.
    return children
}

export default AuthenticatedComponent