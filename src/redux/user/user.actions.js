export const setCurrentUser = user => ({
	type: 'SET_CURRENT_USER',
	payload: user
});

export const logoutUser = () => ({
  type: 'USER_LOGOUT'
});