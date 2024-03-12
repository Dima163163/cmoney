import ReactDom from 'react-dom';
import cn from 'classnames';
import style from './SuccessMessage.module.css';

export const SuccessMessage = () => ReactDom.createPortal(
  <div
    className={cn(style.topright, style.warning, style.doshow)}
  >
    Перевод произведен успешно!
  </div>,
  document.getElementById('error-root'),
);
