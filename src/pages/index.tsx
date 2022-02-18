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
import QRCode from '../components/QRCode';
import { BigTitle } from '../styles/index.styles';
import HomeLayout from '../templates/MainLayout';
import config from '../utils/config';
import { generateRandom } from '../utils/utils';

const Index = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Runs on mount only
    setImageIndex(generateRandom(config.totalImages));

    // Fade in clipped image
    if (!active) {
      setTimeout(() => {
        setActive(true);
      }, 2500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      <BigTitle
        className="text-8xl sm:text-12xl"
        active={active}
        src={`/assets/images/shots/${imageIndex}.jpg`}
        content={'Welcome.'}
      >
        Welcome.
      </BigTitle>

      <div className="text-center">
        <h1>SmartCloud ID</h1>
        <h2>
          <Link href="/wifi">
            <a>WiFi Setup</a>
          </Link>
        </h2>

        <QRCode />
      </div>
    </HomeLayout>
  );
};

export default Index;
