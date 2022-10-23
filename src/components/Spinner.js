import { ThreeDots } from 'react-loader-spinner';

export default function Spinner(size) {
  return (
    <ThreeDots
      height={size}
      width={size}
      radius='9'
      color='#FFFFFF'
      ariaLabel='three-dots-loading'
      visible={true}
    />
  );
}