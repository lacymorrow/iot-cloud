/*
  Device boot page  

  update apt
  update firmware
	loading states
	type: any
  remove references to "Smartcloud"
*/

import { NavigateNext } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Meta from '../components/Meta';
import Qr from '../components/Qr';
import useDevice from '../hooks/useDevice';
import Layout from '../layouts/MainLayout';
import config from '../utils/config';

const Index = () => {
  const { hwid } = useDevice();
  const router = useRouter();
  const [statusMsg, setStatusMsg] = useState("Initializing device...");
  // const [countdown, setCountdown] = useState(0);

  useEffect(() => {

    if (hwid) {
      setStatusMsg("Checking device ID...");

      // countdown 5 seconds, then redirect to /device
      let count = 5;
      // setCountdown(count);
      const interval = setInterval(() => {
        setStatusMsg(`Starting... ${count}`);
        count--;
        // setCountdown(count);
        if (count === 0) {
          clearInterval(interval);
          router.push('/dashboard');
        }
      }, 1000);

            // Connect to API
      // fetch(`${config.api}/device/${hwid}`)
      //   .then(res => res.json())
      //   .then(data => {
      //     if (data.status === "ok") {
      //       setStatusMsg("Device found!");
      //       router.push(`/device/${hwid}`);
      //     } else {
      //       setStatusMsg("Device not found!");
      //     }
      //   })
      //   .catch(err => {
      //     setStatusMsg("Error!");
      //     console.error(err);
      //   });
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
        <h3>{statusMsg}</h3>
        <h4>Hardware ID:  {hwid || "..."}</h4>
        <div className="max-w-72 mx-auto flex content-center justify-center">
          <Qr data={hwid} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
