import { Link, Outlet } from "react-router-dom";
import TopBarProgressByLocation from "./TopBarProgressByLocation";

import { ReactComponent as Brand } from "./brand.svg";
import styles from "./Layout.module.scss";
import { ErrorBoundary } from "./ErrorBaundary";

export function Layout() {
	return (
		<>
			<TopBarProgressByLocation />
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<Link to={`/`}>
						<h1 className={styles.app__brand}>DevDash_</h1>
					</Link>
				</section>
			</header>
			<ErrorBoundary>
				<Outlet />
			</ErrorBoundary>
		</>
	);
}
