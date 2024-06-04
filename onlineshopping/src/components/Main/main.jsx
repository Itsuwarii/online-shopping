import React, { Fragment, useState, useEffect } from 'react';

import {
    MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined,
    UserOutlined, VideoCameraOutlined, ShoppingCartOutlined,
    ShoppingOutlined, LoadingOutlined, CheckOutlined,
    AppstoreOutlined, MailOutlined, SettingOutlined,
    StarOutlined, IdcardOutlined, LogoutOutlined,
    CommentOutlined
} from '@ant-design/icons';

import {
    Menu, Flex, Affix, Avatar, Spin,
    Card, Skeleton, message, Switch, Input,
    Layout, theme, Button, Drawer, Radio,
    Space, List
} from 'antd';

import VirtualList from 'rc-virtual-list';
import client from '../../api/axios';
import axios from 'axios';

const { Search } = Input;
const { Header, Sider, Content } = Layout;
const { Meta } = Card;

function Main() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [data, setData] = useState([]);

    const fakeDataUrl = '';
    const ContainerHeight = 600;

    async function appendData() {
        const respone = await client.get('/product/random')
        setData(data.concat(respone.data));
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
        // <div style={{
        //     width: '100%',
        //     height: '100%',
        //     overflow: 'auto',
        // }}>
        //     <Affix>
        //         <Flex wrap gap="middle"
        //             style={{
        //                 height: '100%',
        //                 width: '100%',
        //             }}
        //         >
        //             <div style={{
        //                 width: '200px',
        //                 height: '200px',
        //                 // background: '#000000',
        //                 border: '1px solid #DDDDDD',
        //                 borderRadius: '10px',
        //                 padding: '20px',
        //             }}>
        //                 <Spin style={{ height: '120px', }} size='large'></Spin>
        //                 <br />
        //                 <Space style={{ fontSize: '25px', color: '#DDDDDD', }}>
        //                     <CheckOutlined />
        //                     <ShoppingCartOutlined />
        //                     <StarOutlined />
        //                 </Space>
        //             </div>

        //         </Flex>
        //     </Affix>
        // </div>

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

                            <Card style={{ width: '25%', height: '200px', }}>
                                <Spin style={{ height: '120px', }} size='large'></Spin>
                                <br />
                                <Space style={{ fontSize: '25px', color: '#CCCCCC', }}>
                                    <CheckOutlined />
                                    <ShoppingCartOutlined />
                                    <StarOutlined />
                                </Space>
                            </Card>

                            <Card style={{ width: '25%', height: '200px', }}>
                                <Spin style={{ height: '120px', }} size='large'></Spin>
                                <br />
                                <Space style={{ fontSize: '25px', color: '#CCCCCC', }}>
                                    <CheckOutlined />
                                    <ShoppingCartOutlined />
                                    <StarOutlined />
                                </Space>
                            </Card>

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
                        {/* <List.Item key={item.email}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.picture.large} />}
                            title={<a href="https://ant.design">{item.name.last}</a>}
                            description={item.email}
                        />
                        <div>Content</div>
                    </List.Item> */}
                    </>
                )}

            </VirtualList>
        </List>

    );


    // View
    const randomGoodsView = loadingView;
    const cartView = loadingView;
    const [content, setContent] = useState(loadingView);

    // Load goods data
    React.useEffect(() => {
        client.get(`/randomGoods`).then((response) => {
            let view = response.data.map((item) => {
                <Card style={{
                    width: '25%',
                }}>
                    <Meta
                        avatar={<Avatar src={item.picutre} />}
                        title={item.title}
                        description={item.description}
                    />
                </Card>
            });

            randomGoodsView = view;
            setContent(randomGoodsView);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    // Load cart data
    React.useEffect(() => {
        client.get(`/cart`).then((response) => {
            let view = response.data.map((item) => {
                <Card style={{
                    width: '25%',
                }}>
                    <Meta
                        avatar={<Avatar src={item.picutre} />}
                        title={item.title}
                        description={item.description}
                    />
                </Card>
            });

            cartView = view;
            setContent(cartView);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    // Menu click event
    const menuHandle = (event) => {
        let key = event.key;
        if (key == '1') {
            setContent(randomGoodsView);
        }
        else if (key == '2') {
            setContent(cartView);
        }
        else if (key == '4') {

        }
        else if (key == '5') {
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
                            label: 'Shopping',
                            icon: <ShoppingOutlined />,
                            children: [
                                {
                                    key: '1',
                                    label: 'Goods',
                                    icon: <ShoppingOutlined />,
                                },
                                {
                                    key: '2',
                                    label: 'Cart',
                                    icon: <ShoppingCartOutlined />,
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