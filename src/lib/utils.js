import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

export function getWords(wordArray, numWords) {
	if (numWords > wordArray.length) return

	let randomWords = []

	while (randomWords.length < numWords) {
		let randomIndex = Math.floor(Math.random() * wordArray.length)
		let randomWord = wordArray[randomIndex]
		if (!randomWords.includes(randomWord)) {
			randomWords.push(randomWord)
		}
	}

	return randomWords
}
