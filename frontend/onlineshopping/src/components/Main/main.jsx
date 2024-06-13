import React, { useState } from 'react';

import {
    MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, ShoppingCartOutlined,
    ShoppingOutlined, SettingOutlined, LogoutOutlined,
} from '@ant-design/icons';

import {
    Menu, Flex, Input, Layout, theme, Button,
    message,
} from 'antd';

import client, { removeAccessToken } from '../../api/axios';
import AccountView from './AccountView';
import RandomProductView from './RandomProductView';
import CartView from './CartView';

const { Search } = Input;
const { Header, Sider, Content } = Layout;

const Main = () => {

    const [viewIndex, setViewIndex] = useState('1');

    // Menu click event
    const menuHandle = (event) => {
        let key = event.key;

        if (key == '1') {
            setViewIndex('1');
            console.log("switch product view");
        }
        else if (key == '2') {
            setViewIndex('2');
            console.log("switch cart view");
        }
        else if (key == '4') {
            setViewIndex('4');
            console.log("switch account view");
        }
        else if (key == '5') {
            setViewIndex('5');
            removeAccessToken();
            window.location.replace('/login')
        }
    };

    const onSearch = (keyword, event) => {
        console.log(keyword, event);

        if (keyword == '') {
            message.config({
                maxCount: 1,
                duration: 1
            })
            message.info("Please input the search content")
            return
        }

        client.post("product/search", {
            keyword
        }).then((response) => {
            console.log(response)
        }).catch(error => {
            console.log(error);
        });
    }

    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

    return (
        <Layout style={{ height: '100vh', }}>
            <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
                <Menu onClick={menuHandle}
                    mode="inline"
                    defaultSelectedKeys={['1']} defaultOpenKeys={['main']}
                    items={[
                        {
                            key: 'main', label: 'Shopping', icon: <ShoppingOutlined />,
                            children: [
                                {
                                    key: '1', label: 'Goods', icon: <ShoppingOutlined />,
                                },
                                {
                                    key: '2', label: 'Cart', icon: <ShoppingCartOutlined />,
                                },
                            ],
                        },
                        { type: 'divider', },
                        {
                            key: 'setting', label: 'Setting', icon: <SettingOutlined />,
                            children: [
                                {
                                    key: '4', label: 'Account', icon: <UserOutlined />,
                                },
                                {
                                    key: '5', label: 'Logout', icon: <LogoutOutlined />,
                                },
                            ],
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, }}>
                    <Flex>
                        <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{ fontSize: '16px', width: 64, height: 64, }}
                        />

                        <Flex style={{ align: 'center', justify: 'center', width: '70%', }}>
                            <Search onSearch={onSearch} style={{ height: 64, paddingTop: 15, }} placeholder="search goods" enterButton />
                        </Flex>
                    </Flex>
                </Header>

                <Content style={{ flexFlow: 'column', margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, borderRadius: borderRadiusLG, }} >

                    <div style={{ display: viewIndex == '1' ? 'inline' : 'none' }}><RandomProductView /></div>
                    <div style={{ display: viewIndex == '2' ? 'inline' : 'none' }}><CartView /></div>
                    <div style={{ display: viewIndex == '4' ? 'inline' : 'none' }}><AccountView /></div>
                    <div style={{ display: viewIndex == '5' ? 'inline' : 'none' }}>Logout</div>

                </Content>
            </Layout>
        </Layout>
    );

};

export default Main;