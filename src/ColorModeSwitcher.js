import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Colors } from './assets/data/colors/color';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const bg = useColorModeValue('whiteAlpha.900', 'blackAlpha.300');
  const color = useColorModeValue(Colors.main, 'white');

  return (
    <IconButton
      variant="solid"
      backgroundColor={bg}
      onClick={toggleColorMode}
      icon={<SwitchIcon color={color} />}
      {...props}
    />
  );
};
