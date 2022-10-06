import React, { useState } from 'react';
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
import { API } from '../config/api';
import { useMutation } from 'react-query';

function Registerform({ openRegister, closeRegister, goLogin, openLogin }) {
  const toast = useToast();

  let initialState = {
    email: '',
    password: '',
    name: '',
    postal_code: '',
    address: '',
  };
  const [form, setForm] = useState(initialState);
  const { email, password, name, postal_code, address } = form;

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
          'Content-Type': 'application/json',
        },
      };

      let body = {
        name: form.name,
        email: form.email,
        password: form.password,
        address: form.address,
        postal_code: parseInt(form.postal_code),
      };
      console.log(body);

      const response = await API.post('/register', body, config);

      if (response.data.status === 'Success') {
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 4000,
          position: 'bottom-right',
          isClosable: true,
        });
        setForm({
          email: '',
          password: '',
          name: '',
          postal_code: '',
          address: '',
        });
        goToLogin();
      }
    } catch (error) {
      if (error.response.data.code === 409) {
        toast({
          title: 'Email has already registered',
          description: 'Your email has already been registered',
          status: 'warning',
          duration: 4000,
          position: 'bottom-right',
          isClosable: true,
        });
      } else {
        toast({
          title: 'Register Failed',
          status: 'error',
          duration: 4000,
          position: 'bottom-right',
          isClosable: true,
        });
      }
      setForm({
        email: '',
        password: '',
        name: '',
        postal_code: '',
        address: '',
      });
    }
  });

  const goToLogin = () => {
    closeRegister();
    goLogin(true);
    openLogin();
  };
  return (
    <>
      <Modal isOpen={openRegister} onClose={closeRegister} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={Colors.main} fontWeight="semibold">
            Register
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={5}>
            <form onSubmit={e => handleSubmit.mutate(e)}>
              <Input
                name="name"
                value={name}
                onChange={handleChange}
                backgroundColor={Colors.secondary}
                borderColor={Colors.main}
                textColor={Colors.main}
                _focusVisible={{ borderColor: `${Colors.secondary}` }}
                _placeholder={{ textColor: `${Colors.main}` }}
                type="text"
                placeholder="Full Name"
                marginY="5px"
              />
              <Input
                name="email"
                value={email}
                onChange={handleChange}
                backgroundColor={Colors.secondary}
                borderColor={Colors.main}
                textColor={Colors.main}
                _focusVisible={{ borderColor: `${Colors.secondary}` }}
                _placeholder={{ textColor: `${Colors.main}` }}
                type="text"
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
                marginY="5px"
              />
              <Input
                name="address"
                value={address}
                onChange={handleChange}
                backgroundColor={Colors.secondary}
                borderColor={Colors.main}
                textColor={Colors.main}
                _focusVisible={{ borderColor: `${Colors.secondary}` }}
                _placeholder={{ textColor: `${Colors.main}` }}
                type="text"
                placeholder="Address"
                marginY="5px"
              />
              <Input
                name="postal_code"
                value={postal_code}
                onChange={handleChange}
                backgroundColor={Colors.secondary}
                borderColor={Colors.main}
                textColor={Colors.main}
                _focusVisible={{ borderColor: `${Colors.secondary}` }}
                _placeholder={{ textColor: `${Colors.main}` }}
                type="text"
                placeholder="Postal Code"
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
                Register
              </Button>
              <p style={{ textAlign: 'center', marginTop: '10px' }}>
                Already Have Account ? Click{' '}
                <span
                  onClick={goToLogin}
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

export default Registerform;
