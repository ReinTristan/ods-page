import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './routes/Layout'
import Home from './routes/Home'
import Login from './routes/Login'
import { ProtectedRoute } from './components/ProtectedRoute'
import AuthLayout from './routes/AuthLayout'
import { UnProtectedRoute } from './components/UnProtectedRoute'
import Register from './routes/Register'
import { Toaster } from './components/ui/sonner'
import Profile from './routes/Profile'
import Ahorcado from './routes/Ahorcado'
// import PasaPalabras from './routes/PasaPalabras'
// import SopaDeLetras from './routes/SopaDeLetras'

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<Layout />
			</ProtectedRoute>
		),
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: 'game-1',
				element: <Navigate to='/game-1/1' />,
			},
			{
				path: 'game-1/:id',
				element: <Ahorcado />,
			},
			// {
			// 	path: 'game-2',
			// 	element: <Navigate to='/game-2/1' />,
			// },
			// {
			// 	path: 'game-2/:id',
			// 	element: <PasaPalabras />,
			// },
			// {
			// 	path: 'game-3',
			// 	element: <Navigate to='/game-3/1' />,
			// },
			// {
			// 	path: 'game-3/:id',
			// 	element: <SopaDeLetras />,
			// },
			{
				path: '/profile',
				element: <Profile />,
			},
			{
				path: '*',
				element: <Navigate to='/' />,
			},
		],
	},
	{
		path: '/auth',
		element: (
			<UnProtectedRoute>
				<AuthLayout />
			</UnProtectedRoute>
		),
		children: [
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <Register />,
			},
		],
	},
])
function App() {
	return (
		<>
			<RouterProvider router={router} />
			<Toaster richColors />
		</>
	)
}

export default App
