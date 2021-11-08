import { serialize } from 'cookie';
import { ACCESS_TOKEN_NAME } from '../../utilities/names';

export default function handle(req, res) {
  res.setHeader(
    'Set-Cookie',
    serialize(ACCESS_TOKEN_NAME, req.body.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      sameSite: 'strict',
    }),
  );

  res.statusCode = 200;
  res.json({ success: true });
}
