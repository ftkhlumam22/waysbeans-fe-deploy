import { Box, Button, Image, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import produk from '../../assets/images/produk1.png';
import { Colors } from '../../assets/data/colors/color';
import { Link, useParams } from 'react-router-dom';
import { API } from '../../config/api';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

function DetailProduk() {
  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  let number = params.id;

  let { data: productDetails } = useQuery('detailCache', async () => {
    const response = await API.get(`/product/${number}`);
    console.log(response);
    return response.data.data;
  });

  let qty = 1;
  let price_cart = productDetails?.price;

  const handleSubmit = useMutation(async e => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await API.post('/transaction', config);

      const body = JSON.stringify({
        product_id: parseInt(params.id),
        qty: qty,
        amount: price_cart,
      });

      await API.post('/cart', body, config);

      toast({
        title: 'Add product to cart success',
        status: 'success',
        duration: 4000,
        position: 'bottom-right',
        isClosable: true,
      });

      navigate('/cart');
    } catch (error) {
      toast({
        title: 'Add product to cart error',
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
        <Box display="flex" gap={8} width="full">
          <Box display="flex" justifyContent="flex-end" flexGrow={1}>
            <Image src={productDetails?.image} minWidth="300px" width="350px" />
          </Box>
          <Box flexGrow={4}>
            <Box marginY="10px">
              <Text fontSize="36px" fontWeight="semibold" color={Colors.main}>
                {productDetails?.name}
              </Text>
              <Text fontSize="15px" marginTop="5px" color={Colors.font}>
                Stock : {productDetails?.stock}
              </Text>
              <Text fontSize="15px" marginTop="20px" textAlign="justify">
                {productDetails?.description}
              </Text>
              <Text
                textAlign="end"
                marginY="20px"
                fontSize="22px"
                fontWeight="bold"
                color={Colors.font}
              >
                Rp {productDetails?.price}
              </Text>
              <Button
                onClick={e => handleSubmit.mutate(e)}
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
                Add To Cart
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default DetailProduk;
