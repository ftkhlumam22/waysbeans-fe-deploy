import {
  Avatar,
  Badge,
  Box,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import icon from '../assets/images/Icon.png';
import icon1 from '../assets/images/Icon1.png';
import { Colors } from '../assets/data/colors/color';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useNavigate } from 'react-router-dom';
import Loginform from './Loginform';
import Registerform from './Registeform';
import { Link } from 'react-router-dom';
import {
  RiShoppingCartLine as Cart,
  RiAccountCircleLine as User,
  RiLogoutBoxRLine as Door,
} from 'react-icons/ri';
import { GiCoffeeBeans as Beans } from 'react-icons/gi';
import Profile from '../assets/images/user.png';
import { useEffect } from 'react';
import { API, setAuthToken } from '../config/api';

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [gologin, setGologin] = useState(true);
  const [state, dispatch] = useContext(UserContext);
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false);
  const [dataCart, setDataCart] = useState([]);
  const [qty, setQty] = useState(0);

  let navigate = useNavigate();

  let userCheck = localStorage.getItem('token');

  let total_Qty = 0;

  useEffect(() => {
    const dataCart = async () => {
      try {
        const response = await API.get('/cartby-transaction');
        setDataCart(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataCart();
  }, [setDataCart]);

  useEffect(() => {
    const TotalQty = async () => {
      dataCart?.forEach(item => {
        total_Qty += item?.qty;
      });
      setQty(total_Qty);
    };
    TotalQty();
  }, [setQty]);

  const goToLogin = () => {
    setGologin(true);
    onOpen();
  };

  const goToRegister = () => {
    setGologin(false);
    onOpen();
  };

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    });
    setLogin(false);
    navigate('/');
  };

  //Setting 2 color mode
  const bg = useColorModeValue('whiteAlpha.900', 'blackAlpha.500');
  const color1 = useColorModeValue(Colors.main, 'white');
  const logo = useColorModeValue(icon, icon1);
  const color2text = useColorModeValue('white', 'blackAlpha.900');
  const dropdown = useColorModeValue('#FFFF', '#2D3748');

  useEffect(() => {
    if (userCheck) {
      const users = async () => {
        const response = await API.get('/check-auth');
        if (response.status === 200) {
          setUser(response.data.data);
          setLogin(true);
        } else {
          setLogin(false);
        }
      };
      users();
    }
  }, [setUser, userCheck]);
  return (
    <>
      <Box
        display="flex"
        bg={bg}
        height="10vh"
        alignItems="center"
        boxShadow="xl"
      >
        <Box flexShrink={1} flexGrow={1} marginLeft="150px">
          <Link to={user?.admin ? '/dashboard' : '/'}>
            <Image src={logo} />
          </Link>
        </Box>
        <Box
          display="flex"
          flexShrink={2}
          flexGrow={1}
          marginRight="120px"
          justifyContent="flex-end"
        >
          {login === false ? (
            <>
              <Button
                onClick={goToLogin}
                variant="outline"
                borderColor={color1}
                color={color1}
                borderWidth="2px"
                fontWeight="semibold"
                height="30px"
                width="120px"
                fontSize="15px"
                _hover={{
                  backgroundColor: `${color1}`,
                  textColor: `${color2text}`,
                }}
              >
                Login
              </Button>
              <Button
                onClick={goToRegister}
                marginLeft="20px"
                variant="solid"
                borderColor={color1}
                backgroundColor={color1}
                color={color2text}
                borderWidth="2px"
                fontWeight="semibold"
                height="30px"
                width="120px"
                fontSize="15px"
                _hover={{
                  backgroundColor: `${color2text}`,
                  textColor: `${color1}`,
                  borderColor: `${color1}`,
                }}
              >
                Register
              </Button>
              {gologin ? (
                <Loginform
                  openLogin={isOpen}
                  closeLogin={onClose}
                  goRegister={setGologin}
                  openRegister={onOpen}
                />
              ) : (
                <Registerform
                  openRegister={isOpen}
                  closeRegister={onClose}
                  goLogin={setGologin}
                  openLogin={onOpen}
                />
              )}
            </>
          ) : (
            <>
              <Box marginRight="25px" alignSelf="center">
                <Link to="/cart">
                  <Cart color={color1} fontSize="26px" />
                </Link>
                {qty > 0 ? (
                  <Badge
                    backgroundColor="red.500"
                    color="white"
                    borderRadius="full"
                    position="absolute"
                    fontSize="8px"
                    marginLeft="15px"
                    marginTop="-28px"
                  >
                    {qty}
                  </Badge>
                ) : (
                  ''
                )}
              </Box>
              <Menu>
                <MenuButton>
                  <Avatar size="sm" src={Profile} />
                </MenuButton>
                <MenuList marginTop="15px">
                  <div
                    style={{
                      position: 'absolute',
                      width: 0,
                      height: 0,
                      borderLeft: '8px solid transparent',
                      borderRight: '8px solid transparent',
                      borderBottom: `15px solid ${dropdown}`,
                      marginLeft: '198px',
                      marginTop: '-22px',
                    }}
                  ></div>
                  {/* MenuItems are not rendered unless Menu is open */}
                  {user.admin === true ? (
                    <>
                      <Link to="/add-product">
                        <MenuItem
                          borderBottom="1px"
                          borderBottomColor="blackAlpha.200"
                          icon={<Beans fontSize="22px" color={color1} />}
                          fontWeight="bold"
                        >
                          Add Product
                        </MenuItem>
                      </Link>
                      <Link to="/list-products">
                        <MenuItem
                          borderBottom="1px"
                          borderBottomColor="blackAlpha.200"
                          icon={<Beans fontSize="22px" color={color1} />}
                          fontWeight="bold"
                        >
                          List Product
                        </MenuItem>
                      </Link>
                      <MenuItem
                        icon={<Door fontSize="22px" color="red" />}
                        fontWeight="bold"
                        onClick={logout}
                      >
                        Logout
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <Link to={`/profile/${user.id}`}>
                        <MenuItem
                          borderBottom="1px"
                          borderBottomColor="blackAlpha.200"
                          icon={<User fontSize="22px" color={color1} />}
                          fontWeight="bold"
                        >
                          Profile
                        </MenuItem>
                      </Link>
                      <MenuItem
                        icon={<Door fontSize="22px" color="red" />}
                        fontWeight="bold"
                        onClick={logout}
                      >
                        Logout
                      </MenuItem>
                    </>
                  )}
                </MenuList>
              </Menu>
            </>
          )}
        </Box>
        <ColorModeSwitcher marginRight="20px" />
      </Box>
    </>
  );
}

export default Navbar;
