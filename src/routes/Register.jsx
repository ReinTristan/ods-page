import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function Register() {
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		age: '',
		password: '',
	})
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const handleRegister = () => {
		const users = JSON.parse(localStorage.getItem('users')) ?? []
		const alreadyUser = users.find((user) => user.email === userData.email)
		if (alreadyUser) {
			toast.error('Error al registrar', {
				description: 'el usuario ya existe',
				position: 'top-center',
			})
			return
		}
		if (userData.password !== password) {
			toast.error('Contraseña incorrecta', {
				description: 'Las contraseñas no coinciden',
				position: 'top-center',
			})
			return
		}

		users.push(userData)
		localStorage.setItem(
			'users',
			JSON.stringify({ ...users, score: 0, streak: 0 })
		)
		navigate('/auth/login')
	}
	return (
		<div className='h-full flex flex-col items-center'>
			<h1 className='text-4xl my-16'>ODS Quest</h1>
			<h2 className='text-xl my-8'>Registro</h2>
			<div className='flex flex-col gap-10'>
				<div className='grid grid-cols-2 gap-4'>
					<div>
						<Label htmlFor='name'>Nombre</Label>
						<Input
							id='name'
							type='text'
							className='ring-primary ring'
							onChange={(e) =>
								setUserData((state) => ({ ...state, name: e.target.value }))
							}
						/>
					</div>
					<div>
						<Label htmlFor='email' className='mb-8'>
							Email
						</Label>
						<Input
							id='email'
							type='email'
							className='ring-primary ring'
							onChange={(e) =>
								setUserData((state) => ({ ...state, email: e.target.value }))
							}
						/>
					</div>
					<div>
						<Label htmlFor='password' className='mb-8'>
							Contraseña
						</Label>
						<Input
							id='password'
							type='password'
							className='ring-primary ring'
							onChange={(e) =>
								setUserData((state) => ({ ...state, password: e.target.value }))
							}
						/>
					</div>
					<div>
						<Label htmlFor='confirmPassword' className='mb-8'>
							Confirmar Contraseña
						</Label>
						<Input
							id='confirmPassword'
							type='password'
							className='ring-primary ring'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>

				<div className='w-1/2 self-center'>
					<Label htmlFor='age' className='mb-8'>
						Edad
					</Label>
					<Input
						id='age'
						type='number'
						className='ring-primary ring'
						onChange={(e) =>
							setUserData((state) => ({ ...state, age: e.target.value }))
						}
					/>
				</div>
				<span>
					¿No tiene una cuenta?{' '}
					<Link
						to='/auth/login'
						className='text-blue-400 cursor-pointer hover:text-blue-500'
					>
						Inicia sesión
					</Link>
				</span>

				<Button type='button' className='text-xl' onClick={handleRegister}>
					Registrar
				</Button>
			</div>
		</div>
	)
}
