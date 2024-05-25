import { NextPage } from 'next';
import { useRouter } from 'next/router';

interface Props {}

const MyNextCoolPage: NextPage<Props> = () => {
  const router = useRouter();
  console.log(router);
  return <div>MyNextCoolPage</div>;
};

export default MyNextCoolPage;