import AuthProvider from '@/components/AuthProvider/AuthProvider'
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

// export const revalidate = 10

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The Burnt Umber',
  description: 'The Burnt Umber',
}

export default function RootLayout(props) {
  console.log("PROPS", props)
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster richColors />
        <AuthProvider>
            {props.children} 
            {props.parallel}        
        </AuthProvider>
      </body>
    </html>
  )
}
