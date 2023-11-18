/*
	loading states
	SSR/SSG
	type: any
*/

import { useEffect, useState } from 'react';

import { NavigateNext } from '@mui/icons-material';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '@/components/ui/button';

import Qr from '../components/Qr';
import useDevice from '../hooks/useDevice';

const Index = () => {
    const [message, setMessage] = useState('Initializing...');
    const { hwid } = useDevice();
    const router = useRouter();

    /* message countdown from 5 then redirect to /dashboard */
    useEffect(() => {
        if (hwid) {
            let count = 2;
            const interval = setInterval(() => {
                setMessage(`Starting in ${count} seconds...`);
                count -= 1;
            }, 1000);
            setTimeout(() => {
                clearInterval(interval);
                setMessage('starting...');
                router.push('/dashboard');
            }, count * 1000);
        }
    }, [hwid, router]);

    return (
        <>
            <div className="flex flex-col content-center justify-center text-center">
                <h3>{message}</h3>
                <div className="mx-auto flex content-center justify-center">
                    <Qr data={hwid} />
                </div>
                <Button asChild {...(hwid ? {} : { disabled: true })}>
                    <Link href="/dashboard">
                        Dashboard{' '}
                        {hwid ? (
                            <NavigateNext />
                        ) : (
                            <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />
                        )}
                    </Link>
                </Button>
            </div>
        </>
    );
};

export default Index;
