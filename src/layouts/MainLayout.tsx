import { ReactNode } from 'react';

type MainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: MainProps) => {
  return (
    <div className="h-[320px] w-[480px] border-solid border-2 border-black p-2">
      {props.meta}

      <div className="w-full relative">
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Main;
