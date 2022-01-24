import {
  Flex,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Stack,
  Tooltip,
  Text,
  Button,
  useToast,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { getUserData } from '../services/apiService';
import { redeemProduct } from '../services/apiService';
import imgBuy from '../assets/icons/buy-blue.svg';
import imgCoin from '../assets/icons/coin.svg';
function ProductCard({ product, data, setData }) {
  const cantBePurchased = product.cost > data.userData.points;

  const toast = useToast();

  const redeemHandler = async () => {
    await redeemProduct(product._id);

    setData({
      ...data,
      userData: await getUserData(),
    });

    toast({
      title: 'Congrats!',
      description: 'Product redeemed! Enjoy your purchase',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <AnimatePresence>
      <Stack
        as={motion.div}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        whileHover={{ scale: 1.05 }}
      >
        <Flex p={2} w="full" alignItems="center" justifyContent="center">
          <Box
            bg={useColorModeValue('white', 'gray.800')}
            maxW="sm"
            borderWidth="1px"
            rounded="lg"
            shadow="lg"
            position="relative"
          >
            <Box
              backgroundImage={product.img.url}
              roundedTop="lg"
              w={'252px'}
              h={'182px'}
            >
              {cantBePurchased && (
                <Stack
                  position={'absolute'}
                  top={2}
                  right={2}
                  direction={'row'}
                  bg={'primary'}
                  color={'white'}
                  p={2}
                  fontSize="md"
                  fontWeight="semibold"
                  align={'center'}
                  rounded={'lg'}
                >
                  <Text>You need {product.cost - data.userData.points}</Text>
                  <Image src={imgCoin} alt="coin" h={5} w={5} />
                </Stack>
              )}
            </Box>

            <Stack align={'baseline'} p={6}>
              <Badge
                rounded="full"
                px="2"
                fontSize="0.8em"
                colorScheme="red"
                lineHeight="tight"
              >
                {product.category}
              </Badge>
              <Text
                fontSize="large"
                letterSpacing={'tighter'}
                fontWeight="semibold"
                lineHeight="tight"
              >
                {product.name}
              </Text>
              <Stack
                direction={'row'}
                align={'center'}
                justifyContent={'space-between'}
                w={'100%'}
              >
                <Stack direction={'row'} align={'center'} spacing={0}>
                  <Image src={imgCoin} h={7} w={7} />
                  <Text fontSize="2xl" fontWeight="semibold">
                    {product.cost}
                  </Text>
                </Stack>
                <Tooltip
                  label="Redeem now"
                  bg="white"
                  placement={'top'}
                  color={'gray.800'}
                  fontSize={'1.2em'}
                >
                  <Button variant={'ghost'} isDisabled={cantBePurchased}>
                    <Image
                      src={imgBuy}
                      h={7}
                      w={7}
                      alignSelf={'center'}
                      onClick={() => redeemHandler()}
                    />
                  </Button>
                </Tooltip>
              </Stack>
            </Stack>
          </Box>
        </Flex>
      </Stack>
    </AnimatePresence>
  );
}

export default ProductCard;
