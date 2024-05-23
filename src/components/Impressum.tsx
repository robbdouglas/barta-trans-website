import { useTranslation } from 'react-i18next';
import Footer from './Footer';
import Header from './Header';
// import '../styles/Impressum.css';

function Impressum() {
  const { t } = useTranslation();

  return (
    <div className="impressum-container">
      <Header />
      <h1>{t('impressum.title')}</h1>
      <p><strong>{t('impressum.info')}</strong></p>
      <p>{t('impressum.company')}</p>
      
      <p><strong>{t('impressum.representedBy')}</strong></p>
      <p>{t('impressum.representatives')}</p>
      
      <p><strong>{t('impressum.contact')}</strong></p>
      <p>{t('impressum.phone1')}</p>
      <p>{t('impressum.phone2')}</p>
      <p>{t('impressum.email')}</p>
      
      <p><strong>{t('impressum.vatNumber')}</strong></p>
      <p>{t('impressum.vat')}</p>
      
      <p><strong>{t('impressum.responsible')}</strong></p>
      <p>{t('impressum.responsiblePerson')}</p>
      <Footer />
    </div>
  );
}

export default Impressum;
