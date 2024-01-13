import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState
} from "react";
import YouTube from "react-youtube";
import { movieDBInstance, serverInstance } from "../axios";
import reducer from "./reducer";
import { searchAPI } from "../Requests";
import {
	CLOSE_MODAL,
	OPEN_MODAL,
	SET_MODAL_DATA,
	LOGOUT_USER,
	SEARCH_MOVIE_START,
	SEARCH_MOVIE_SUCCESS,
	HANDLE_CHANGE,
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
	UPDATE_USER_SUCCESS,
	UPDATE_USER_BEGIN,
	UPDATE_USER_ERROR
} from "./actions";

const initialState = {
	isModalOpen: false,
	modalBody: "",
	userLoading: true,
	isLoading: false,
	showAlert: false,
	alertMsg: "",
	alertType: "",
	isAuth: false,
	user: null,
	search: "",
	searchResult: ""
};

const opts = {
	height: "600",
	width: "100%",
	playerVars: {
		autoplay: 1
	}
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [bgImage, setBgImage] = useState("");

	useEffect(() => {
		getCurrentUser();
	}, []);

	const updateBgImage = (path) => {
		setBgImage(path);
	};

	const getCurrentUser = async () => {
		dispatch({ type: GET_CURRENT_USER_BEGIN });

		try {
			const { data } = await serverInstance.get("/auth/getCurrentUser");
			dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: { user: data } });
		} catch (error) {
			// if (error.response.status === 401) return;
			logoutUser();
		}
	};

	const apiStart = () => {
		dispatch({ type: API_START });
	};

	const apiSuccess = () => {
		dispatch({ type: API_SUCCESS });
	};

	const apiError = (message = "Something went wrong!") => {
		dispatch({ type: API_ERROR });
		displayAlert(message);
	};

	const displayAlert = (message = "Please provide all values!") => {
		dispatch({ type: DISPLAY_ALERT, payload: { message } });
		clearAlert();
	};

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT });
		}, 6000);
	};

	const handleChange = ({ name, value }) => {
		dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
	};

	const openModal = () => {
		dispatch({ type: OPEN_MODAL });
	};

	const closeModal = () => {
		dispatch({ type: CLOSE_MODAL });
	};

	const setModalData = (data) => {
		dispatch({ type: SET_MODAL_DATA, payload: { data } });
	};

	const setupUser = async (currentUser, endPoint, alertText) => {
		dispatch({ type: SETUP_USER_BEGIN });

		try {
			const { data } = await serverInstance.post(
				`/auth/${endPoint}`,
				currentUser
			);
			const { user } = data;
			dispatch({
				type: SETUP_USER_SUCCESS,
				payload: { user, alertText }
			});
		} catch (error) {
			dispatch({
				type: SETUP_USER_ERROR,
				payload: { alertText: error.response.data.msg }
			});
		}
		clearAlert();
	};

	const updateUser = async (currentUser) => {
		dispatch({ type: UPDATE_USER_BEGIN });
		try {
			const { data } = await serverInstance.patch(
				`/auth/updateUser`,
				currentUser
			);
			const { user } = data;
			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: { user }
			});
		} catch (error) {
			if (error.response.status !== 401) {
				console.log(error.response.data.msg);
				dispatch({
					type: UPDATE_USER_ERROR,
					payload: { msg: error.response.data.msg }
				});
			}
		}
		clearAlert();
	};

	const logoutUser = async () => {
		await serverInstance.get("auth/logout");
		dispatch({ type: LOGOUT_USER });
	};

	const fetchMovieVideos = async (movieId) => {
		const movieData = await movieDBInstance.get(`/movie/${movieId}/videos`);
		const vidId =
			movieData.data.results.find(
				(vid) => vid.name === "Trailer" || vid.name === "Official Trailer"
			) || movieData.data.results[0];

		const renderData = <YouTube videoId={vidId.key} opts={opts} />;
		setModalData(renderData);
	};

	return (
		<AppContext.Provider
			value={{
				...state,
				openModal,
				closeModal,
				fetchMovieVideos,
				setupUser,
				updateUser,
				logoutUser,
				handleChange,
				displayAlert,
				apiStart,
				apiSuccess,
				apiError,
				bgImage,
				updateBgImage
			}}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};
