import { Outlet } from 'react-router-dom'
import ODS from '../assets/ODS-auth.png'
export default function AuthLayout() {
	return (
		<div className='h-dvh grid grid-cols-10 '>
			<div className='col-span-6 h-full'>
				<img
					src={ODS}
					alt=''
					className='h-full w-full object-cover bg-blue-200'
				/>
			</div>
			<div className='col-span-4 h-full'>
				<Outlet />
			</div>
		</div>
	)
}
