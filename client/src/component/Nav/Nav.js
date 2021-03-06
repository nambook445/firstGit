import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom'
import axios from 'axios';

import BasicModal from './src/BasicModal';





const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Nav = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isLogin = props.isLogin;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.target);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.target)
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{mb:3}} style={{borderRadius:4}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            마감일기
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Link to="/" style={{textDecoration: 'none'}}>
                <Button sx={{ my: 2, color: 'black', display: 'block' }}>
                  홈
                </Button>
              </Link>
              <Link to="/pages" style={{textDecoration: 'none'}}>
                <Button sx={{ my: 2, color: 'black', display: 'block' }}>
                  글쓰기
                </Button></Link>
              <Link to="/board" style={{textDecoration: 'none'}}>
                <Button
                sx={{ my: 2, color: 'black', display: 'block' }}>
                게시판
                </Button>
              </Link>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            마감일기
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to="/" style={{textDecoration: 'none'}}>
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                홈
              </Button>
            </Link>
            <Link to="/pages" style={{textDecoration: 'none'}}>
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                글쓰기
              </Button>
            </Link>
            <Link to="/board" style={{textDecoration: 'none'}}>
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                게시판
              </Button>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
          {/* 로그인모달 */}
            <BasicModal isLogin={isLogin} /> 
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;
