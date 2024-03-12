import classNames from 'classnames';
import ReactDOM from 'react-dom';
import style from './ErrorMessage.module.css';

export const ErrorMessage = ({message}) => {
  let mess = '';

  if (message === 'Unknown currency code') {
    mess = 'Неверный валютный код';
  } else if (message === 'Not enough currency') {
    mess = 'Недостаточно средств на вашем счете';
  } else if (message === 'Invalid amount') {
    mess = 'Неверная сумма перевода';
  } else if (message === 'Invalid account form') {
    mess = 'Неверно указан счет списания';
  } else if (message === 'Invalid account to') {
    mess = 'Неверно указан счет зачисления';
  } else if (message === 'Overdraft prevented') {
    mess = 'Неверно указанна сумма списания, проверьте баланс вашего счета';
  } else {
    mess = 'Возникла ошибка';
  }

  return ReactDOM.createPortal(
    <div
      className={classNames(style.topright, style.warning, style.doshow)}>
      {mess}
    </div>,
    document.getElementById('error-root'),
  );
};
