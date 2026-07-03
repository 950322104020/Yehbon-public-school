import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Yehbon Public School | Excellence in Learning',
  description: 'Welcome to Yehbon Public School, Noida. Unlocking primary student growth paths via elite academic tracks and modern facilities.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 min-h-screen flex flex-col justify-between text-slate-800`}>
        <div>
          <Navbar />
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}