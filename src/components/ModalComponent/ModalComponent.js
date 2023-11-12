'use client'
import { Dialog, DialogContent } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

function ModalComponent({ children, bg }) {
    console.log("MODAL COMPONENT OPEN")
    const pathname = usePathname()
    const router = useRouter()

    const handleClose = () => {
        router.back()
    }

    if (pathname === '/') {
        return null
    }

    return (
        <Dialog open onClose={handleClose} scroll='paper' fullWidth maxWidth='xl'>

            <DialogContent>
                {children}
            </DialogContent>

        </Dialog>
    )
}

export default ModalComponent


{/* <Link href="/" className={`modal ${bg}`} scroll={false} />
            {children} */}
