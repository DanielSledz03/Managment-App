import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const refreshTokenAPI = async (refreshToken: string) => {
  const axiosInstance = axios.create({
    baseURL: 'http://192.168.0.164:3000', // Twoje API endpoint
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  try {
    const response = await axiosInstance.post('/auth/refresh', {
      // Wyślij dane wymagane do odświeżenia tokena, np. refresh token
      refresh_token: refreshToken,
    });

    // Odpowiedź powinna zawierać nowy access token
    const newAccessToken = response.data.access_token;

    await AsyncStorage.setItem('access_token', newAccessToken);

    // Możesz tutaj zapisywać nowy token w odpowiednim miejscu,
    // na przykład w pamięci lokalnej, stanu aplikacji, itp.

    return newAccessToken;
  } catch (error) {
    // Obsługa błędów, np. gdy refresh token wygasł
    console.error('Error during token refresh:', error);
    throw error;
  }
};

export default refreshTokenAPI;
