import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { HiOutlinePaperClip as Clip } from 'react-icons/hi';
import React from 'react';
import produk from '../../assets/images/produk1.png';
import { Colors } from '../../assets/data/colors/color';
import { useEffect, useState } from 'react';
import { API } from '../../config/api';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

function AddProduct() {
  const toast = useToast();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    name: '',
    stock: '',
    price: '',
    description: '',
    image: '',
  });

  let navigate = useNavigate();

  const handleOnChange = e => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleOnSubmit = useMutation(async e => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const formData = new FormData();
      formData.set('name', form.name);
      formData.set('stock', form.stock);
      formData.set('price', form.price);
      formData.set('description', form.description);
      formData.set('image', form.image[0], form.image[0].name);

      await API.post('/product', formData, config);

      toast({
        title: 'Data Berhasil Dimasukan',
        status: 'success',
        duration: 4000,
        position: 'bottom-right',
        isClosable: true,
      });

      navigate('/list-products');
    } catch (error) {
      toast({
        title: 'Data Gagal Dimasukan',
        status: 'error',
        duration: 4000,
        position: 'bottom-right',
        isClosable: true,
      });
      console.log(error);
    }
  });

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        height="87vh"
        marginX="250px"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="24px" fontWeight="semibold" alignSelf="flex-start">
          Add Product
        </Text>
        <Box display="flex" gap={8} width="full">
          <Box flexGrow={4}>
            <Box marginY="10px">
              <form marginTop="10px" onSubmit={e => handleOnSubmit.mutate(e)}>
                <Input
                  name="name"
                  onChange={handleOnChange}
                  backgroundColor={Colors.secondary}
                  borderColor={Colors.main}
                  textColor={Colors.main}
                  _focusVisible={{ borderColor: `${Colors.secondary}` }}
                  _placeholder={{ textColor: `${Colors.main}` }}
                  type="text"
                  placeholder="Name"
                  marginY="5px"
                />
                <Input
                  name="stock"
                  onChange={handleOnChange}
                  backgroundColor={Colors.secondary}
                  borderColor={Colors.main}
                  textColor={Colors.main}
                  _focusVisible={{ borderColor: `${Colors.secondary}` }}
                  _placeholder={{ textColor: `${Colors.main}` }}
                  type="text"
                  placeholder="Stock"
                  marginY="5px"
                />
                <Input
                  name="price"
                  onChange={handleOnChange}
                  backgroundColor={Colors.secondary}
                  borderColor={Colors.main}
                  textColor={Colors.main}
                  _focusVisible={{ borderColor: `${Colors.secondary}` }}
                  _placeholder={{ textColor: `${Colors.main}` }}
                  type="text"
                  placeholder="Price"
                  marginY="5px"
                />
                <Textarea
                  name="description"
                  onChange={handleOnChange}
                  backgroundColor={Colors.secondary}
                  borderColor={Colors.main}
                  textColor={Colors.main}
                  _focusVisible={{ borderColor: `${Colors.secondary}` }}
                  _placeholder={{ textColor: `${Colors.main}` }}
                  placeholder="Description"
                  resize="none"
                  height="120px"
                  marginY="5px"
                />
                <Box
                  width="full"
                  height="40px"
                  backgroundColor={Colors.secondary}
                  borderRadius="6px"
                  border="1px"
                  marginTop="5px"
                  marginBottom="15px"
                  borderColor={Colors.main}
                  textColor={Colors.main}
                  _hover={{ borderColor: `${Colors.secondary}` }}
                >
                  <Text marginTop="6px" marginLeft="10px">
                    Photo Product
                  </Text>
                  <InputGroup>
                    <Input
                      name="image"
                      onChange={handleOnChange}
                      position="absolute"
                      type="file"
                      aria-hidden="true"
                      opacity="0"
                      marginTop="-25px"
                      accept=".png, .jpg, .jpeg"
                    />
                    <InputRightElement
                      children={<Clip fontSize="20px" />}
                      position="absolute"
                      marginTop="-30px"
                      marginRight="10px"
                    />
                  </InputGroup>
                </Box>
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
                  Add Product
                </Button>
              </form>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" flexGrow={1}>
            <Image src={preview} minWidth="280px" width="320px" />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AddProduct;
