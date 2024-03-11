import { Layout } from 'antd';

const { Sider, Content } = Layout;
export const UserLoginTemplate = ({ Component }) => {
    return <>
        <Layout style={{ backgroundColor: 'lightgreen' }}>
            <Sider style={{ height: window.innerHeight }} width="60%">
                <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} alt='image for login page' src="https://img.freepik.com/premium-vector/network-connection-background-abstract-style_23-2148875738.jpg" />
            </Sider>
            <Content className='d-flex justify-content-center flex-column m-5'>
                <h3 className='text-center text-danger' style={{ fontSize: '40px' }}>Login</h3>
                <Component />
            </Content>
        </Layout>
    </>
} 