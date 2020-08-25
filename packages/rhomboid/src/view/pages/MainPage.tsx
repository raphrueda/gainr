import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import * as React from 'react';

const CLASS_NAME = 'main-page';
const LOGO_CLASS_NAME = `${CLASS_NAME}__logo`;
const SIDE_CLASS_NAME = `${CLASS_NAME}__side`;
const MAIN_CLASS_NAME = `${CLASS_NAME}__main`;
const CONTENT_CLASS_NAME = `${MAIN_CLASS_NAME}__content`;

interface MainPageProps {}

export const MainPage: React.FunctionComponent<MainPageProps> = () => (
    <Layout className={CLASS_NAME}>
        <Layout.Header>
            <div className={LOGO_CLASS_NAME} />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
        </Layout.Header>
        <Layout>
            <Layout.Sider className={SIDE_CLASS_NAME} trigger={<LaptopOutlined />} collapsible>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                        <Menu.Item key="1">option1</Menu.Item>
                        <Menu.Item key="2">option2</Menu.Item>
                        <Menu.Item key="3">option3</Menu.Item>
                        <Menu.Item key="4">option4</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                        <Menu.Item key="5">option5</Menu.Item>
                        <Menu.Item key="6">option6</Menu.Item>
                        <Menu.Item key="7">option7</Menu.Item>
                        <Menu.Item key="8">option8</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                        <Menu.Item key="9">option9</Menu.Item>
                        <Menu.Item key="10">option10</Menu.Item>
                        <Menu.Item key="11">option11</Menu.Item>
                        <Menu.Item key="12">option12</Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Layout.Sider>
            <Layout className={MAIN_CLASS_NAME}>
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout.Content className={CONTENT_CLASS_NAME}></Layout.Content>
                <Layout.Footer>This is a site.</Layout.Footer>
            </Layout>
        </Layout>
    </Layout>
);
