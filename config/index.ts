export const ironOptions = {
  cookieName: process.env.SESSION_COOKIE_NAME, //在nextjs中,如果把值显式地写在这里就是固定字符串,但也可以通过环境变量操作
  password: process.env.SESSION_PASSWORD,
  cookieOptions: {
    maxAge: 24 * 60 * 60 * 100,
    secure: process.env.NODE_ENV === 'production',
  },
};

// 登录的时候,服务端会给客户端注册sessionId,保存在cookie中,每次请求都会带上这个sessionId给
// 服务端,拿到session就会去匹配,匹配通过就说明是登录态,校验通过
// cookieName就是sessionId,这里叫什么,保存在cookie就叫什么
// password就是校验的密码,生成32位的密码就可以了
