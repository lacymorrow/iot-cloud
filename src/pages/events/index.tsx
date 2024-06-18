import { Button } from '@/components/ui/button';
import { deleteCron, getCrons } from '@/lib/py/pyapi';
import pylog from '@/lib/py/pylog';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Events() {
    const router = useRouter();

    const [crons, setCrons] = useState([]);

    const fetchCrons = async () => {
        const result = await getCrons().then((data) => {
            return data.split('\n\n');
        });
        setCrons(result);
    };

    useEffect(() => {
        fetchCrons();
    }, []);

    const handleDelete = async (cron: string) => {
        await deleteCron(cron)
            .then(async () => {
                pylog('Cron deleted');
                await fetchCrons();
            })
            .catch(async (error) => {
                await pylog(error);
            });
    };

    return (
        <div>
            <h1>Events</h1>

            <ul>
                {crons.map((cron) => (
                    <li key={cron}>
                        <div className="flex justify-between">
                            <div>{cron}</div>
                            <Button onClick={() => handleDelete(cron)}>
                                Delete
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex justify-center">
                <Button
                    variant="secondary"
                    onClick={() => router.push('/dashboard')}
                >
                    Back
                </Button>
                <Button onClick={() => router.push('/events/create')}>
                    Create new event
                </Button>
            </div>
        </div>
    );
}
