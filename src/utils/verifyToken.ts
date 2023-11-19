import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const verifyTokenAPI = async (refreshToken: string) => {
  const axiosInstance = axios.create({
    baseURL: 'http://192.168.0.164:3000', // Twoje API endpoint
  });
  try {
    const response = await axiosInstance.post('/auth/verifyToken', {
      // Wyślij dane wymagane do odświeżenia tokena, np. refresh token
      refreshToken: refreshToken,
    });

    console.log(response.data);

    // Odpowiedź powinna zawierać nowy access token
    const isValid = response.data.isValid;

    return isValid;
  } catch (error) {
    // Obsługa błędów, np. gdy refresh token wygasł
    console.error('Error during token refresh:', error);
    throw error;
  }
};

export default verifyTokenAPI;
