import "./globals.css";

export const metadata = {
  title: "UMAK Blog",
  description: "Blog exclusively in UMAK",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
