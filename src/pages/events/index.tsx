import { Button } from '@/components/ui/button';
import { getCrons } from '@/lib/py/pyapi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Events() {
    const router = useRouter();

    const [crons, setCrons] = useState([]);

    useEffect(() => {
        const fetchCrons = async () => {
            const data = await getCrons();
            setCrons(data);
        };
        fetchCrons();
    }, []);

    return (
        <div>
            <h1>Events</h1>
            {JSON.stringify(crons)}
            <Button onClick={() => router.push('/events/create')}>
                Create new event
            </Button>
        </div>
    );
}
