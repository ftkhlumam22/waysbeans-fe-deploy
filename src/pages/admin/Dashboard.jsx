import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { Colors } from '../../assets/data/colors/color';
import { API } from '../../config/api';

function Dashboard() {
  const statusValid = statusOrder => {
    if (statusOrder == 'Active') {
      return (
        <Td color="yellow.400" fontWeight="semibold">
          On Shoping
        </Td>
      );
    } else if (statusOrder == 'pending') {
      return (
        <Td color="teal.200" fontWeight="semibold">
          Waiting Approve and On The Way
        </Td>
      );
    } else if (statusOrder == 'success') {
      return (
        <Td color="green.400" fontWeight="semibold">
          Arrived
        </Td>
      );
    } else {
      <Td color="red.300" fontWeight="semibold">
        Cancel
      </Td>;
    }
  };

  let { data: transactions } = useQuery('alltranactionsCache', async () => {
    const response = await API.get(`/all-transaction`);
    return response.data.data;
  });
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
            Income Transaction
          </Text>
          <Table variant="simple" marginTop="30px">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Address</Th>
                <Th>Post Code</Th>
                <Th>Product Order</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions?.map((item, index) => (
                <Tr key={index}>
                  <Td>{item?.user?.name}</Td>
                  <Td>{item?.user?.address}</Td>
                  <Td>{item?.user?.postal_code}</Td>
                  <Td>{item?.cart?.product?.name}</Td>
                  {statusValid(item?.status)}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
