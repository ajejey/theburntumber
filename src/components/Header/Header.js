import { Button, Avatar, Dropdown, MenuButton, MenuItem, ListDivider, Menu } from '@mui/joy';
import { ShoppingCart, FilterList } from '@mui/icons-material';
import styles from './Header.module.css';
import SearchBar from './SearchBar';
import SignOut from '../SignOut/SignOut';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const Header = async () => {
    const session = await getServerSession(authOptions)
    console.log("session inside Header", session)

    return (
        <header className={styles.header}>
            <div className={styles.logo}></div>
            <div className={styles.search}>
                <SearchBar />
                <FilterList />
            </div>
            <div className={styles.nav}>
                <div className={styles.icons}>
                    <Button aria-label="cart" size="large" color="inherit" >
                        <ShoppingCart />
                    </Button>
                    <Dropdown>
                        <MenuButton
                            slots={{ root: Avatar }}
                            slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                            sx={{ borderRadius: 40 }}
                        >
                            <Button>
                                {session?.user ?
                                    <Avatar
                                        src={session?.user?.image}
                                    /> :
                                    <Avatar sx={{ bgcolor: 'var(--primary-color)', color: 'var(--background-color)' }}>U</Avatar>
                                }

                            </Button>

                        </MenuButton>
                        <Menu placement='bottom-start'>
                            <MenuItem>
                                <Link href="/profile" className='link'>
                                    Profile
                                </Link>
                            </MenuItem>
                            <ListDivider />
                            <MenuItem>
                                <SignOut />
                            </MenuItem>
                        </Menu>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
};

export default Header;


