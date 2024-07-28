import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { deleteCron, getCrons } from '@/lib/py/pyapi';
import pylog from '@/lib/py/pylog';
import Link from 'next/link';
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
            <Card>
                <CardHeader>
                    <CardTitle>Events</CardTitle>
                    <CardDescription>
                        Schedule a time to turn on or off.
                    </CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Link href="/dashboard" className={buttonVariants({ variant: 'secondary' })}>
                        Back
                    </Link>
                    <Link href="/events/create" className={buttonVariants()}>
                        Create new event
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
