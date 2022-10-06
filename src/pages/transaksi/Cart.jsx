import React, { useState, useEffect } from 'react';
import produk from '../../assets/images/produk1.png';
import { Colors } from '../../assets/data/colors/color';
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tfoot,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { API } from '../../config/api';
import CartItems from '../../component/CartItems';

function Cart() {
  const navigate = useNavigate();
  const [dataCart, setDataCart] = useState([]);
  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    const dataCart = async () => {
      try {
        const response = await API.get('/cartby-transaction');
        setDataCart(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataCart();
  }, [setDataCart]);

  useEffect(() => {
    const dataUser = async () => {
      try {
        const response = await API.get('/check-auth');
        setDataUser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataUser();
  }, [setDataUser]);

  let total_Qty = 0;
  dataCart?.forEach(item => {
    total_Qty += item?.qty;
  });

  let total_Price = 0;
  dataCart?.forEach(item => {
    total_Price += item.product?.price * item?.qty;
  });

  let cartPlus = async (id, qty, price) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const newQty = qty + 1;
    const newPrice = newQty * price;
    const body = JSON.stringify({
      qty: newQty,
      amount: newPrice,
    });
    await API.patch(`/cart/${id}`, body, config);
    const response = await API.get('cartby-transaction');
    setDataCart(response.data.data);
  };
  let cartMinus = async (id, qty, price) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const newQty = qty - 1;
    const newPrice = newQty * price;
    const body = JSON.stringify({
      qty: newQty,
      amount: newPrice,
    });
    await API.patch(`/cart/${id}`, body, config);
    const response = await API.get('/cartby-transaction');
    setDataCart(response.data.data);
  };

  let handleDelete = async id => {
    await API.delete(`/cart/` + id);
    const response = await API.get('/cardby-transaction');
    setDataCart(response.data.data);
  };

  const data = {
    user_id: dataUser?.id,
    status: 'pending',
    total_price: total_Price,
  };

  const handleSubmit = useMutation(async e => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const body = JSON.stringify(data);
    const response = await API.patch('/transaction', body, config);
    const token = response.data.data.token;

    window.snap.pay(token, {
      onSuccess: function (result) {
        console.log(result);
        navigate('/profile');
      },
      onPending: function (result) {
        console.log(result);
      },
      onError: function () {
        alert('you closed the popup without finishing the payment');
      },
    });
  });

  useEffect(() => {
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const myMidTransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute('data-client-key', myMidTransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        height="87vh"
        marginX="250px"
        alignItems="center"
      >
        <Box display="flex" gap={8} width="full" marginTop="70px">
          <Box
            display="flex"
            justifyContent="flex-start"
            flexDirection="column"
            flexGrow={1}
            color={Colors.main}
          >
            <Text fontSize="20px" fontWeight="semibold" marginLeft="20px">
              My Cart
            </Text>
            <Table marginTop="20px">
              <Thead borderBottom="2px">
                <Tr>
                  <Th>Review Your Order</Th>
                </Tr>
              </Thead>
              <Tbody borderBottom="2px">
                {dataCart?.map(data => {
                  return (
                    <CartItems
                      id={data?.id}
                      cartPlus={cartPlus}
                      cart={data?.qty}
                      cartMinus={cartMinus}
                      produk={data?.product?.image}
                      title={data?.product?.name}
                      price={data?.product?.price}
                      handleDelete={handleDelete}
                    />
                  );
                })}
              </Tbody>
            </Table>
          </Box>
          <Box flexGrow={1} marginTop="55px" color={Colors.main}>
            <Table marginTop="35px">
              <Tbody borderBottom="1px" borderTop="1px">
                <Tr>
                  <Td display="flex" alignItems="center">
                    <Box
                      display="flex"
                      flexDirection="column"
                      gap={3}
                      flexGrow={1}
                      fontSize="15px"
                    >
                      <Text>Sub Total</Text>
                      <Text>Qty</Text>
                    </Box>
                    <Box flexGrow={1} display="flex" justifyContent="flex-end">
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap={3}
                        fontSize="15px"
                      >
                        <Text>Rp {total_Price}</Text>
                        <Text alignSelf="end">{total_Qty}</Text>
                      </Box>
                    </Box>
                  </Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Td borderBottom="0px">
                    <Box
                      display="flex"
                      gap={2}
                      fontSize="15px"
                      fontWeight="bold"
                    >
                      <Text>SubTotal</Text>
                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        width="full"
                      >
                        <Text>Rp {total_Price}</Text>
                      </Box>
                    </Box>
                  </Td>
                </Tr>
              </Tfoot>
            </Table>
            <Box display="flex" width="full" justifyContent="flex-end">
              <Button
                onClick={e => handleSubmit.mutate(e)}
                width="52"
                marginTop="20px"
                backgroundColor={Colors.main}
                textColor="white"
                _hover={{
                  borderWidth: '2px',
                  borderColor: `${Colors.main}`,
                  backgroundColor: 'white',
                  textColor: `${Colors.main}`,
                }}
              >
                Pay
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Cart;
