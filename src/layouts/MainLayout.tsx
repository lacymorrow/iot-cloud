import { ReactNode } from 'react';

import { PageWrapper, Wrapper } from '../styles/main.styles';

type MainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: MainProps) => {
  return (
    <PageWrapper className="h-[320px] w-[480px] border-solid border-2 border-black p-2">
      {props.meta}

      <div className="w-full relative">
        <Wrapper>{props.children}</Wrapper>
      </div>
    </PageWrapper>
  );
};

export default Main;
