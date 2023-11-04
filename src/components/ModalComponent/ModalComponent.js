'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function ModalComponent({ children, bg }) {
    console.log("MODAL COMPONENT OPEN" )
    const pathname = usePathname()

    if(pathname === '/') {
        return null
    }

    return (
        <div>
            <Link href="/" className={`modal ${bg}`} scroll={false} />
            {children}
        </div>
    )
}

export default ModalComponent