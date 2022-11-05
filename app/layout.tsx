import { Navbar } from '../components/Navbar';
import './global.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</head>
			<body>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
