import { useTranslation } from 'react-i18next';
import '../styles/Welcome.css';
import Footer from './Footer';
import Header from './Header';

function Welcome() {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <section className="welcome-container">
        <h1>{t('welcome.title')}</h1>
        <p>{t('welcome.description')}</p>
        <h2>{t('welcome.visionTitle')}</h2>
        <p>{t('welcome.visionDescription')}</p>
      </section>
      <Footer />
    </div>
  );
}

export default Welcome;
