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

import Link from 'next/link';

import Meta from '../components/Meta';
import QrCode from '../components/QrCode';
import getHardwareId from '../lib/py/getHardwareId';
import HomeLayout from '../templates/MainLayout';
import config from '../utils/config';

const Index = () => {
  const [data, setData] = useState('');
  const [isLoading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const hwId = await getHardwareId();
    setData(hwId);
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
      {/*
      <BigTitle
        className="text-8xl sm:text-12xl"
        active={active}
        src={`/assets/images/shots/${imageIndex}.jpg`}
        content={'Welcome.'}
      >
        Welcome.
      </BigTitle> */}

      <div className="text-center">
        {/* <h1>SmartCloud ID</h1> */}
        <h5>
          <Link href="/wifi">
            <a>WiFi Setup</a>
          </Link>
        </h5>
        <QrCode />
        <p>{isLoading ? 'loading...' : data}</p>
      </div>
    </HomeLayout>
  );
};

export default Index;
