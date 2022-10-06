import { Box, Image, Text, Badge } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../assets/data/colors/color';
import Profile from '../../assets/images/user.png';
import Produk from '../../assets/images/produk2.png';
import Logo from '../../assets/images/Icon.png';
import QR from '../../assets/images/QR.png';
import { API } from '../../config/api';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import TransactionCard from '../../component/TransactionCard';

function ProfileDetails() {
  const [dataTrans, setDataTrans] = useState([]);
  const params = useParams();
  let id = params.id;

  useEffect(() => {
    const dataTrans = async () => {
      try {
        const response = await API.get('/transactions');
        setDataTrans(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataTrans();
  }, [setDataTrans]);

  let { data: user } = useQuery('userCache', async () => {
    const response = await API.get(`/user/${id}`);
    return response.data.data;
  });

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        marginX="250px"
        color={Colors.main}
      >
        <Box marginY="50px">
          <Box display="flex">
            <Box flexGrow={1}>
              <Text fontSize="21px" fontWeight="semibold">
                My Profile
              </Text>
              <Box display="flex" marginTop="25px" gap={3}>
                <Image src={Profile} width="150px" borderRadius="md" />
                <Box width="full" padding="12px" marginRight="10px">
                  <Box marginBottom="10px">
                    <Text fontWeight="semibold">Name</Text>
                    <Text fontSize="14px">{user?.name}</Text>
                  </Box>
                  <Box marginBottom="10px">
                    <Text fontWeight="semibold">Email</Text>
                    <Text fontSize="14px">{user?.email}</Text>
                  </Box>
                  <Box marginBottom="10px">
                    <Text fontWeight="semibold">Address</Text>
                    <Text fontSize="14px">{user?.address}</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box flexGrow={1}>
              <Text fontSize="21px" fontWeight="semibold">
                My Transaction
              </Text>
              <Box
                display="flex"
                flexDirection="column"
                marginTop="25px"
                gap={3}
              >
                {dataTrans.map((item, index) => (
                  <TransactionCard
                    Produk={item?.cart[0]?.product?.image}
                    Logo={Logo}
                    QR={QR}
                    title={item?.cart[0].product?.name}
                    price={item?.cart[0]?.product?.price}
                    qty={item?.cart[0]?.qty}
                    amount={item?.cart[0]?.amount}
                    statusOrder={item?.status}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProfileDetails;
