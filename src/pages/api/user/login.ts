import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next'; //在next中用来保存信息的
import { ironOptions } from '../../../../config/index';
import { prepareConnection } from '../../../../db/index';
import { Users, User_auths } from '../../../../db/entity/index';
import { ISession } from '../index';

// 第一个传方法,第二个传配置项
export default withIronSessionApiRoute(login, ironOptions);

async function login(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;
  const { phone = '', verify = '', identity_type = 'phone' } = req.body;

  const db = await prepareConnection();
  const userAuthRepo = db.getRepository(User_auths);
  const userRepo = db.getRepository(Users);
  console.log(
    'All Users from the db: 01',
    session,
    // userAuthRepo.find(),
    await userRepo.find()
  );

  if (String(session.verifyCode) === String(verify)) {
    // 验证码正确,在user_auths表中查找identity_type是否有记录
    const userAuth = await userAuthRepo.findOne({
      where: {
        identifier: phone,
        identity_type,
      },
      relations: ['users'],
    });
    if (userAuth) {
      // 已存在的用户
      const user = userAuth.users;
      const { id, nickname, avatar } = user;
      session.userId = id;
      session.nickname = nickname;
      session.avatar = avatar;
      await session.save();
      res?.status(200).json({
        code: 0,
        msg: '登录成功',
        data: {
          userId: id,
          nickname,
          avatar,
        },
      });
    } else {
      // 新用户,自动注册
      const users = new Users();
      users.nickname = `用户_${new Date().getTime()}`;
      users.avatar = '/images/avatar.png';
      users.job = '暂无';
      users.introduce = '暂无';

      const userAuth = new User_auths();
      userAuth.identifier = phone;
      userAuth.identity_type = identity_type;
      userAuth.credential = session.verifyCode;
      userAuth.users = users;
      const resUserAuth = await userAuthRepo.save(userAuth);
      const {
        users: { id, nickname, avatar },
      } = resUserAuth;

      session.userId = id;
      session.nickname = nickname;
      session.avatar = avatar;
      await session.save();

      res?.status(200).json({
        code: 0,
        msg: '登录成功',
        data: {
          userId: id,
          nickname,
          avatar,
        },
      });
    }
  } else {
    res?.status(200).json({ code: -1, msg: '验证码错误' });
  }
}
