import axios from "axios";

export const movieDBInstance = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`
	}
});

export const serverInstance = axios.create({
	baseURL: "https://homeshow-server.onrender.com/api/v1",
	//baseURL: "api/v1"
	withCredentials: true
});
