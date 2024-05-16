import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ODS_INFO } from '@/lib/informacionODS'
import { getWords } from '@/lib/utils'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function PasaPalabras() {
	const { id: odsID } = useParams()
	const [ODS] = useState(() => {
		let ods = odsID > 17 || odsID < 1 ? 1 : odsID
		return ODS_INFO[`ODS${ods}`]
	})
	const [words] = useState(getWords(ODS.palabras, 6))
	const [selectedWord, setSelectedWord] = useState({ word: words[0], index: 0 })
	return (
		<div>
			<h2 className='text-center text-5xl py-5 font-fira-sans'>Pasapalabras</h2>
			<div className='flex justify-center'>
				<div className='flex ring'>
					<div className='w-24 h-24 '>
						<img src={ODS.logo} alt='' className='w-full h-full' />
					</div>
					<div className='text-xl w-1/2'>{selectedWord.word.definicion}</div>
				</div>
			</div>
			<div className='relative '>
				<div className='flex items-center justify-center mt-64'>
					<div className='text-4xl font-bold'>Pasapalabras</div>
					<div className='absolute top-0 left-0 w-full flex justify-center items-center'>
						{words.map((word, index) => (
							<div
								key={index}
								className='absolute'
								style={{
									transform: `rotate(${
										index * (360 / 6)
									}deg) translate(10rem) rotate(${-index * (360 / 6)}deg)`,
								}}
							>
								<div
									className={`p-4 text-lg font-bold border-2 border-primary rounded-2xl ${
										selectedWord.index === index ? 'bg-primary' : ''
									}`}
								>
									<span>{word.palabra[0]}</span>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className='flex justify-center items-center flex-col mt-6 '>
					<Button
						onClick={() => {
							setSelectedWord((prev) => {
								console.log(prev.index + 1, words.length - 1)
								return {
									index: prev.index + 1 > words.length - 1 ? 0 : prev.index + 1,
									word: words[
										prev.index + 1 > words.length - 1 ? 0 : prev.index + 1
									],
								}
							})
						}}
					>
						Pasapalabra
					</Button>
					<div className='w-64 mt-32'>
						<p className='text-center text-xl mb-4'>Adivinar</p>
						<Input className='ring' />
					</div>
				</div>
			</div>
		</div>
	)
}
