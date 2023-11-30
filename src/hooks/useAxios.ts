import { RootState } from '@store/index';
import axios from 'axios';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';

export const useAxios = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const axiosInstance = axios.create({
    baseURL: Config.HOSTNAME,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return axiosInstance;
};
