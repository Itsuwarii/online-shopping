import React, { Fragment, useState, useEffect } from 'react';

import {
    MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined,
    UserOutlined, VideoCameraOutlined, ShoppingCartOutlined,
    ShoppingOutlined, LoadingOutlined, CheckOutlined,
    AppstoreOutlined, MailOutlined, SettingOutlined,
    StarOutlined, IdcardOutlined, LogoutOutlined,
    UnorderedListOutlined, MessageOutlined, ProductOutlined,
    CommentOutlined
} from '@ant-design/icons';

import {
    Menu, Flex, Affix, Avatar, Spin,
    Card, Skeleton, message, Switch, Input,
    Layout, theme, Button, Drawer, Radio,
    Space, List
} from 'antd';

import VirtualList from 'rc-virtual-list';
import client, { removeAccessToken } from '../../api/axios';

const { Search } = Input;
const { Header, Sider, Content } = Layout;
const { Meta } = Card;

function Main() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [data, setData] = useState([]);
    const ContainerHeight = 600;

    async function appendData() {
        // const respone = await client.get('/product/random')
        // setData(data.concat(respone.data));
        // console.log(data.concat(body.results));
        // message.success(` more items loaded!`);
    };

    useEffect(() => {
        appendData();
    }, []);

    const onScroll = (e) => {
        if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
            appendData();
        }
    };


    const loadingView = (

        <List gap="middle"
            style={{
                height: '100%',
                width: '100%',
            }}
        >
            <VirtualList
                warp
                data={data}
                height={ContainerHeight}
                itemHeight={47}
                itemKey="email"
                onScroll={onScroll}
            >
                {(item) => (
                    <>
                        <Flex gap="middle"
                            style={{
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <Card style={{ width: '25%', height: '200px', }}>
                                <Spin style={{ height: '120px', }} size='large'></Spin>
                                <br />
                                <Space style={{ fontSize: '25px', color: '#CCCCCC', }}>
                                    <CheckOutlined />
                                    <ShoppingCartOutlined />
                                    <StarOutlined />
                                </Space>
                            </Card>
                        </Flex>
                    </>
                )}

            </VirtualList>
        </List>

    );


    // View
 
    const [content, setContent] = useState(loadingView);

    React.useEffect(() => {
        client.get(`/product`).then((response) => {

        }).catch(error => {
            console.log(error);
        });
    }, []);

    // Menu click event
    const menuHandle = (event) => {
        let key = event.key;
        if (key == '1') {

        }
        else if (key == '2') {

        }
        else if (key == '3') {

        }
        else if (key == '4') {

        }
        else if (key == '5') {
            removeAccessToken();
            window.location.replace('/login')
        }
    };

    return (
        <Layout style={{
            height: '100vh',
        }}>
            <Sider trigger={null} collapsible collapsed={collapsed}
                theme="light">
                <div className="demo-logo-vertical" />
                <Menu
                    onClick={menuHandle}
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['main']}
                    items={[
                        {
                            key: 'main',
                            label: 'Sale',
                            icon: <UnorderedListOutlined />,
                            children: [
                                {
                                    key: '1',
                                    label: 'Orders',
                                    icon: <UnorderedListOutlined />,
                                },
                                {
                                    key: '2',
                                    label: 'Product',
                                    icon: <ProductOutlined />,
                                },
                                {
                                    key: '3',
                                    label: 'Dialogue',
                                    icon: <MessageOutlined />,
                                },
                            ],
                        },
                        {
                            type: 'divider',
                        },
                        {
                            key: 'setting',
                            label: 'Setting',
                            icon: <SettingOutlined />,
                            children: [
                                {
                                    key: '4',
                                    label: 'Account',
                                    icon: <UserOutlined />,
                                },
                                {
                                    icon: <LogoutOutlined />,
                                    key: '5',
                                    label: 'Logout',
                                },
                            ],
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Flex>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />

                        <Flex style={{
                            align: 'center',
                            justify: 'center',
                            width: '70%',
                        }}>
                            <Search
                                style={{
                                    height: 64,
                                    paddingTop: 15,
                                }}
                                placeholder="search goods" enterButton />
                        </Flex>
                    </Flex>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {content}
                </Content>
            </Layout>
        </Layout>

    );
};
export default Main;