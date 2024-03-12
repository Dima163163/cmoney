import logo from '../../assets/img/logo.svg';
import Layout from '../Layout';
import style from './Footer.module.css';

export const Footer = () => (
  <footer className={style.footer}>
    <Layout>
      <div className={style.footerContainer}>
        <img src={logo} alt='Логотип компании C-Money'/>
        <div className={style.footerText}>
          © C-Money, 2022
        </div>
      </div>
    </Layout>
  </footer>
);
