import axios from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWVhMTAxZGIwMmE0ZDAwMjEwNDkzYmIiLCJpYXQiOjE2NDI3Mjk1MDF9.2p8RiutuvsD55yOgzdBSAQnzrQqDO5BvAheBXpQGFYE';

const baseUrl = 'https://coding-challenge-api.aerolab.co/';

const header = {
  Authorization: `Bearer ${token}`,
};

export const getUserData = async () => {
  try {
    const userData = await axios({
      method: 'GET',
      url: baseUrl + 'user/me',
      headers: header,
    });
    return userData.data;
  } catch (error) {
    throw new Error(error);
  }
};

//Note: you can only add points by 1000, 5000 or 7500, otherwise the request will fail
export const addPoints = async (amount = 1000) => {
  try {
    await axios({
      method: 'POST',
      url: baseUrl + 'user/points',
      headers: header,
      data: {
        "amount": amount
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const redeemProduct = async productId => {
  try {
    await axios({
      method: 'POST',
      url: baseUrl + 'redeem',
      headers: header,
      data: {
        productId: productId,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const getProducts = async () => {
  try {
    const products = await axios({
      method: 'GET',
      url: baseUrl + 'products',
      headers: header,
    });
    return products.data;
  } catch (error) {
    throw new Error(error);
  }
};
