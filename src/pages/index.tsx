/*
  brand login/logout
  video autoplay
  meta
	pagination
	votes
	sharing
	flag
	comments
	loading states
	SSR/SSG
	type: any
*/

import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from 'next/link';
import useSWRImmutable from 'swr/immutable';

import Meta from '../components/Meta';
import QrCode from '../components/QrCode';
import getHardwareId from '../lib/py/getHardwareId';
import HomeLayout from '../templates/MainLayout';
import config from '../utils/config';

const fetcher = async () => {
  const hwid = await getHardwareId();
  return hwid;
};

const Index = () => {
  const { data: hwId, error } = useSWRImmutable('hardware-id', fetcher);

  return (
    <HomeLayout
      meta={
        <Meta
          title={`Smartcloud | ${config.title}: ${config.tagline}`}
          description={config.description}
        />
      }
    >
      <Meta
        title={`${config.title}: ${config.tagline}`}
        description={config.description}
      />

      <div className="flex flex-col content-center justify-center text-center">
        <p>{error ? 'Error' : hwId || 'loading'}</p>
        <QrCode data={hwId} />
        <LoadingButton
          endIcon={<SendIcon />}
          loading={!hwId}
          loadingPosition="end"
          variant="contained"
        >
          <Link href="/wifi">
            <a>WiFi Setup</a>
          </Link>
        </LoadingButton>
      </div>
    </HomeLayout>
  );
};

export default Index;
