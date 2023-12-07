import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next'; //在next中用来保存信息的
import { ironOptions } from '../../../../config/index';
import { prepareConnection } from '../../../../db/index'
import { Users, User_auths } from '../../../../db/entity/index';

// 第一个传方法,第二个传配置项
export default withIronSessionApiRoute(login, ironOptions);

async function login(req: NextApiRequest, res: NextApiResponse) {
  const { phone = '', verify = '' } = req.body;

  const savedPhotos =await prepareConnection()
  console.log("All Users from the db: 01", savedPhotos.getRepository(Users).find())

  res?.status(200).json({ data: { phone, verify }, code: 0 });
}
