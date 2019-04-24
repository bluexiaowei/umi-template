import React from 'react';
import { Layout } from 'antd';

export default ({ children }: { children: JSX.Element }): JSX.Element => {
  return (
    <Layout style={{ height: '100%' }}>
      <Layout.Sider>Sider</Layout.Sider>
      <Layout>
        <Layout.Header>Header</Layout.Header>
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};
