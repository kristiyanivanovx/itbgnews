import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { getEnvironmentInfo, JWT_ACCESS_TIME } from '../utilities/common';
import jwt from 'jsonwebtoken';
import refreshToken from '../utilities/refreshToken';
import isTokenValid from '../utilities/isTokenValid';

function withTokens(Component) {
  return function AuthComponent({ ...props }) {
    const [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();
    const [userId, setUserId] = useState(null);
    const [cookies, setCookie] = useCookies(['accessToken']);

    useEffect(() => {
      if (!cookies || !cookies.accessToken) {
        return;
      }

      let isValid = isTokenValid(cookies.accessToken);

      // if token is valid, we do not need to set anything
      if (isValid || !userId) {
        return;
      }

      let newAccessToken = refreshToken(ENDPOINT, userId);

      // actually set the cookie
      // if we have the new token, set it and set the user id
      setCookie('accessToken', newAccessToken, {
        path: '/',
        maxAge: JWT_ACCESS_TIME,
      });

      setUserId(() => jwt.decode(cookies.accessToken).sub);
    }, [ENDPOINT, cookies, cookies.accessToken, setCookie, userId]);

    return <Component {...props} />;
  };
}

export default withTokens;
