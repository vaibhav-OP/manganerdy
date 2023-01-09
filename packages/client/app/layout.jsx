import Navbar from "../components/navbar";
import Footer from "../components/footer";

import '../styles/globals.css';
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body className="text-sm">
        <Navbar />
        <div className='w-full pt-[104px] py-6 dark:bg-[#10171E] dark:text-white min-h-[calc(100vh-112px)]'>{children}</div>
        <Footer />
      </body>
    </html>
  )
}
