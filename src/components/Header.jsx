import { Image, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import Logo from '../favicon.svg';
import Coin from '../assets/icons/coin.svg';
import HeaderImg from '../assets/header.png';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
const Header = ({ userData }) => {
  return (
    <>
      <Stack>
        <Stack
          direction={'row'}
          align={'center'}
          justify={'space-between'}
          py={6}
          px={4}
          fontSize={['md', '2xl']}
          fontWeight="semibold"
          w={'100%'}
        >
          <Image src={Logo} h={12} w={12} />
          <Stack direction={'row'} spacing={6} align={'center'}>
            <Text>{userData.name}</Text>
            <Stack
              direction={'row'}
              bg={'gray.200'}
              px={4}
              rounded={50}
              align={'center'}
            >
              <Text color={'black'}>{userData.points}</Text>
              <Image src={Coin} h={7} w={7}/>
            </Stack>
            <ColorModeSwitcher />
          </Stack>
        </Stack>
        <Image src={HeaderImg} alt="header" w={'100%'} />
      </Stack>
    </>
  );
};

export default Header;
