import { PuffLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '0 auto 50px auto',
};

const Spinner = ({ color = '#90b36d', size = '150' }) => {
  return (
    <div>
      <PuffLoader
        color={color}
        size={size}
        cssOverride={override}
        aria-label='Loading...'
      />
    </div>
  );
};

export default Spinner;