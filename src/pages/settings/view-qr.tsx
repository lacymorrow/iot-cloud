import { NavigateBefore } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import Link from 'next/link';

import Meta from '../../components/Meta';
import Qr from '../../components/Qr';
import useDevice from '../../components/useDevice';
import Layout from '../../layouts/MainLayout';
import config from '../../utils/config';

const Pair = () => {
  const { hwid } = useDevice();

  return (
    <Layout
      meta={
        <Meta
          title={`Pair | ${config.title}: ${config.tagline}`}
          description={config.description}
        />
      }
    >
      <Stack spacing={2}>
        <h4 className="my-0">Control your device</h4>
        <p>
          Scan the QR code with your phone or laptop to control your device from
          anywhere.
        </p>

        <Qr data={hwid} />

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
};

export default Pair;
