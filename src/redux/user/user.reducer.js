const INITIAL_STATE = {
	currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'SET_CURRENT_USER':
			return {
				...state,
				currentUser: action.payload
			};

		case 'USER_LOGOUT':
      		return INITIAL_STATE;

		default:
			return state;
	}
};

export default userReducer;