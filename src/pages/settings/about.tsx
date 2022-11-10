import { NavigateBefore } from '@mui/icons-material';
import { Button } from '@mui/material';
import Link from 'next/link';

import Meta from '../../components/Meta';
import Layout from '../../layouts/MainLayout';
import config from '../../utils/config';

const About = () => (
  <Layout
    meta={
      <Meta
        title={`About | ${config.title}: ${config.tagline}`}
        description={config.description}
      />
    }
  >
    <h4 className="my-0">Smartcloud</h4>
    <p>About Smartcloud</p>
    <Link href="/dashboard" passHref>
      <Button
        sx={{ width: '100%' }}
        startIcon={<NavigateBefore />}
        variant="contained"
      >
        Back
      </Button>
    </Link>
  </Layout>
);

export default About;
