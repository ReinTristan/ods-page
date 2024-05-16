import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ODS_INFO } from '@/lib/informacionODS'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
	const [search, setSearch] = useState('')
	const [ODSs] = useState(Object.values(ODS_INFO))
	const [selectedODS, setSelectedODS] = useState(null)
	const handleSearch = (e) => {
		setSearch(e.target.value)
	}
	const filteredODS = ODSs.filter((item) =>
		item.nombre.toLowerCase().includes(search.toLowerCase())
	)
	return (
		<div className='flex flex-col items-center justify-center w-full'>
			<div className='bg-cyan-400 w-full'>
				<h1 className='my-16 text-7xl font-fira-sans font-bold text-center text-white'>
					ODS QUEST
				</h1>
			</div>
			<div className='flex gap-2 items-center w-[80%] mt-4'>
				<Search className='text-cyan-400' />
				<Input
					className='border-black'
					onChange={handleSearch}
					placeholder='Buscar ODS'
				/>
			</div>
			{selectedODS && (
				<div className='my-16 w-[80%] flex ring rounded-md'>
					<div className=' w-1/5'>
						<img
							src={selectedODS.logo}
							alt=''
							className='w-full h-full rounded-md'
						/>
					</div>
					<div className='w-full flex flex-col justify-center gap-4'>
						<div className=''>
							<p className='text-center text-xl'>{selectedODS.descripcion}</p>
						</div>
						<div className='flex justify-around w-full'>
							<Button asChild>
								<Link to={`/game-1/${selectedODS.id}`}>Ahorcado</Link>
							</Button>
							<Button asChild className='flex'>
								<Link to={`/game-2/${selectedODS.id}`}>Pasapalabras</Link>
							</Button>

							<Button asChild>
								<Link to={`/game-3/${selectedODS.id}`}>Sopa de letras</Link>
							</Button>
						</div>
					</div>
				</div>
			)}
			<div className='grid grid-cols-3 w-4/5 gap-4'>
				{filteredODS.map((ods, index) => (
					<div
						key={index}
						className='p-4 hover:brightness-50 cursor-pointer rounded-sm aspect-square '
						onClick={() => setSelectedODS(ods)}
					>
						<img
							src={ods.logo}
							alt=''
							className='w-full aspect-square rounded-3xl'
						/>
					</div>
				))}
			</div>
		</div>
	)
}
