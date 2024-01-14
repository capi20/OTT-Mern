const requests = [
	["Popular", `/movie/popular`],
	["Top Rated", `/movie/top_rated?&language=en-US`],
	["Action", `/discover/movie?with_genres=28`],
	["Adventure", `/discover/movie?with_genres=12`],
	["Animation", `/discover/movie?with_genres=16`],
	["Comedy", `/discover/movie?with_genres=35`],
	["Crime", `/discover/movie?with_genres=80`]
	// ["Documentary", `/discover/movie/?&with_genres=99`],
	// ["Drama", `/discover/movie/?&with_genres=18`],
	// ["Family", `/discover/movie/?&with_genres=10751`],
	// ["Fantasy", `/discover/movie/?&with_genres=14`],
	// ["History", `/discover/movie/?&with_genres=36`],
	// ["Horror", `/discover/movie/?&with_genres=27`],
	// ["Music", `/discover/movie/?&with_genres=10402`],
	// ["Mystery", `/discover/movie/?&with_genres=9648`],
	// ["Romance", `/discover/movie/?&with_genres=10749`],
	// ["Science Fiction", `/discover/movie/?&with_genres=878`],
	// ["TV Movie", `/discover/movie/?&with_genres=10770`],
	// ["Thriller", `/discover/movie/?&with_genres=53`],
	// ["War", `/discover/movie/?&with_genres=10752`],
	// ["Western", `/discover/movie/?&with_genres=37`]
];

export const trendingAPI = `/trending/movie/week?&language=en-US`;

export const searchAPI = `/search/movie?`;

export const poster_url = "https://image.tmdb.org/t/p/original";

export default requests;
