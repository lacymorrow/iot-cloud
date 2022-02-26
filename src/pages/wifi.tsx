import Meta from '../components/Meta';
import Layout from '../templates/MainLayout';
import config from '../utils/config';

const Wifi = () => {
  // // const router = useRouter();
  // const [loading, setLoading] = useState(false);

  // const onSkip = () => {
  //   // router.push('/dashboard');
  // };

  // const onFinish = async (values: any) => {
  //   const { ssid, password } = values;

  //   if (!ssid) {
  //     // error, no ssid
  //     return;
  //   }

  //   setLoading(true);

  //   // Schedule an event
  //   const response = await fetch('/api/internal/set-wifi', {
  //     body: JSON.stringify({
  //       ssid,
  //       password,
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     method: 'POST',
  //   });

  //   setLoading(false);

  //   const result = await response.json();
  //   if (response.status === 200) {
  //     // Redirect on success
  //     console.log(result);
  //   }
  // };

  return (
    <Layout
      meta={
        <Meta
          title={`Wifi | ${config.title}: ${config.tagline}`}
          description={config.description}
        />
      }
    >
      <div className="block text-center ">
        <h1>Wifi Setup</h1>
      </div>
    </Layout>
  );
};
export default Wifi;
