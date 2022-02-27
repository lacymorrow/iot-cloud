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

import { useState, useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import Link from 'next/link';

import Meta from '../components/Meta';
import QrCode from '../components/QrCode';
import Layout from '../layouts/MainLayout';
import { getHardwareId, getIpAddress } from '../lib/py/pyapi';
import config from '../utils/config';

const Index = () => {
  const [ip, setIp] = useState('');
  const [hwid, setHwid] = useState('');

  const fetchData = async () => {
    const id = await getHardwareId();
    const ipAddr = await getIpAddress();
    setIp(ipAddr);
    setHwid(id);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        {ip && <p>IP: {ip}</p>}
        <button onClick={getIpAddress}>IP</button>
        <button onClick={getHardwareId}>HWID</button>
        <div className="max-w-72 mx-auto flex content-center justify-center">
          <QrCode data={hwid} />
        </div>
        <Link href="/wifi" passHref>
          <LoadingButton
            className="inline-block"
            // endIcon={<SendIcon />}
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
