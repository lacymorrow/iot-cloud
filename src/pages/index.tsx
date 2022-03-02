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

import { NavigateNext } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import Link from 'next/link';

import Meta from '../components/Meta';
import Qr from '../components/Qr';
import useDevice from '../hooks/useDevice';
import Layout from '../layouts/MainLayout';
import config from '../utils/config';

const Index = () => {
  const { hwid } = useDevice();

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
        <h3>Device {hwid}</h3>
        <div className="max-w-72 mx-auto flex content-center justify-center">
          <Qr data={hwid} />
        </div>
        <Link href="/wifi" passHref>
          <LoadingButton
            endIcon={<NavigateNext />}
            loading={!hwid}
            loadingPosition="end"
            variant="contained"
          >
            WiFi Setup
          </LoadingButton>
        </Link>
      </div>
    </Layout>
  );
};

export default Index;
