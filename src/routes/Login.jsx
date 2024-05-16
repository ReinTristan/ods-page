import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/lib/useAuthStore'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function Login() {
	const { setUser, setIsLoggedIn } = useAuthStore()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const handleLogin = () => {
		const users = JSON.parse(localStorage.getItem('users')) ?? []
		console.log(users)
		const find = users.find(
			(user) => user.email === email && user.password === password
		)
		if (find) {
			setIsLoggedIn(true)
			setUser(find)
			navigate('/')
		} else {
			toast.error('Error al iniciar sesion', {
				description: 'Datos incorrectos',
				position: 'top-center',
			})
		}
	}
	return (
		<div className='h-full flex flex-col items-center'>
			<h1 className='text-4xl my-16'>ODS Quest</h1>
			<h2 className='text-xl my-8'>Iniciar sesión</h2>
			<div className='flex flex-col gap-10'>
				<div>
					<Label htmlFor='email' className='mb-8'>
						Email
					</Label>
					<Input
						id='email'
						type='email'
						className='ring-primary ring'
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<Label htmlFor='password'>Contraseña</Label>
					<Input
						id='password'
						type='password'
						className='ring-primary ring'
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<span>
					¿No tiene una cuenta?{' '}
					<Link
						to='/auth/register'
						className='text-blue-400 cursor-pointer hover:text-blue-500'
					>
						Registrate
					</Link>
				</span>
				<Button type='button' className='text-xl' onClick={handleLogin}>
					Iniciar
				</Button>
			</div>
		</div>
	)
}
