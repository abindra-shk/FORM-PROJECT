import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { clearAuthInfo } from '../../Auth/authSlice';
import AutoCompleteSearch from './AutoCompleteSearch'; // Import AutoCompleteSearch
import { FormItem } from '../../../interface/interface';
import { API_ENDPOINTS } from '../../../utils/constant';
import { PostRequest } from '../../../services/services';

interface NavBarProps {
  formArray: FormItem[];
  onInputChange: (value: string) => void;
  onAddRecord: (value: string) => void;
}

const Navbar: React.FC<NavBarProps> = ({
  formArray,
  onInputChange,
  onAddRecord,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state: any) => state.auth.userInfo);
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const refreshToken = useSelector((state: any) => state.auth.refreshToken);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = async () => {
    console.log('refreshToken',refreshToken)
    await PostRequest(API_ENDPOINTS.LOGOUT, {
      refreshToken: refreshToken,
    });
  };

  const handleLogout = async () => {
    try {
      await logOut();
      dispatch(clearAuthInfo());
      navigate('/login');
      handleClose();
    } catch (err) {
      console.log(err);
      alert('Cannot logout');
    }
  };

  const handleProfile = () => {
    navigate('/profile'); // Assuming you have a profile route
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'grey' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: 'white' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {isAuthenticated && (
              <AutoCompleteSearch
                formArray={formArray}
                onInputChange={onInputChange}
                onAddRecord={onAddRecord}
              />
            )}
          </Typography>
          {isAuthenticated && (
            <div>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleMenu}
                sx={{ color: 'white' }}
              >
                {userInfo.userName}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
