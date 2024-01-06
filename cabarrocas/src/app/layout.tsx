import type { Metadata } from 'next';
//import { Inter } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/redux/store/StoreProvider';
import { Toaster } from 'react-hot-toast';
import ResponsiveAppBar from './navbar';

//const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Taller Cabarrocas',
	description: 'Aplicacion para la gestion de producción del Taller Cabarrocas',
	authors: [{ name: 'Ing. Eduardo Millán N.' }],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='es'>
			{/* <body className={inter.className}> */}
			<body>
				<ResponsiveAppBar />
				<Toaster position='bottom-right' />
				<StoreProvider>{children}</StoreProvider>
			</body>
		</html>
	);
}
