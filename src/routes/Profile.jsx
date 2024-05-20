import { Flame, Gem } from 'lucide-react'
import perfil from '../assets/perfil.png'
import { useAuthStore } from '@/lib/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
export default function Profile() {
	const { user, setIsLoggedIn } = useAuthStore()
	const navigate = useNavigate()
	useEffect(() => {
		console.log(user)
		if (!user) {
			setIsLoggedIn(false)
			navigate('/auth/login')
		}
	}, [])
	if (!user) {
		return null
	}
	return (
		<div className='h-dvh'>
			<div className='bg-cyan-500 h-1/2 flex justify-center items-center'>
				<div className=' w-64 aspect-square'>
					<img src={perfil} alt='' />
				</div>
			</div>
			<div className='p-4 flex flex-col'>
				<h2 className='text-3xl font-semibold'>{user.name}</h2>
				<h3 className='text-xl font-semibold mt-6'>Estadisticas</h3>
				<div className='flex'>
					<div className='flex flex-col items-center border w-36 rounded-md p-4'>
						<span className='flex p-4 mt-4 gap-4 text-xl'>
							<Gem className='text-primary text-6xl' />
							{user.score}
						</span>
						<span>Puntos</span>
					</div>
					<div className='flex flex-col items-center border w-36 rounded-md p-4'>
						<span className='flex p-4 mt-4 gap-4 text-xl'>
							<Flame className='text-red-600' />
							{user.streak}
						</span>
						<span>Racha</span>
					</div>
				</div>
			</div>
		</div>
	)
}
