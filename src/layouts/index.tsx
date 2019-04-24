import React from 'react';
import BlankLayout from './BlankLayout';
import ClassicLayout from './ClassicLayout';

interface Props {
  history?: History;
  location: Location;
  children: JSX.Element;
}

export default (props: Props): JSX.Element => {
  const { children, location } = props;
  const { pathname } = location;
  const BlankLayouts = ['/blank'];

  if (BlankLayouts.some(item => pathname.includes(item))) {
    return <BlankLayout children={children} />;
  } else {
    return <ClassicLayout children={children} />;
  }
};
