import React from 'react';
import { Colors } from '../assets/data/colors/color';
import { Box, Image, Text } from '@chakra-ui/react';
import produk from '../assets/images/produk1.png';
import { Link } from 'react-router-dom';

function Cards({ image, name, price, stock, id }) {
  return (
    <>
      <Link to={`detail-products/${id}`}>
        <Box maxWidth="185px" minWidth="100px" backgroundColor={Colors.card}>
          <Image src={image} />
          <Box margin="10px">
            <Text textColor={Colors.main} fontWeight="bold" fontSize="14px">
              {name}
            </Text>
            <Box color={Colors.font} fontSize="11px" marginTop="8px">
              <Text>Rp {price}</Text>
              <Text>Stock : {stock}</Text>
            </Box>
          </Box>
        </Box>
      </Link>
    </>
  );
}

export default Cards;
