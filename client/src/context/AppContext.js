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
import {
	CLOSE_MODAL,
	OPEN_MODAL,
	SET_MODAL_DATA,
	LOGOUT_USER,
	HANDLE_CHANGE,
	DISPLAY_ALERT,
	CLEAR_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	GET_CURRENT_USER_BEGIN,
	GET_CURRENT_USER_SUCCESS,
	API_START,
	API_SUCCESS,
	API_ERROR,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_BEGIN,
	UPDATE_USER_ERROR,
	SETUP_TEST_USER
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
	user: null
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
			logoutUser(true);
		}
	};

	const apiStart = () => {
		dispatch({ type: API_START });
	};

	const apiSuccess = () => {
		dispatch({ type: API_SUCCESS });
	};

	const apiError = () => {
		dispatch({ type: API_ERROR });
	};

	const displayAlert = (message = "Please provide all values!", time = 6) => {
		dispatch({ type: DISPLAY_ALERT, payload: { message } });
		clearAlert(time);
	};

	const clearAlert = (time = 6) => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT });
		}, time * 1000);
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
				payload: { alertText: error.response?.data.msg }
			});
		}
		clearAlert(1);
	};

	const setupTestUser = async (user, alertText) => {
		dispatch({ type: SETUP_TEST_USER, payload: { user, alertText } });
		clearAlert(1);
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
				dispatch({
					type: UPDATE_USER_ERROR,
					payload: { msg: error.response.data.msg }
				});
			}
		}
		clearAlert();
	};

	const logoutUser = async (isTestUser) => {
		if (!isTestUser) {
			await serverInstance.get("auth/logout");
		}
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
				setupTestUser,
				updateUser,
				logoutUser,
				handleChange,
				displayAlert,
				clearAlert,
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
