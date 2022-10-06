import { Box, Image, Td, Text, Tr } from '@chakra-ui/react';
import React from 'react';
import { Colors } from '../assets/data/colors/color';
import { HiOutlineTrash as Delete } from 'react-icons/hi';

function CartItems({
  id,
  cartMinus,
  cartPlus,
  cart,
  produk,
  price,
  title,
  handleDelete,
}) {
  return (
    <div>
      <Tr>
        <Td display="flex" alignItems="center">
          <Image width="60px" src={produk} />
          <Box marginX="25px" display="flex" flexDirection="column" gap={4}>
            <Text fontWeight="bold">{title}</Text>
            <Box display="flex" gap={3}>
              <Text
                fontWeight="bold"
                fontSize="30px"
                onClick={() => cartMinus(id, cart, price)}
                cursor="pointer"
              >
                -
              </Text>
              <Text
                backgroundColor={Colors.card}
                paddingX="10px"
                borderRadius="4px"
              >
                {cart}
              </Text>
              <Text
                fontWeight="bold"
                fontSize="20px"
                onClick={() => cartPlus(id, cart, price)}
                cursor="pointer"
              >
                +
              </Text>
            </Box>
          </Box>
          <Box display="flex" width="full" justifyContent="flex-end">
            <Box
              display="flex"
              flexDirection="column"
              gap={4}
              alignItems="flex-end"
            >
              <Text>Rp {price}</Text>
              <Delete fontSize="23px" onClick={() => handleDelete(id)} />
            </Box>
          </Box>
        </Td>
      </Tr>
    </div>
  );
}

export default CartItems;
