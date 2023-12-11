import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To M shopy',
  description: 'Our Site Sell Best Dresses',
  keywords: 'Shirt, coat pant, watch, pant,',
};

export default Meta;
