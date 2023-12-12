import { ChangeEvent, useEffect, useState, useCallback } from 'react';
import style from './index.module.scss';
import CountDown from '../CountDown';
import { message } from 'antd';
import request from '@/service/fetch';

interface IProps {
  isShow: boolean;
  onClose: Function;
}
const Login = (props: IProps) => {
  const { isShow = false, onClose } = props;

  const [form, setForm] = useState({
    phone: '',
    verify: '',
  });
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false);

  /**
   * 关闭
   */
  const handleClose = () => {
    onClose && onClose();
  };

  /**
   * 获取验证码
   */
  const handleVerifyCode = () => {
    if (!form?.phone) {
      return message.info('请填写手机号', 2);
    }
    // 路径就是文件名
    request
      .post('/api/user/sendVerifyCode', {
        to: form?.phone,
        templateId: 1,
      })
      .then((res: any) => {
        if (res?.code === 0) {
          setIsShowVerifyCode(true);
        } else {
          message.error(res?.msg || '未知错误');
        }
      });
  };

  /**
   * 验证码倒计时结束
   */
  const handleCountDownEnd = useCallback(() => {
    setIsShowVerifyCode(false);
  }, []);

  /**
   * 登录
   */
  const handleLogin = () => {
    request
      .post('/api/user/login', { ...form, identity_type: 'phone' })
      .then((res: any) => {
        if (res?.code === 0) {
          // 登录成功
          onClose && onClose();
        } else {
          message.error(res?.msg || '未知错误');
        }
      });
  };

  /**
   * 使用github登录
   */
  const handleOAuthGit = () => {};

  /**
   * 表单改变
   */
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(form);
  }, [form]);
  return (
    isShow && (
      <div className={style.loginArea}>
        <div className={style.loginBox}>
          <div className={style.loginTitle}>
            <div>手机号登录</div>
            <div className={style.close} onClick={handleClose}>
              x
            </div>
          </div>
          <input
            name="phone"
            type="text"
            placeholder="请输入手机号"
            value={form.phone}
            onChange={handleFormChange}
          />
          <div className={style.verifyCodeArea}>
            <input
              name="verify"
              type="text"
              placeholder="请输入验证码"
              value={form.verify}
              onChange={handleFormChange}
            />
            <span className={style.verifyCode} onClick={handleVerifyCode}>
              {isShowVerifyCode ? (
                <CountDown time={10} onEnd={handleCountDownEnd} />
              ) : (
                '获取验证码'
              )}
            </span>
          </div>
          <div className={style.loginBtn} onClick={handleLogin}>
            登录
          </div>
          <div className={style.otherLogin} onClick={handleOAuthGit}>
            使用 Github 登录
          </div>
          <div className={style.loginPrivacy}>
            注册登录即表示同意 <a href="">用户协议、隐私政策</a>
          </div>
        </div>
      </div>
    )
  );
};

export default Login;
