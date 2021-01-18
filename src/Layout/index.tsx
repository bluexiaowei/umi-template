import ModalPassword from '@/components/Modal/Password';

const Layout: React.FC = (props) => (
  <>
    {props.children}

    <ModalPassword />
  </>
);

export default Layout;
