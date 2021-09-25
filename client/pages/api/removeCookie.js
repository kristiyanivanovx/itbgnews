import { serialize } from 'cookie';

export default function handle(req, res) {
  res.setHeader(
    'Set-Cookie',
    serialize('accessToken', '', {
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
