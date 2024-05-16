import { useAuthStore } from '@/lib/useAuthStore'
import { Navigate } from 'react-router-dom'

export const UnProtectedRoute = ({ children }) => {
	const { isLoggedIn } = useAuthStore()
	return isLoggedIn ? <Navigate to='/' replace /> : <>{children}</>
}
