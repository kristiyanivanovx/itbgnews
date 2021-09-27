import { serialize } from 'cookie';

export default function handle(req, res) {
  res.setHeader(
    'Set-Cookie',
    serialize('accessToken', req.body.accessToken, {
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
