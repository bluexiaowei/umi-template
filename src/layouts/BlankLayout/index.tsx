import React from 'react';

interface BlankProps extends React.Props<any> {
  children: JSX.Element;
}

const Blank: React.SFC<BlankProps> = ({ children }) => <div>{children}</div>;

export default Blank;
