import type { NextApiRequest, NextApiResponse } from 'next';
import { format } from 'date-fns';
import md5 from 'md5';
import { encode } from 'js-base64';
import request from '@/service/fetch';
import { withIronSessionApiRoute } from 'iron-session/next'; //在next中用来保存信息的
import { ironOptions } from '../../../../config/index';
import { ISession } from '../index';

type Data = {
  code: number,
  data?: any,
  msg:string
};

// 第一个传方法,第二个传配置项
export default withIronSessionApiRoute(sendVerifyCode, ironOptions);

async function sendVerifyCode(req: NextApiRequest, res: NextApiResponse<Data>) {
  const session:ISession = req.session;
  const { to = '', templateId = '' } = req.body;
  const AccountId = '2c94811c8b1e335b018c160accc93a7a';
  const AuthToken = 'f4e7544f4f1b42b598e9fe0217d4584c';
  const NowDate = format(new Date(), 'yyyyMMddHHmmss');
  const SigParameter = md5(`${AccountId}${AuthToken}${NowDate}`);
  const Authorization = encode(`${AccountId}:${NowDate}`);
  const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  const expireMinute = '5';
  const AppId = '2c94811c8b1e335b018c160ace573a81';
  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`;

  const response = await request.post(
    url,
    {
      to,
      templateId,
      appId: AppId,
      datas: [verifyCode, expireMinute],
    },
    {
      headers: {
        Authorization,
      },
    }
  );
  console.log(response); //打印是在终端看

  const {statusCode,statuMsg,templateSMS} = response as any
  if(statusCode==='000000'){
    session.verifyCode = verifyCode
    await session.save()
    res.status(200).json({
      code: 0,
      msg:statuMsg,
      data: templateSMS,
    });
  }else{
  res.status(200).json({
    code: 500,
    msg:statuMsg,
    data: templateSMS,
  });
  }
}
