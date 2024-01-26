import React, { useMemo, useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { StyledNav } from "./Header.styled";
import { useAppContext } from "../../context/AppContext";
import { IconButton } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Backdrop from "../Backdrop/Backdrop";
import { genreMap } from "../../Requests";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Navigation = () => {
	const location = useLocation();
	const searchRef = useRef();
	const [localSearch, setLocalSearch] = useState("");
	const [search, setSearch] = useState("");
	const [showSearch, setShowSearch] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [genre, setGenre] = useState(null);
	const [showGenre, setShowGenre] = useState(false);
	const [hideMenu, setHideMenu] = useState(false);
	const { logoutUser, user } = useAppContext();
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
		if (!location.pathname.includes("search")) {
			setLocalSearch("");
			setSearch("");
			setShowSearch(false);
		}
		if (location.pathname.includes("account")) {
			setHideMenu(true);
		} else {
			setHideMenu(false);
		}

		if (!location.pathname.includes("genre")) {
			setGenre(null);
		}
	}, [location.pathname, location.search]);

	useEffect(() => {
		if (localSearch) {
			navigate(`/search/${localSearch}`);
		}
	}, [search]);

	const showSearchHandler = () => {
		if (!showSearch) {
			searchRef.current.focus();
		}
		setLocalSearch("");
		setShowSearch(!showSearch);
	};

	const handleGenreChange = (e) => {
		setGenre(e.target.value);
		navigate(`/genre/${e.target.value}`);
	};

	const debounce = () => {
		let timeoutID;
		return (e) => {
			setLocalSearch(e.target.value);
			clearTimeout(timeoutID);
			timeoutID = setTimeout(() => {
				setSearch(e.target.value);
			}, 1000);
		};
	};
	const optimizedDebounce = useMemo(() => debounce(), []);

	return (
		<StyledNav>
			<Link to="/" style={{ textDecoration: "none" }}>
				<div className="nav__logo">HomeShow</div>
			</Link>
			<div className="nav">
				{!hideMenu && (
					<>
						<div
							className="genre-wrapper"
							onClick={() => setShowGenre(!showGenre)}>
							<div className="genre">
								<span className="genre-name">
									{genre ? genreMap[genre] : "Genre"}
								</span>
								<ArrowDropDownIcon className={showGenre ? "arrow-up" : ""} />
							</div>
							<ul className={showGenre ? "genre-list show" : "genre-list"}>
								{Object.keys(genreMap).map((el) => (
									<li key={el} value={el} onClick={handleGenreChange}>
										{genreMap[el]}
									</li>
								))}
							</ul>
						</div>
						<Link
							to="/watchlist"
							style={{ textDecoration: "none", color: "fff" }}
							className="color-white watchlist">
							Watchlist
						</Link>
						<div className="search-wrapper">
							<div
								className={
									showSearch ? "nav-search show-search" : "nav-search"
								}>
								<input
									ref={searchRef}
									name="search"
									value={localSearch}
									onChange={optimizedDebounce}
									placeholder="Search"
									// className={showSearch ? "show-search" : ""}
								/>
								{showSearch && (
									<IconButton onClick={() => showSearchHandler()}>
										<CloseIcon />
									</IconButton>
								)}
							</div>
							{!showSearch && (
								<IconButton onClick={() => showSearchHandler()}>
									<SearchIcon />
								</IconButton>
							)}
						</div>
					</>
				)}

				<div className="user">
					<button
						type="button"
						className="user-icon"
						onClick={() => setShowMenu(!showMenu)}>
						<PersonOutlineIcon />
					</button>
					<ul
						className={showMenu ? "user-dropdown show" : "user-dropdown"}
						onClick={() => setShowMenu(false)}>
						<li>Hello, {user.name}</li>
						<li className="watchlist-menu">
							<Link
								to="/watchlist"
								style={{ textDecoration: "none", color: "fff" }}
								className="color-white">
								Watchlist
							</Link>
						</li>
						<li>
							<Link
								to="/account"
								style={{ textDecoration: "none", color: "fff" }}
								className="color-white">
								Account
							</Link>
						</li>
						<li>
							<button
								type="button"
								className="user-dropdown_btn"
								onClick={() => logoutUser(user.testUser)}>
								logout
							</button>
						</li>
					</ul>
				</div>
			</div>
			<Backdrop
				isOpen={showMenu || showGenre}
				close={() => {
					setShowMenu(false);
					setShowGenre(false);
				}}
				transparent={true}
			/>
		</StyledNav>
	);
};

export default Navigation;
