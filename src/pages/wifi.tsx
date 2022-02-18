import { useState } from 'react';

import { Form, Input, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useRouter } from 'next/router';

import Meta from '../components/Meta';
import Layout from '../templates/MainLayout';
import config from '../utils/config';

const Wifi = () => {
  const router = useRouter();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const onSkip = () => {
    router.push('/dashboard');
  };

  const onFinish = async (values: any) => {
    const { ssid, password } = values;

    // Todo: should we require an stop time?
    if (!ssid) {
      // error, no ssid
      return;
    }

    setLoading(true);

    // Schedule an event
    const response = await fetch('/api/internal/set-wifi', {
      body: JSON.stringify({
        ssid,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    setLoading(false);

    const result = await response.json();
    if (response.status === 200) {
      // Redirect on success
      console.log(result);
    }
  };

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
        <Form
          form={form}
          // onValuesChange={onValuesChange}
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          name="event"
          autoComplete="off"
          labelWrap
        >
          <Form.Item label="WiFi SSID (WiFi Name)" name="ssid">
            <Input placeholder="My WiFi Name" />
          </Form.Item>

          <Form.Item label="WiFi Password" name="eventName">
            <Input placeholder="P455w0Rd!" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="button" onClick={onSkip}>
              Skip (you can still control this device manually)
            </Button>
            <Button loading={loading} type="primary" htmlType="submit">
              Connect
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};
export default Wifi;
