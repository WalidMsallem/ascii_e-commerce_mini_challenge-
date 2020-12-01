const { Menu, Dropdown, Button } = antd;

const Layout = ({ children }) => {
  return (
    <Layout>
      <Header />
      {children}
    </Layout>
  );
};
