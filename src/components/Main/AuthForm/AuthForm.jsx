import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {submitAuthForm} from '../../../store/auth/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import ErrorAuth from '../../ErrorAuth';
import style from './AuthForm.module.css';

export const AuthForm = () => {
  const [showModal, setShowModal] = useState(false);
  console.log('showModal: ', showModal);
  const {token} = useSelector(state => state.auth);
  console.log('token: ', token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: {errors}
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      login: '',
      password: '',
    }
  });

  useEffect(() => {
    setFocus('login');
  }, [setFocus]);


  const onSubmit = (data) => {
    console.log('data: ', data);
    dispatch(submitAuthForm(data));
    if (!token) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    } else {
      navigate('/accounts');
    }
    reset({
      login: '',
      password: '',
    });
  };

  return (
    <div className={style.container}>
      <form
        className={style.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={style.wrap}>
          <h2 className={style.title}>Вход в аккаунт</h2>
          <label className={style.label} htmlFor='login'>
            Логин
            <input
              className={style.input}
              id='login'
              {
                ...register('login', {
                  required: {
                    value: true,
                    message: 'Введите login в данное поле'
                  },
                  pattern: {
                    value: /^[a-z]{6,10}$/,
                    message: 'Неправильный формат ввода логина',
                  }
                })
              }
              type='text'
              aria-invalid={!!errors.login}
            />
            {errors.login && (
              <p className={style.error}>{errors.login.message}</p>
            )}
          </label>

          <label className={style.label} htmlFor='password'>
            Пароль
            <input
              className={style.input}
              id='password'
              {
                ...register('password', {
                  required: {
                    value: true,
                    message: 'Введите пароль в данное поле'
                  },
                  pattern: {
                    value: /^[a-z]{6,10}$/,
                    message: 'Неправильный формат ввода пароля',
                  }
                })
              }
              type='password'
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className={style.error}>{errors.password.message}</p>
            )}
          </label>
          <button className={style.submit} type='submit'>Войти</button>
        </div>
      </form>
      {showModal && <ErrorAuth/>}
    </div>
  );
};
