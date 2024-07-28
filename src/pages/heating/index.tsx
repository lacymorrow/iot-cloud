import { Button, buttonVariants } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { createCron, deleteCron, pyget, pyset } from '@/lib/py/pyapi';
import pylog from '@/lib/py/pylog';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CRON_NAME = 'trigger';

export default function Heating() {
    const [temperature, setTemperature] = useState(0);
    const router = useRouter();

    useEffect(() => {
        pyget(CRON_NAME).then((result: any) => {
            if (result) {
                pylog(result);
                setTemperature(result);
            }
        });
    }, []);

    const handleTurnOff = async () => {
        await pyset(CRON_NAME, '0');
        await deleteCron(CRON_NAME)
            .then((result) => {
                pylog(result);
                router.push('/schedule');
            })
            .catch((error) => {
                pylog(error);
            });
    };

    const handleTurnOn = async () => {
        await pyset(CRON_NAME, temperature);
        await createCron({
            name: CRON_NAME,
            cron: '* * * * * python /home/pi/Desktop/heating.py',
        })
            .then((result) => {
                pylog(result);
                router.push('/schedule');
            })
            .catch((error) => {
                pylog(error);
            });
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Heating</CardTitle>
                    <CardDescription className="flex justify-between gap-2">
                        Keep above this temperature
                        <span className="text-4xl font-bold">
                            {temperature || '--'}°F
                        </span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Slider
                        value={[temperature]}
                        onValueChange={(value) =>
                            value[0] && setTemperature(value[0])
                        }
                        min={50}
                        max={100}
                        step={1}
                    />
                </CardContent>
                <CardFooter className="flex justify-between gap-2">
                    <Link
                        href="/dashboard"
                        className={buttonVariants({ variant: 'secondary' })}
                    >
                        Back
                    </Link>
                    <div className="flex gap-2">
                        <Button
                            onClick={handleTurnOff}
                            className={buttonVariants({
                                variant: 'destructive',
                            })}
                        >
                            Turn off
                        </Button>
                        <Button
                            onClick={handleTurnOn}
                            className={buttonVariants({
                                variant: 'default',
                            })}
                        >
                            Turn on
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
