import { ChangeEvent, useEffect, useState, useCallback } from 'react';
import style from './index.module.scss';
import CountDown from '../CountDown';

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
    setIsShowVerifyCode(true);
  };

  /**
   * 验证码倒计时结束
   */
  const handleCountDownEnd = useCallback(() => {
    console.log('handleCountDownEnd触发了');
    setIsShowVerifyCode(false);
  }, []);

  /**
   * 登录
   */
  const handleLogin = () => {};

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
                <CountDown time={1} onEnd={handleCountDownEnd} />
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
