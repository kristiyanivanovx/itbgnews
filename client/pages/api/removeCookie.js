import { serialize } from 'cookie';
import { ACCESS_TOKEN_NAME } from '../../utilities/infrastructure/names';

export default function handle(req, res) {
  res.setHeader(
    'Set-Cookie',
    serialize(ACCESS_TOKEN_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0),
      path: '/',
      sameSite: 'strict',
    }),
  );

  res.statusCode = 200;
  res.json({ success: true });
}
