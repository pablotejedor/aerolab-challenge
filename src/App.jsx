import {
  Container,
  Wrap,
  Stack,
  WrapItem,
  Button,
  Text,
  StackDivider,
  Spinner
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import Header from './components/Header';
import Footer from './components/Footer';
import { getProducts, getUserData } from './services/apiService';

function App() {
  const [data, setData] = useState({
    userData: '',
    productList: null,
  });

  const [sortedBy, setSortedBy] = useState('none');

  useEffect(async () => {
    setData({
      userData: await getUserData(),
      productList: await getProducts(),
    });
  }, []);

  const sortByHighestPrice = () => {
    setData({
      ...data,
      productList: data.productList.sort((a, b) => b.cost - a.cost),
    });
    setSortedBy('highest');
  };

  const sortByLowestPrice = () => {
    setData({
      ...data,
      productList: data.productList.sort((a, b) => a.cost - b.cost),
    });
    setSortedBy('lowest');
  };
  console.log(data);

  return (
    <>
      <Container maxW={'100%'} px={1}>
        <Stack divider={<StackDivider />} spacing={6} align={'center'}>
          <Header userData={data.userData} />

          <Stack direction={'row'} align={'center'}>
            <Text color={'gray.500'}>Sort by:</Text>
            <Button
              onClick={() => sortByHighestPrice()}
              rounded={50}
              bg={sortedBy === 'highest' && 'primary'}
              variant={'outline'}
              color={sortedBy === 'highest' && 'white'}
            >
              Highest price
            </Button>
            <Button
              onClick={() => sortByLowestPrice()}
              rounded={50}
              bg={sortedBy === 'lowest' && 'primary'}
              variant={'outline'}
              color={sortedBy === 'lowest' && 'white'}
            >
              Lowest price
            </Button>
          </Stack>

          {data.productList ? (
            <Wrap justify={'center'}>
              {data.productList.map((product, i) => (
                <WrapItem key={product.name}>
                  <ProductCard
                    key={i}
                    product={product}
                    data={data}
                    setData={setData}
                  />
                </WrapItem>
              ))}
            </Wrap>
          ) : (
            <Spinner size={'xl'}/>
          )}

          <Footer />
        </Stack>
      </Container>
    </>
  );
}

export default App;
