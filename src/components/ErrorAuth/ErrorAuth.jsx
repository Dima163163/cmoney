import classNames from 'classnames';
import ReactDOM from 'react-dom';
import style from './ErrorAuth.module.css';

export const ErrorAuth = () => ReactDOM.createPortal(
  <div
    className={classNames(style.topright, style.warning, style.doshow)}>
      Неверный логин или пароль, повторите попытку
  </div>,
  document.getElementById('error-root'),
);
