import { ODS_INFO } from '@/lib/informacionODS'
import { getWords } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const gridSize = 15
export default function SopaDeLetras() {
	const { id: odsID } = useParams()
	const [ODS] = useState(() => {
		let ods = odsID > 17 || odsID < 1 ? 1 : odsID
		return ODS_INFO[`ODS${ods}`]
	})
	const [words] = useState(getWords(ODS.palabras, 5))
	const [grid, setGrid] = useState([])
	const [selectedCells, setSelectedCells] = useState([])

	const generateGrid = (size) => {
		const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
		const newGrid = []

		for (let i = 0; i < size; i++) {
			const row = []
			for (let j = 0; j < size; j++) {
				row.push(alphabet[Math.floor(Math.random() * alphabet.length)])
			}
			newGrid.push(row)
		}

		return newGrid
	}

	const placeWords = (words, grid) => {
		const newGrid = [...grid]
		const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical'
		const occuppedLines = []
		for (const word of words) {
			let maxCell = grid.length - word.length
			let startMain = undefined
			while (occuppedLines.includes(startMain) || startMain === undefined) {
				startMain = Math.floor(Math.random() * (grid.length - 1))
			}
			const startSecondary = Math.floor(Math.random() * maxCell)
			for (let i = 0; i < word.length; i++) {
				if (direction === 'horizontal') {
					newGrid[startMain][startSecondary + i] = word[i]
					occuppedLines.push(startMain)
				} else {
					newGrid[startSecondary + i][startMain] = word[i]
				}
				occuppedLines.push(startMain)
			}
		}

		return newGrid
	}

	useEffect(() => {
		const newGrid = generateGrid(gridSize)
		const wordsToPlace = words
			.map((word) =>
				word.palabra
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.split(' ')
					.sort((a, b) => b.length - a.length)
					.shift()
			)
			.sort((a, b) => b.length - a.length)
		const finalGrid = placeWords(wordsToPlace, newGrid)
		setGrid(finalGrid)
	}, [])

	const handleCellClick = (row, col) => {
		const newSelectedCells = [...selectedCells, { row, col }]
		setSelectedCells(newSelectedCells)
		console.log(newSelectedCells)
	}

	return (
		<div className=''>
			<h2 className='text-center text-5xl py-5 font-fira-sans'>
				Sopa de letras
			</h2>
			<div className='flex justify-center'>
				<div className='w-24 h-24 '>
					<img src={ODS.logo} alt='' className='w-full h-full' />
				</div>
				<div className='text-xl w-1/2 flex gap-2'>
					{words.map((word, index) => (
						<span key={index} className='border-2'>
							{word.palabra}
						</span>
					))}
				</div>
			</div>
			<div className='flex justify-center my-8'>
				<div className='grid grid-cols-15 gap-2'>
					{grid.map((row, rowIndex) => {
						return row.map((letter, colIndex) => (
							<div
								key={`${rowIndex}-${colIndex}`}
								className={`p-3 uppercase bg-gray-200 rounded-md cursor-pointer hover:bg-primary ${
									selectedCells.some(
										(cell) => cell.row === rowIndex && cell.col === colIndex
									)
										? 'bg-primary hover:bg-primary hover:opacity-50'
										: ''
								}`}
								onClick={() => handleCellClick(rowIndex, colIndex)}
							>
								{letter}
							</div>
						))
					})}
				</div>
			</div>
		</div>
	)
}
