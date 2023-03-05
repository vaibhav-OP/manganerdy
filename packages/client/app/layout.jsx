import { cookies } from 'next/headers';

import Navbar from "../components/navbar";
import Footer from "../components/footer";

import '../styles/globals.css';
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');

  return (
    <html>
      <head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </head>
      <body className={ theme?.value==="dark"?"dark":"" +" text-sm"}>
        <Navbar />
        <div className='w-full py-6 dark:bg-[#10171E] dark:text-white min-h-[calc(100vh-112px)]'>{children}</div>
        <Footer />
      </body>
    </html>
  )
}
