import React from 'react';
import BlankLayout from './BlankLayout';
import ClassicLayout from './ClassicLayout';

type LayoutComponent<P> = React.SFC<P>;

interface LayoutProps extends React.Props<any> {
  history?: History;
  location: Location;
  children: React.Element;
}

const AppLayout: LayoutComponent<LayoutProps> = props => {
  const { children, location } = props;
  const { pathname } = location;
  const BlankLayouts = ['/blank'];

  if (BlankLayouts.some(item => pathname.includes(item))) {
    return <BlankLayout children={children} />;
  } else {
    return <ClassicLayout children={children} />;
  }
};

export default AppLayout;
