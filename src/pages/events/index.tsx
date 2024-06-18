import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

export default function Events() {
    const router = useRouter();

    return (
        <div>
            <h1>Events</h1>
            <Button onClick={() => router.push('/events/create')}>
                Create new event
            </Button>
        </div>
    );
}
