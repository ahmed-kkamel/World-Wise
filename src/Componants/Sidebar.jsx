import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";
function SideBar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />
			{/* //outlet used to refer the children of some Route => Render children routes*/}
			<Outlet />
			<footer className={styles.footer}>
				<p className={styles.copyright}>
					&copy; copyright {new Date().getFullYear()} by World Wise Inc.
				</p>
			</footer>
		</div>
	);
}

export default SideBar;
