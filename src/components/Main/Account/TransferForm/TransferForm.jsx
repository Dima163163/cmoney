import {API_URL} from '../../../../api/const';
import {useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {updateTransactions} from '../../../../store/account/accountSlice';
import ErrorMessage from '../../../ErrorMessage';
import SuccessMessage from '../../../SuccessMesage';
import {useState} from 'react';
import style from './TransferForm.module.css';

export const TransferForm = () => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const {id} = useParams();
  const [showModalError, setShowModalError] = useState(false);
  const [showModalOk, setShowModalOk] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm({mode: 'onBlur', defaultValues: {
    to: '', amount: ''}});

  const onSubmit = data => {
    fetch(`${API_URL}/transfer-funds`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        from: id,
        amount: Number(data.amount),
      })
    })
      .then(data => data.json())
      .then(data => {
        console.log('data: ', data);
        if (!data.payload) {
          setMessage(data.error);
          setShowModalError(true);
          setTimeout(() => {
            setShowModalError(false);
          }, 3000);
        } else {
          setShowModalOk(true);
          setTimeout(() => {
            setShowModalOk(false);
          }, 3000);
          dispatch(updateTransactions(data.payload));
        }
        reset({to: '', amount: ''});
      })
      .catch(err => console.log(err));
  };

  return (
    <div className={style.account__form_wrap}>
      <h2 className={style.account__form_title}>Перевод</h2>
      <form
        className={style.account_form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className={style.account__form_label} htmlFor='to'>
          Счет
          <input className={style.account__form_input}
            {...register('to', {required: {value: true,
              message: 'Поле не заполнено'},
            pattern: {value: /\d{26}/, message: 'Проверьте номер карты'}
            })}
            type='text' id='to' aria-invalid={!!errors.to}
          />
          {errors.to && (<p className={style.error}>
            {errors.to.message}
          </p>)}
        </label>
        <label className={style.account__form_label} htmlFor='sum'>
          Сумма
          <input
            className={style.account__form_input}
            {...register('amount', {required: {value: true,
              message: 'Поле не заполнено'},
            pattern: {value: /\d/, message: 'Сумма не корректна'}
            })}
            type='text' id='amount' aria-invalid={!!errors.amount}
          />
          {errors.amount && (<p className={style.error}>
            {errors.amount.message}
          </p>)}
        </label>
        <button type='submit' className={style.account__form_btn}>
          Перевести
        </button>
      </form>
      {showModalError && <ErrorMessage message={message} />}
      {showModalOk && <SuccessMessage />}
    </div>
  );
};
