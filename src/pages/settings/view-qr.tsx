import Link from 'next/link';

import Qr from '../../components/Qr';
import useDevice from '../../hooks/useDevice';

const ViewQr = () => {
    const { hwid } = useDevice();

    return (
        <>
            <div className="flex flex-col">
                <h4 className="my-0">Control your device</h4>
                <p>
                    Scan the QR code with your phone or laptop to control your
                    device from anywhere.
                </p>

                <Qr data={hwid} />

                <Link href="/dashboard" passHref>
                    Back
                </Link>
            </div>
        </>
    );
};

export default ViewQr;
