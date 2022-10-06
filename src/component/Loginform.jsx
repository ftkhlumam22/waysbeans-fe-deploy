import React, { useContext, useState } from 'react';
import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { Colors } from '../assets/data/colors/color';
import { useNavigate } from 'react-router-dom';
import { API, setAuthToken } from '../config/api';
import { useMutation } from 'react-query';
import { UserContext } from '../context/userContext';

function Loginform({ openLogin, closeLogin, goRegister, openRegister }) {
  let navigate = useNavigate();
  const toast = useToast();

  const [state, dispatch] = useContext(UserContext);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async e => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post('/login', body, config);

      if (response?.status === 200 || response?.data.status === 'Success') {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.data,
        });

        if (localStorage.token) {
          setAuthToken(localStorage.token);
        }

        if (response.data.data.admin === true) {
          navigate('/dashboard');
        } else {
          navigate('/');
        }

        toast({
          title: 'Login Success',
          status: 'success',
          duration: 4000,
          position: 'bottom-right',
          isClosable: true,
        });
        closeLogin();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Login Failed',
        status: 'error',
        duration: 4000,
        position: 'bottom-right',
        isClosable: true,
      });
    }
  });

  const goToRegister = () => {
    closeLogin();
    goRegister(false);
    openRegister();
  };
  return (
    <>
      <Modal isOpen={openLogin} onClose={closeLogin} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={Colors.main} fontWeight="semibold">
            Login
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={5}>
            <form onSubmit={e => handleSubmit.mutate(e)}>
              <Input
                name="email"
                value={email}
                onChange={handleChange}
                backgroundColor={Colors.secondary}
                borderColor={Colors.main}
                textColor={Colors.main}
                _focusVisible={{ borderColor: `${Colors.secondary}` }}
                _placeholder={{ textColor: `${Colors.main}` }}
                type="email"
                placeholder="Email"
                marginY="5px"
              />
              <Input
                name="password"
                value={password}
                onChange={handleChange}
                backgroundColor={Colors.secondary}
                borderColor={Colors.main}
                textColor={Colors.main}
                _focusVisible={{ borderColor: `${Colors.secondary}` }}
                _placeholder={{ textColor: `${Colors.main}` }}
                type="password"
                placeholder="Password"
                marginTop="5px"
                marginBottom="20px"
              />
              <Button
                type="submit"
                width="full"
                backgroundColor={Colors.main}
                textColor="white"
                _hover={{
                  borderWidth: '2px',
                  borderColor: `${Colors.main}`,
                  backgroundColor: 'white',
                  textColor: `${Colors.main}`,
                }}
              >
                Login
              </Button>
              <p style={{ textAlign: 'center', marginTop: '10px' }}>
                Don't Have Account ? Click{' '}
                <span
                  onClick={goToRegister}
                  style={{ fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Here
                </span>
              </p>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Loginform;
