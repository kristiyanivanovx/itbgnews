import { publicRuntimeConfig } from '../next.config';

const getEndpoint = () => {
  const ENV = process.env.NODE_ENV || 'development';
  const isProduction = ENV === 'production';
  return isProduction
    ? publicRuntimeConfig.REMOTE_BACKEND_HOST
    : publicRuntimeConfig.LOCAL_BACKEND_HOST;
};

export default getEndpoint;
