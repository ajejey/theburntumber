import { Button, Avatar, Dropdown, MenuButton, MenuItem, ListDivider, Menu } from '@mui/joy';
import { ShoppingCart, FilterList } from '@mui/icons-material';
import styles from './Header.module.css';
import SearchBar from './SearchBar';
import SignOut from '../SignOut/SignOut';
import Link from 'next/link';

const Header = () => {


    return (
        <header className={styles.header}>
            <div className={styles.logo}>Burnt Umber</div>
            <div className={styles.search}>
                <SearchBar />
                <FilterList />
            </div>
            <div className={styles.nav}>
                <div className={styles.icons}>
                    <Button aria-label="cart" size="large" color="inherit" >
                        <ShoppingCart />
                    </Button>
                    <Dropdown variant="plain" placement="bottom-start">
                        <MenuButton
                            slots={{ root: Avatar }}
                            slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                            sx={{ borderRadius: 40 }}
                        >
                            <Button>
                                <Avatar sx={{ bgcolor: 'var(--primary-color)', color: 'var(--background-color)' }} > U </Avatar>
                            </Button>

                        </MenuButton>
                        <Menu>
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


