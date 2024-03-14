import {URL_API_WS} from '../../../../api/const';
import cn from 'classnames';
import {useEffect} from 'react';
import {useState} from 'react';
import style from './Rates.module.css';

export const Rates = () => {
  const [rates, setRates] = useState([]);
  const data = [];
  let count = 0;

  useEffect(() => {
    const ws = new WebSocket(URL_API_WS);
    ws.onmessage = e => {
      const dataSoc = JSON.parse(e.data);
      data.push(dataSoc);
      count += 1;
      if (count > 10) {
        data.shift();
      }
      setRates([...data]);
    };
    return () => ws.close();
  }, []);

  return (
    <div className={style.exchange__rates}>
      <div className={style.exchange__rates_wrap}>
        <h3 className={style.exchange__rates__title}>
          Изменение курса в режиме реального времни
        </h3>
        <ul className={style.exchange__rates_list}>
          {
            [...rates].map(el => (
              <li
                key={el.rate}
                className={el.change === 1 ?
                cn(style.exchange__rates_item, style.exchange__rates_item_up) :
                cn(style.exchange__rates_item, style.exchange__rates_item_down)}
              >
                <span className={style.exchange__rates_curency}>
                  {el.from}/{el.to}
                </span>
                <span className={style.exchange__rates_space}></span>
                <span className={style.exchange__rates_value}>
                  {el.change === 1 ? '+' : '-'}{el.rate.toFixed(2)}
                </span>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};
