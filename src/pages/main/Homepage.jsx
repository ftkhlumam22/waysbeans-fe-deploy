import { Box, Image } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import Header from '../../assets/images/Jumbotron.png';
import Cards from '../../component/Cards';
import { API } from '../../config/api';

function Homepage() {
  let { data: products } = useQuery('productsCache', async () => {
    const response = await API.get(`/products`);
    return response.data.data;
  });
  return (
    <>
      <Box display="flex" flexDirection="column" marginY="25px" marginX="150px">
        <Image src={Header} alignSelf="center" minWidth="500px" />
        <Box
          marginY="30px"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          flexWrap="wrap"
          gap="30px"
        >
          {products?.map(data => {
            return (
              <Cards
                id={data.id}
                name={data.name}
                price={data.price}
                image={data.image}
                stock={data.stock}
              />
            );
          })}
        </Box>
      </Box>
    </>
  );
}

export default Homepage;
