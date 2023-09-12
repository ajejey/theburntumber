
import { Avatar, IconButton } from '@mui/material';
import styles from './Header.module.css';
import SearchBar from './SearchBar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';

const Header = () => {

    return (
        <header className={styles.header}>
            <div className={styles.logo}>Burnt Umber</div>
            <div className={styles.search}>
                <SearchBar />
                <FilterListRoundedIcon />
            </div>
            <div className={styles.nav}>
                <div className={styles.icons}>
                    <IconButton aria-label="cart" size="large" edge="end" color="inherit" >
                        <ShoppingCartIcon />
                    </IconButton>
                    <Avatar sx={{ bgcolor: 'var(--primary-color)' }}> U </Avatar>
                </div>
            </div>
        </header>
    );
};

export default Header;

