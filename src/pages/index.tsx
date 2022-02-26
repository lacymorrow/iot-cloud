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

import { useEffect, useState } from 'react';

import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from 'next/link';

import Meta from '../components/Meta';
import QrCode from '../components/QrCode';
import getHardwareId from '../lib/py/getHardwareId';
import HomeLayout from '../templates/MainLayout';
import config from '../utils/config';

const Index = () => {
  const [hwId, setHwid] = useState('');
  const [isLoading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const id = await getHardwareId();
    setHwid(id);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <HomeLayout
      meta={
        <Meta
          title={`About | ${config.title}: ${config.tagline}`}
          description={config.description}
        />
      }
    >
      <Meta
        title={`${config.title}: ${config.tagline}`}
        description={config.description}
      />

      <div className="text-center">
        <p>{isLoading ? 'loading...' : hwId || 'Error loading'}</p>
        <QrCode data={hwId} />
        <h5>
          <Link href="/wifi">
            <a>WiFi Setup</a>
          </Link>
        </h5>
        <LoadingButton
          // onClick={handleClick}
          endIcon={<SendIcon />}
          loading={true}
          loadingPosition="end"
          variant="contained"
        >
          Send
        </LoadingButton>
      </div>
    </HomeLayout>
  );
};

export default Index;
