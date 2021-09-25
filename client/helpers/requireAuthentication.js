import getUserToken from '../utilities/getUserToken';

export default function requireAuthentication(getServerSideProps) {
  return async (context) => {
    const { req, res } = context;

    const token = getUserToken(req.headers.cookie);

    if (!token) {
      return {
        redirect: {
          destination: '/login',
          statusCode: 302,
        },
      };
    }

    return await getServerSideProps(context);
  };
}
