'use client'


import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '500px',
        },
    },
}));

export default function AppHeader() {

    const { data: session } = useSession();
    // console.log("check session:", session);

    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        useState<null | HTMLElement>(null);

    const [checkSignout, setCheckSignout] = useState(false)
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            id={menuId}
            keepMounted
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem>
                <Link
                    href={"/profile"}
                    style={{
                        color: 'unset',
                        textDecoration: 'unset',
                    }}
                >
                    Profiles
                </Link>
            </MenuItem>
            {/* <MenuItem onClick={handleMenuClose}>My Account</MenuItem> */}
            <MenuItem onClick={
                () => {
                    handleMenuClose();
                    setCheckSignout(true);
                    signOut();
                }

            }>Sign Out</MenuItem>

        </Menu >
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';

    const renderMobileMenu = (
        <>

            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}

            >
                <MenuItem>
                    <Link href={"/playlist"} style={{
                        color: 'unset',
                        textDecoration: 'unset',
                    }}>
                        Playlists
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href={"/like"} style={{
                        color: 'unset',
                        textDecoration: 'unset',
                    }}>
                        Likes
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href={"/tracks/upload"} style={{
                        color: 'unset',
                        textDecoration: 'unset',
                    }}>
                        Upload
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Avatar
                        onClick={handleProfileMenuOpen}
                    >LD</Avatar>
                </MenuItem>
            </Menu>


        </>
    );


    const handleRedirectHome = () => {
        router.push('/');
    }

    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static"
                sx={{
                    backgroundColor: "#4c4a4a",
                }}
            >
                <Container>
                    <Toolbar>

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                cursor: 'pointer'
                            }}
                            onClick={() => handleRedirectHome()}
                        >
                            SoundCloud
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: "15px",
                            alignItems: "center",
                            cursor: "pointer",
                            "> a": {
                                color: 'unset',
                                textDecoration: 'unset'
                            }
                        }}>
                            {
                                session ?
                                    <>
                                        <Link href={"/playlist"}>
                                            Playlists
                                        </Link>
                                        <Link href={"/like"}>
                                            Likes
                                        </Link>
                                        <Link href={"/tracks/upload"}>
                                            Uploads
                                        </Link>
                                        <Avatar
                                            onClick={handleProfileMenuOpen}
                                        >LD</Avatar>
                                    </> :
                                    <>
                                        <Link href={"/auth/signin"}
                                        >
                                            Login
                                        </Link>
                                    </>
                            }

                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box >
    );

}