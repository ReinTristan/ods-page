import { create } from 'zustand'

// Define the initial state
const initialState = {
	user: null,
	isLoggedIn: JSON.parse(localStorage.getItem('logged')) ?? false,
}

// Create the store with persist middleware
export const useAuthStore = create(
	// Define the store
	(set) => ({
		...initialState,

		// Action to set the user
		setUser: (user) => {
			set({ user })
			if (!user) return
			// Manually save to localStorage
			const users = JSON.parse(localStorage.getItem('users')) || []
			const existingUserIndex = users.findIndex(
				(prevUser) => user.email === prevUser.email
			)
			if (existingUserIndex !== -1) {
				users[existingUserIndex] = { ...user }
			} else {
				users.push(user)
			}
			localStorage.setItem('users', JSON.stringify(users))
		},

		// Action to update the login status
		setIsLoggedIn: (status) => {
			set({ isLoggedIn: status })
			localStorage.setItem('logged', JSON.stringify(status))
		},
	})
)
