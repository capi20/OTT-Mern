import React, { useMemo, useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { StyledNav } from "./Header.styled";
import { useAppContext } from "../../context/AppContext";
import { IconButton } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Backdrop from "../Backdrop/Backdrop";

const Navigation = () => {
	const location = useLocation();
	const searchRef = useRef();
	const [localSearch, setLocalSearch] = useState("");
	const [search, setSearch] = useState("");
	const [showSearch, setShowSearch] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const { logoutUser, user } = useAppContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (!location.pathname.includes("search")) {
			setLocalSearch("");
			setSearch("");
			setShowSearch(false);
		}
	}, [location.pathname]);

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
				<div className="nav__search">
					<input
						ref={searchRef}
						name="search"
						value={localSearch}
						onChange={optimizedDebounce}
						placeholder="Search"
						className={showSearch ? "show-search" : ""}
					/>
					<IconButton onClick={() => showSearchHandler()}>
						{showSearch ? <CloseIcon /> : <SearchIcon />}
					</IconButton>
				</div>

				<div className="user">
					<button
						type="button"
						className="user-icon"
						onClick={() => setShowMenu(!showMenu)}>
						<PersonOutlineIcon />
					</button>
					<ul
						className={
							showMenu ? "user-dropdown show-dropdown" : "user-dropdown"
						}
						onClick={() => setShowMenu(false)}>
						<li>Hello, {user.name}</li>
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
								onClick={logoutUser}>
								logout
							</button>
						</li>
					</ul>
				</div>
			</div>
			<Backdrop
				isOpen={showMenu}
				close={() => setShowMenu(false)}
				transparent={true}
			/>
		</StyledNav>
	);
};

export default Navigation;
