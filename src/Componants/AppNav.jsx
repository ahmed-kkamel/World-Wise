import { NavLink } from "react-router-dom";
import styels from "./AppNav.module.css";
function AppNav() {
	return (
		<nav className={styels.nav}>
			<ul>
				<li>
					<NavLink to="cities">Cities</NavLink>
				</li>
				<li>
					<NavLink to="countries">Countries</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default AppNav;
