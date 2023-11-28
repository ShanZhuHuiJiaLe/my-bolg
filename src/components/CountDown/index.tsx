import { useEffect, useState } from 'react';
import style from './index.module.scss';

interface IProps {
  time: number;
  onEnd: Function;
}

const CountDown = (props: IProps) => {
  const { time, onEnd } = props;

  const [count, setCount] = useState(time || 60);

  useEffect(() => {
    if (count === 0) {
      onEnd && onEnd();
      return;
    }
    setTimeout(() => setCount(count - 1), 1000);
  }, [count]);
  return <div className={style.style}>{count}</div>;
};
export default CountDown;
