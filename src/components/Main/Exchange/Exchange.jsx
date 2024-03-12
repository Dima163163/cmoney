import {API_URL} from '../../../api/const';
import cn from 'classnames';
import Rates from './Rates';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  currenciesRequestAsync
} from '../../../store/currencies/currenciesSlice';
import {
  currencyMyRequestAsync,
  updateCurrencyMy
} from '../../../store/exchange/exchangeSlice';
import SuccessMessage from '../../SuccessMesage';
import ErrorMessage from '../../ErrorMessage';
import style from './Exchange.module.css';

export const Exchange = () => {
  const token = useSelector(state => state.auth.token);
  console.log('token: ', token);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const {currenciesAll} = useSelector(state => state.currencies);
  console.log('currenciesAll: ', currenciesAll);
  const {currencyMy} = useSelector(state => state.exchange);
  console.log('currencyMy: ', currencyMy);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm();

  useEffect(() => {
    dispatch(currenciesRequestAsync());
    dispatch(currencyMyRequestAsync());
  }, []);


  const onSubmit = (data) => {
    fetch(`${API_URL}/currency-buy`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(data => data.json())
      .then(data => {
        console.log(data);
        if (!data.payload) {
          setMessage(data.error);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 3000);
        } else {
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
          }, 3000);
          dispatch(updateCurrencyMy(data.payload));
        }
        reset({amount: ''});
      })
      .catch(err => console.error(err));
  };

  return (
    <div className={style.exchange__container}>
      <h2 className={style.exchange__title}>Обмен валюты</h2>

      <section className={style.exchange__info}>
        <Rates/>
        <div className={style.exchange__form_wrap}>
          <h3 className={style.exchange__form_title}>Обмен валюты</h3>
          <form
            className={style.exchanget_form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className={style.exchange__form_label}>
              Откуда
              <select
                className={style.exchange__chart_select}
                {...register('from', {required: true})}
              >
                {currenciesAll.map((el, i) => (
                  <option key={i} value={el}>{el}</option>
                ))}
              </select>
            </label>
            <label className={style.exchange__form_label}>
              Куда
              <select
                className={style.exchange__chart_select}
                {...register('to', {required: true})}
              >
                {currenciesAll.map((el, i) => (
                  <option key={i} value={el}>{el}</option>
                ))}
              </select>
            </label>
            <label
              className={cn(style.exchange__form_label, style.label_input)}
              htmlFor='amount'
            >
            Сумма
              <input
                className={style.exchange__form_input}
                type='text'
                name='amount'
                {...register('amount', {
                  required: {
                    value: true,
                    message: 'Заполните данное поле'
                  },
                  pattern: {
                    value: /\d/,
                    message: 'Вводите только цифры'
                  }
                })}
                aria-invalid={!!errors.amount}
              />
              {errors.amount && (
                <p className={style.error}>
                  {errors.amount.message}
                </p>
              )}
            </label>
            <button type='submit' className={style.exchange__form_btn}>
              Обменять
            </button>
          </form>
        </div>

        <div className={style.currency__wrap}>
          <table className={style.currency_table}>
            <caption className={style.currency_title}>Мои валюты</caption>
            <tbody>
              {
                currencyMy ?
                Object.entries(currencyMy).map(el => (
                  <tr key={el[0]} className={style.currency_item}>
                    <td className={style.currency_code}>{el[1].code}</td>
                    <td className={style.currency_amount}>
                      {el[1].amount.toFixed(0)}
                    </td>
                  </tr>
                )) : (<tr><td>-</td></tr>)
              }
            </tbody>
          </table>
        </div>
      </section>
      {showSuccess && <SuccessMessage/>}
      {showError && <ErrorMessage message={message}/>}
    </div>
  );
};
