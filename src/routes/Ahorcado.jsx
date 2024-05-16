import { ODS_INFO } from '@/lib/informacionODS'
import { getWords } from '@/lib/utils'
import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/lib/useAuthStore'
export default function Ahorcado() {
	const [dialog, setDialog] = useState(false)
	const { setUser, user } = useAuthStore()
	const { id: odsID } = useParams()
	const [ODS] = useState(() => {
		let ods = odsID > 17 || odsID < 1 ? 1 : odsID
		return ODS_INFO[`ODS${ods}`]
	})
	const [wordToGuess] = useState(() => {
		const word = getWords(ODS.palabras, 1).pop()
		return {
			...word,
			palabra: word.palabra
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.replaceAll(' ', '-')
				.toLowerCase(),
		}
	})
	const [guessedLetters, setGuessedLetters] = useState(['-'])
	const incorrectLetters = guessedLetters.filter(
		(letter) => !wordToGuess.palabra.includes(letter)
	)
	const addGuessedLetter = useCallback(
		(letter) => {
			if (guessedLetters.includes(letter) || isLoser || isWinner) return
			setGuessedLetters((currentLetter) => [...currentLetter, letter])
		},
		[guessedLetters]
	)
	useEffect(() => {
		const handler = (e) => {
			const key = e.key
			if (!key.match(/^[a-z]$/)) return
			e.preventDefault()
			addGuessedLetter(key)
		}
		document.addEventListener('keypress', handler)
		return () => {
			document.removeEventListener('keypress', handler)
		}
	}, [])

	const isLoser = incorrectLetters.length >= 6
	const isWinner = wordToGuess.palabra
		.split('')
		.every((letter) => guessedLetters.includes(letter))
	useEffect(() => {
		if (isWinner) {
			setDialog(true)
			setUser({
				...user,
				score: Number(user.score) + 100,
				streak: Number(user.streak) + 1,
			})
		}
		if (isLoser) {
			setDialog(true)
			setUser({
				...user,
				streak: 0,
			})
		}
	}, [isWinner, isLoser])
	return (
		<>
			<Dialog open={dialog} onOpenChange={setDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{isWinner ? 'Felicidades' : isLoser ? 'Perdiste' : ''}
						</DialogTitle>
					</DialogHeader>
					<div>
						<div className='w-30 aspect-square'>
							<img
								src={ODS.imagenJuego}
								className='w-full h-full object-cover'
							/>
						</div>
						<div className='flex justify-between'>
							<span className='text-xl font-semibold'>
								{' '}
								{isWinner ? 'Puntos: 100' : isLoser ? 'Puntos 0' : ''}
							</span>
							<span className='text-xl font-semibold'>
								{isWinner ? 'Racha +1' : isLoser ? 'Racha 0' : ''}
							</span>
						</div>
					</div>
					<DialogFooter>
						<Button asChild>
							<Link to='/' className=''>
								Regresar
							</Link>
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<h2 className='text-center text-5xl py-5 mt-8 font-fira-sans'>
				El ahorcado
			</h2>
			<div className='flex justify-center'>
				<div className='flex ring'>
					<div className='w-24 h-24 '>
						<img src={ODS.logo} alt='' className='w-full h-full' />
					</div>
					<div className='text-xl w-1/2'>{wordToGuess.definicion}</div>
				</div>
			</div>
			<div className='w-1/2 flex flex-col gap-8 mx-auto items-center'>
				<div className='text-center text-3xl'>
					Intentos restante : {6 - incorrectLetters.length}
				</div>
				<HangmanDrawing numberOfGuesses={incorrectLetters.length} />
			</div>
			<HangmanWord
				reveal={isLoser}
				guessedLetters={guessedLetters}
				wordToGuess={wordToGuess.palabra}
			/>
		</>
	)
}

function HangmanWord({ guessedLetters, wordToGuess, reveal = false }) {
	return (
		<div className='flex justify-center gap-1 text-[6rem] font-bold uppercase px-4 flex-wrap'>
			{wordToGuess.split('').map((letter, index) => (
				<span className='border-b-black border-b' key={index}>
					<span
						className={`${
							guessedLetters.includes(letter) || reveal
								? 'visible'
								: 'invisible'
						} ${
							!guessedLetters.includes(letter) && reveal
								? 'text-red-500'
								: 'text-black'
						}`}
					>
						{letter}
					</span>
				</span>
			))}
		</div>
	)
}

const HEAD = (
	<div
		style={{
			height: '50px',
			width: '50px',
			border: '10px solid black',
			borderRadius: '100%',
			position: 'absolute',
			top: '50px',
			right: '-30px',
		}}
	/>
)

const BODY = (
	<div
		style={{
			height: '100px',
			width: '10px',
			background: 'black',
			position: 'absolute',
			top: '119px',
			right: 0,
		}}
	/>
)
const RIGHT_ARM = (
	<div
		style={{
			height: '10px',
			width: '100px',
			background: 'black',
			position: 'absolute',
			top: '150px',
			right: '-100px',
			rotate: '-30deg',
			transformOrigin: 'left bottom',
		}}
	/>
)
const LEFT_ARM = (
	<div
		style={{
			height: '10px',
			width: '100px',
			background: 'black',
			position: 'absolute',
			top: '150px',
			right: '10px',
			rotate: '30deg',
			transformOrigin: 'right bottom',
		}}
	/>
)
const RIGHT_LEG = (
	<div
		style={{
			height: '10px',
			width: '100px',
			background: 'black',
			position: 'absolute',
			top: '210px',
			right: '-90px',
			rotate: '60deg',
			transformOrigin: 'left bottom',
		}}
	/>
)
const LEFT_LEG = (
	<div
		style={{
			height: '10px',
			width: '100px',
			background: 'black',
			position: 'absolute',
			top: '210px',
			right: '0px',
			rotate: '-60deg',
			transformOrigin: 'right bottom',
		}}
	/>
)
const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

export function HangmanDrawing({ numberOfGuesses }) {
	return (
		<div style={{ position: 'relative' }}>
			{BODY_PARTS.slice(0, numberOfGuesses)}
			<div
				style={{
					height: '50px',
					width: '10px',
					backgroundColor: 'black',
					position: 'absolute',
					top: 0,
					right: 0,
				}}
			/>
			<div
				style={{
					height: '10px',
					width: '200px',
					backgroundColor: 'black',
					marginLeft: '120px',
				}}
			/>
			<div
				style={{
					height: '400px',
					width: '10px',
					backgroundColor: 'black',
					marginLeft: '120px',
				}}
			/>
			<div
				style={{ height: '10px', width: '250px', backgroundColor: 'black' }}
			/>
		</div>
	)
}
