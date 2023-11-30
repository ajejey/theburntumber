'use client'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import CloseIcon from '@mui/icons-material/Close';

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

    if(!pathname.includes('/art/')) {
        return null
    }

    return (
        <Dialog open onClose={handleClose} scroll='paper' fullWidth maxWidth='xl'>
            
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 4,
                    top: 4,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>
                {children}
            </DialogContent>

        </Dialog>
    )
}

export default ModalComponent


{/* <Link href="/" className={`modal ${bg}`} scroll={false} />
            {children} */}
