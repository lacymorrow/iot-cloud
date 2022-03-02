import { NavigateBefore } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import Link from 'next/link';

import Meta from '../../components/Meta';
import Layout from '../../layouts/MainLayout';
import config from '../../utils/config';

const Pair = () => (
  <Layout
    meta={
      <Meta
        title={`Pair | ${config.title}: ${config.tagline}`}
        description={config.description}
      />
    }
  >
    <Stack spacing={2}>
      <h4 className="my-0">Pair Smartcloud</h4>

      <Link href="/dashboard" passHref>
        <Button
          sx={{ width: '100%' }}
          startIcon={<NavigateBefore />}
          variant="contained"
        >
          Back
        </Button>
      </Link>
    </Stack>
  </Layout>
);

export default Pair;
