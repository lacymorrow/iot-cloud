/*
	loading states
	SSR/SSG
	type: any
*/

import { useEffect, useState } from 'react';

import { NavigateNext } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Meta from '../components/Meta';
import Qr from '../components/Qr';
import useDevice from '../hooks/useDevice';
import Layout from '../layouts/MainLayout';
import config from '../utils/config';

const Index = () => {
  const [message, setMessage] = useState('initializing...');
  const { hwid } = useDevice();
  const router = useRouter();

  /* message countdown from 5 then redirect to /dashboard */
  useEffect(() => {
    if (hwid) {
      let count = 5;
      const interval = setInterval(() => {
        setMessage(`starting in ${count} seconds...`);
        count -= 1;
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        setMessage('starting...');
        router.push('/dashboard');
      }, 5000);
    }
  }, [hwid]);

  return (
    <Layout
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
        <h3>{message}</h3>
        <div className="max-w-72 mx-auto flex content-center justify-center">
          <Qr data={hwid} />
        </div>
        <Link href="/dashboard" passHref>
          <LoadingButton
            endIcon={<NavigateNext />}
            loading={!hwid}
            loadingPosition="end"
            variant="contained"
          >
            Dashboard
          </LoadingButton>
        </Link>
      </div>
    </Layout>
  );
};

export default Index;
