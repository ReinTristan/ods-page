import { Button } from '@/components/ui/button'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { useAuthStore } from '@/lib/useAuthStore'
import { Link, Outlet, useNavigate } from 'react-router-dom'

export default function Layout() {
	const navigate = useNavigate()
	const { setIsLoggedIn, setUser } = useAuthStore()
	const closeSession = () => {
		localStorage.removeItem('logged')
		setIsLoggedIn(false)
		setUser(null)
		navigate('/auth/login')
	}
	return (
		<div className='grid h-dvh grid-cols-5 font-roboto'>
			<aside className='col-span-1 h-full shadow-xl'>
				<div className='flex items-center justify-center p-10 bg-cyan-500'>
					<h2 className='text-4xl text-white bg-cyan-500 font-fira-sans font-bold'>
						ODS QUEST
					</h2>
				</div>
				<NavigationMenu className='w-full max-w-full'>
					<NavigationMenuList className='flex flex-col w-full'>
						<NavigationMenuItem className=''>
							<NavigationMenuLink asChild>
								<Link
									to='/'
									className={`${navigationMenuTriggerStyle()} p-4 bg-primary`}
								>
									Inicio
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link to='/profile' className={navigationMenuTriggerStyle()}>
									Perfil
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Button
									onClick={closeSession}
									className={navigationMenuTriggerStyle()}
								>
									Cerrar sesion
								</Button>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</aside>
			<main className='col-span-4'>
				<Outlet />
			</main>
		</div>
	)
}
