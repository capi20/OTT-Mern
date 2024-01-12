import {
	HANDLE_CHANGE,
	CLOSE_MODAL,
	OPEN_MODAL,
	SET_MODAL_DATA,
	LOGIN_USER,
	LOGOUT_USER,
	SEARCH_MOVIE_START,
	SEARCH_MOVIE_SUCCESS,
	DISPLAY_ALERT,
	CLEAR_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	GET_CURRENT_USER_BEGIN,
	GET_CURRENT_USER_SUCCESS,
	SEARCH_MOVIE_ERROR,
	API_START,
	API_SUCCESS,
	API_ERROR,
	UPDATE_USER_BEGIN,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERROR
} from "./actions";

const reducer = (state, action) => {
	switch (action.type) {
		case DISPLAY_ALERT:
			return {
				...state,
				showAlert: true,
				alertType: "error",
				alertMsg: action.payload.message
			};
		case CLEAR_ALERT:
			return {
				...state,
				showAlert: false,
				alertType: "",
				alertText: ""
			};
		case HANDLE_CHANGE:
			return {
				...state,
				[action.payload.name]: action.payload.value
			};
		case OPEN_MODAL:
			return {
				...state,
				isModalOpen: true
			};
		case CLOSE_MODAL:
			return {
				...state,
				isModalOpen: false,
				modalBody: ""
			};
		case SET_MODAL_DATA:
			return {
				...state,
				isModalOpen: true,
				modalBody: action.payload.data
			};
		case SETUP_USER_BEGIN:
			return {
				...state,
				isLoading: true
			};
		case SETUP_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.payload.user,
				showAlert: true,
				alertType: "success",
				alertMsg: action.payload.alertText
			};
		case SETUP_USER_ERROR:
			return {
				...state,
				isLoading: false,
				showAlert: true,
				alertType: "error",
				alertMsg: action.payload.alertText
			};
		case LOGOUT_USER:
			return {
				...state,
				user: null,
				userLoading: false
			};
		case GET_CURRENT_USER_BEGIN:
			return {
				...state,
				userLoading: true,
				showAlert: false
			};
		case GET_CURRENT_USER_SUCCESS:
			return {
				...state,
				userLoading: false,
				user: action.payload.user
			};
		case UPDATE_USER_BEGIN:
			return { ...state, isLoading: true };

		case UPDATE_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.payload.user,
				showAlert: true,
				alertType: "success",
				alertMsg: "User Profile Updated!"
			};

		case UPDATE_USER_ERROR:
			return {
				...state,
				isLoading: false,
				showAlert: true,
				alertType: "error",
				alertMsg: action.payload.msg
			};

		case API_START:
			return {
				...state,
				isLoading: true
			};
		case API_SUCCESS:
			return {
				...state,
				isLoading: false
			};
		case API_ERROR:
			return {
				...state,
				isLoading: false
			};
		default:
			return state;
	}
};

export default reducer;
