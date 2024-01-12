import axios from "axios";

export const movieDBInstance = axios.create({
	baseURL: "https://api.themoviedb.org/3"
});

export const serverInstance = axios.create({
	baseURL: "/api/v1"
});
