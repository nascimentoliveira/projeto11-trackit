import { ThreeDots } from 'react-loader-spinner';

export default function Spinner() {
  return (
    <ThreeDots
      height='60'
      width='60'
      radius='9'
      color='#FFFFFF'
      ariaLabel='three-dots-loading'
      visible={true}
    />
  );
}