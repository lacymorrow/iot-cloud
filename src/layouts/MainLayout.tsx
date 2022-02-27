import { ReactNode } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { PageWrapper, Wrapper } from '../styles/main.styles';
import config from '../utils/config';

type MainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: MainProps) => {
  const { pathname } = useRouter();
  return (
    <PageWrapper className="p-2 border-2 border-black">
      {props.meta}

      <div className="max-w-screen-sm w-full mx-auto relative">
        <div>
          {pathname !== '/' && (
            <div className="font-extrabold text-xl text-gray-900">
              <Link href="/">
                <a>{config.title}</a>
              </Link>
            </div>
          )}
        </div>

        <Wrapper>{props.children}</Wrapper>

        {/* <div className="border-t border-gray-300 text-center py-8 text-sm">
        © Copyright {new Date().getFullYear()} {config.title}
      </div> */}
      </div>
    </PageWrapper>
  );
};

export default Main;
