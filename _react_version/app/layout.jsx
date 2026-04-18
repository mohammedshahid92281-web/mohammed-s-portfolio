import './globals.css'

export const metadata = {
  title: 'Mohammed Shahid | Portfolio',
  description: 'Software Developer Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
