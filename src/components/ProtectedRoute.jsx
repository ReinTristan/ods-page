import { useAuthStore } from '@/lib/useAuthStore'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
	const { isLoggedIn } = useAuthStore()
	return isLoggedIn ? <>{children}</> : <Navigate to='/auth/login' replace />
}
