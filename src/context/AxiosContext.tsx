import React, {createContext, ReactElement} from 'react';
import axios from 'axios';
// import {AuthContext} from './AuthContext';
// import createAuthRefreshInterceptor from 'axios-auth-refresh';
// import * as Keychain from 'react-native-keychain';
import {useAppSelector} from '../redux/hooks';
import {Envs} from '../utils/env';

type AxiosContextType = {
  authAxios: any;
  publicAxios: any;
};

const AxiosContext = createContext({} as AxiosContextType);
const {Provider} = AxiosContext;

const AxiosProvider: React.FC<{children: ReactElement}> = ({children}) => {
  //   const authContext = useContext(AuthContext);
  const {accessToken} = useAppSelector(state => state.auth);

  const authAxios = axios.create({
    baseURL: Envs.apiLocal,
  });

  const publicAxios = axios.create({
    baseURL: Envs.apiLocal,
  });

  authAxios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  //   const refreshAuthLogic: (error: any) => Promise<any> = failedRequest => {
  //     const data = {
  //       refreshToken: authContext.authState.refreshToken,
  //     };

  //     const options = {
  //       method: 'POST',
  //       data,
  //       url: 'http://localhost:3001/api/refreshToken',
  //     };

  //     return axios(options)
  //       .then(async tokenRefreshResponse => {
  //         failedRequest.response.config.headers.Authorization =
  //           'Bearer ' + tokenRefreshResponse.data.accessToken;

  //         authContext.setAuthState({
  //           ...authContext.authState,
  //           accessToken: tokenRefreshResponse.data.accessToken,
  //         });

  //         await Keychain.setGenericPassword(
  //           'token',
  //           JSON.stringify({
  //             accessToken: tokenRefreshResponse.data.accessToken,
  //             refreshToken: authContext.authState.refreshToken,
  //           }),
  //         );

  //         return Promise.resolve();
  //       })
  //       .catch(e => {
  //         authContext.setAuthState({
  //           accessToken: null,
  //           refreshToken: null,
  //         });
  //       });
  //   };

  //   createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}>
      {children}
    </Provider>
  );
};

export {AxiosContext, AxiosProvider};
