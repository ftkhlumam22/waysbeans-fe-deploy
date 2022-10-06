import { Badge, Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { Colors } from '../assets/data/colors/color';

function TransactionCard({
  Produk,
  Logo,
  QR,
  title,
  price,
  qty,
  amount,
  statusOrder,
}) {
  const statusValid = () => {
    if (statusOrder == 'Active') {
      return (
        <Badge width="full" color="yellow.500" bg="yellow.200">
          On Shoping
        </Badge>
      );
    } else if (statusOrder == 'pending') {
      return (
        <Badge width="full" color="orange.500" bg="orange.200">
          Wait Approve and Will be Arrived
        </Badge>
      );
    } else if (statusOrder == 'success') {
      return (
        <Badge width="full" color=".500" bg="teal.200" textAlign="center">
          Completed
        </Badge>
      );
    }
  };
  return (
    <div>
      <Box width="full" backgroundColor={Colors.card}>
        <Box display="flex" padding="15px">
          <Box display="flex " flexGrow={1} gap={2}>
            <Image src={Produk} width="90px" />
            <Box fontSize="13px">
              <Text fontWeight="semibold">{title}</Text>
              {/* <Text fontWeight="semibold" fontSize="10px">
                Saturday,{' '}
                <span style={{ fontWeight: 'normal' }}>10 October 2022</span>
              </Text> */}
              <Box fontSize="11px" marginTop="20px">
                <Text>Price : Rp {price}</Text>
                <Text>Qty : {qty}</Text>
                <Text fontWeight="semibold">Sub Total : Rp {amount}</Text>
              </Box>
            </Box>
          </Box>
          <Box
            flexGrow={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={3}
            >
              <Image src={Logo} height="22px" />
              <Image src={QR} height="50px" />
              {statusValid()}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default TransactionCard;
