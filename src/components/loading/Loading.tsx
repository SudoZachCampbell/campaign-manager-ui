import 'components/loading/Loading.styles.scss';
import { ClipLoader } from 'react-spinners';

export const Loading = () => (
  <div className="loading__container">
    <ClipLoader />
  </div>
);
