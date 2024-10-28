import "./globals.css";
import Header from './components/Header'
import Providers from '../lib/providers'

export const metadata = {
  title: "UMAK Blog",
  description: "Blog exclusively in UMAK",
  icons: {
    icon: '/logo.jpg'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
