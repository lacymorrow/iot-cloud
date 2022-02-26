import Link from 'next/link';

import Meta from '../components/Meta';
import Layout from '../templates/MainLayout';
import config from '../utils/config';

const About = () => (
  <Layout
    meta={
      <Meta
        title={`About | ${config.title}: ${config.tagline}`}
        description={config.description}
      />
    }
  >
    <h1>Dashboard</h1>

    <h3>Device Name</h3>
    <h4>Device ID</h4>
    <button>Toggle On/Off</button>

    <Link href="/settings">
      <a>Settings</a>
    </Link>
  </Layout>
);

export default About;
