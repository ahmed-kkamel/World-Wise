import SideBar from "../Componants/SideBar";
import styles from "./AppLayout.module.css";
import Map from "../Componants/Map";
import User from "../Componants/User";
function AppLayout() {
	return (
		<div className={styles.app}>
			<SideBar />
			<Map />
			<User />
		</div>
	);
}

export default AppLayout;
