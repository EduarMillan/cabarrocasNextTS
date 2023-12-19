import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/redux/store/StoreProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Taller Cabarrocas',
	description: 'Creado por Ing. Eduardo Millan N.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='es'>
			<body className={inter.className}>
				<Toaster position='bottom-right' />
				<StoreProvider>{children}</StoreProvider>
			</body>
		</html>
	);
}
