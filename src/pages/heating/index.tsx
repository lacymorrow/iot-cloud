import { buttonVariants } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import Link from 'next/link';
import { useState } from 'react';

export default function Heating() {
    const [temperature, setTemperature] = useState(70);
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Heating</CardTitle>
                    <CardDescription className="flex justify-between gap-2">
                        Keep above this temperature
                        <span className="text-4xl font-bold">
                            {temperature}°F
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
                        <Link
                            href="/dashboard"
                            className={buttonVariants({
                                variant: 'destructive',
                            })}
                        >
                            Turn off
                        </Link>
                        <Link
                            href="/dashboard"
                            className={buttonVariants({ variant: 'default' })}
                        >
                            Turn on
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
