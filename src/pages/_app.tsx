// import '../styles/reset.scss'
// import { Roboto } from 'next/font/google';
// const roboto = Roboto({
// 	weight: ["300", "400", "500", "700"],
// 	subsets: ['latin'],
// 	display: 'swap',
// 	variable: '--font-roboto'
// })
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';
import '../styles/header.scss';
import 'nprogress/nprogress.css';
import '../styles/loading-page.scss';

import { ReactNotifications } from 'react-notifications-component';

// import AppHeader from '../../components/Header';
import NProgress from 'nprogress'
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { getTokenCSRAndSSR } from '../../helpers';
import userService from '../../services/userService';
import { useGlobalState } from '../../state';
import postService from '../../services/postService';

function MyApp({ Component, pageProps, router }: AppProps) {
	const [currentUser, setCurrentUser] = useGlobalState('currentUser');
	const [, setToken] = useGlobalState('token');
	const [, setCategories] = useGlobalState('categories');
	const [loading, setLoading] = useState(false);
	
	useMemo(() => {
		// Chay 1 lan duy nhat de khoi tao Global state
		
		setCurrentUser(pageProps.userInfo);
		setToken(pageProps.token);
		setCategories(pageProps.categories);
	}, [])

	useEffect(() => {
		router.events.on('routeChangeStart', (url) => {
			setLoading(true)
			NProgress.set(0.5);
			NProgress.start();
		});
		router.events.on('routeChangeComplete', (url) => {
            setLoading(false)
			NProgress.done();
        });
		router.events.on('routeChangeError', (err, url) => {
            setLoading(false)
			NProgress.done();
        });
	})

	const pathName = router.pathname;
	const hiddenFooter = useMemo(() => {
		const excluded = ['/', '/posts/[postid]'];
		const currentRouter = pathName;
		
		return excluded.indexOf(currentRouter) !== -1;
	}, [pathName])

	const hiddenHeader = useMemo(() => {
		const excluded = ['/login', '/register'];
		const currentRouter = pathName;

		return excluded.indexOf(currentRouter) !== -1;
	}, [pathName])
	
	return (
		<>
			<div id='SenjiApp' className={`SenjiApp-main`}>
				<Head>
					<meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
					<meta name="keywords" content="HTML5 Template" />
					<meta name="description" content="Cộng đồng chế ảnh ZendVN" />
					<meta name="author" content="etheme.com" />
					<title>Cộng đồng chế ảnh VIET NAM</title>
				</Head>
				<ReactNotifications />
				{ !hiddenHeader && <Header /> }
				<main>
					<Component {...pageProps} />
				</main>

				{ !hiddenFooter && <Footer /> }

		
            	{/* { 
					loading &&
					<div className='loading-page'>
						<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 100 100"
						preserveAspectRatio="xMidYMid"
						display="block"
						>
						<circle
							cx={50}
							cy={50}
							r={32}
							strokeWidth={8}
							stroke="#a976c3"
							strokeDasharray="50.26548245743669 50.26548245743669"
							fill="none"
							strokeLinecap="round"
						>
							<animateTransform
							attributeName="transform"
							type="rotate"
							dur="1s"
							repeatCount="indefinite"
							keyTimes="0;1"
							values="0 50 50;360 50 50"
							/>
						</circle>
						<circle
							cx={50}
							cy={50}
							r={23}
							strokeWidth={8}
							stroke="#a0de59"
							strokeDasharray="36.12831551628262 36.12831551628262"
							strokeDashoffset={36.12831551628262}
							fill="none"
							strokeLinecap="round"
						>
							<animateTransform
							attributeName="transform"
							type="rotate"
							dur="1s"
							repeatCount="indefinite"
							keyTimes="0;1"
							values="0 50 50;-360 50 50"
							/>
						</circle>
						</svg>
					</div>
				} */}
				
			</div>
		</>
	)
}


MyApp.getInitialProps = async (appContext: AppContext) => {
	const appProps = await App.getInitialProps(appContext);
	
	let userPromise = null;
	let categoriesPromise = null;

	const [token, userToken] = getTokenCSRAndSSR(appContext.ctx);
	
	if (typeof(window) === "undefined" ) {
		if (userToken?.id && userToken?.email) {
			userPromise = userService.getUserByID(userToken.id);
		}
		categoriesPromise = postService.getPostCategories();
	}
	const [userRes, categoriesRes] = await Promise.all([userPromise, categoriesPromise]);
	
	return {
		pageProps: {
			...appProps.pageProps,
			token,
			categories: categoriesRes?.categories || [],
			userInfo: userRes?.user || null
		}
	}
}

export default MyApp;