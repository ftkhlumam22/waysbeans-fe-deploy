import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { Colors } from '../../assets/data/colors/color';
import Produk from '../../assets/images/produk3.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../config/api';

function ListProducts() {
  const [dataProduct, setDataProduct] = useState([]);

  useEffect(() => {
    const dataProduct = async () => {
      try {
        const response = await API.get('/products');
        setDataProduct(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataProduct();
  }, [setDataProduct]);

  const navigate = useNavigate();

  let handleDelete = async id => {
    await API.delete(`/product/` + id);
    const response = await API.get('/products');
    setDataProduct(response.data.data);
  };
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        height="87vh"
        marginX="250px"
        color={Colors.main}
      >
        <Box marginY="50px">
          <Text fontSize="24px" fontWeight="semibold">
            List Products
          </Text>
          <Table variant="striped" marginTop="30px">
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Name</Th>
                <Th>Stock</Th>
                <Th>Price</Th>
                <Th width="500px">Description</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataProduct.map((item, index) => (
                <Tr key={index}>
                  <Td>
                    <Image src={item?.image} width="60px" />
                  </Td>
                  <Td>{item?.name}</Td>
                  <Td>{item?.stock}</Td>
                  <Td>Rp {item?.price}</Td>
                  <Td>
                    <Box
                      height="100px"
                      overflowY="scroll"
                      css={{
                        '&::-webkit-scrollbar': {
                          width: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                          width: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          background: `${Colors.main}`,
                          borderRadius: '24px',
                        },
                      }}
                    >
                      <Text textAlign="justify" paddingX="10px">
                        {item?.description}
                      </Text>
                    </Box>
                  </Td>
                  <Td>
                    <Box display="flex" gap={2}>
                      <Button
                        colorScheme="red"
                        height="20px"
                        size="sm"
                        onClick={() => handleDelete(item?.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        colorScheme="linkedin"
                        height="20px"
                        size="sm"
                        onClick={() => navigate(`/update-product/${item?.id}`)}
                      >
                        Update
                      </Button>
                    </Box>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </>
  );
}

export default ListProducts;
