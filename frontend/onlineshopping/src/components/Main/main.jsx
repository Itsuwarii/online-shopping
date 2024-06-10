import React, { Fragment, useState, useEffect } from 'react';

import {
    MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, ShoppingCartOutlined,
    ShoppingOutlined, CheckOutlined, SettingOutlined, StarOutlined, LogoutOutlined,
} from '@ant-design/icons';

import {
    Menu, Flex, Avatar, Spin, Card, Input,
    Layout, theme, Button, Space, List
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

    const ContainerHeight = 700;
    const onScroll = (e) => {
        if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 10) {
            appendData();
        }
    };

    // views
    const loadingView = (
        <List gap="middle" style={{ height: '100%', width: '100%', }} >
            <VirtualList warp='true' data={[{ "key": 1 }, { "key": 2 }, { "key": 3 }, { "key": 4 }]} height={ContainerHeight} itemHeight={47} itemKey="key" onScroll={onScroll}  >
                {(item) => (
                    <>
                        <Flex gap="large" style={{ height: '100%', width: '100%', }}>
                            <Card style={{ margin: '10px', width: '25%', height: '200px', }}>
                                <Meta avatar={<Spin size='large'></Spin>} />
                                <Space style={{ position: 'absolute', left: '0', bottom: '0', margin: '25px', fontSize: '25px', color: '#CCCCCC', }}>
                                    <CheckOutlined />     <ShoppingCartOutlined />  </Space>
                            </Card>                            <Card style={{ margin: '10px', width: '25%', height: '200px', }}>
                                <Meta avatar={<Spin size='large'></Spin>} />
                                <Space style={{ position: 'absolute', left: '0', bottom: '0', margin: '25px', fontSize: '25px', color: '#CCCCCC', }}>
                                    <CheckOutlined />     <ShoppingCartOutlined />  </Space>
                            </Card>                            <Card style={{ margin: '10px', width: '25%', height: '200px', }}>
                                <Meta avatar={<Spin size='large'></Spin>} />
                                <Space style={{ position: 'absolute', left: '0', bottom: '0', margin: '25px', fontSize: '25px', color: '#CCCCCC', }}>
                                    <CheckOutlined />     <ShoppingCartOutlined />  </Space>
                            </Card>                            <Card style={{ margin: '10px', width: '25%', height: '200px', }}>
                                <Meta avatar={<Spin size='large'></Spin>} />
                                <Space style={{ position: 'absolute', left: '0', bottom: '0', margin: '25px', fontSize: '25px', color: '#CCCCCC', }}>
                                    <CheckOutlined />     <ShoppingCartOutlined />  </Space>
                            </Card>
                        </Flex>
                    </>
                )}
            </VirtualList>
        </List>
    );
    const [randomGoodsView, setRandomGoodsView] = useState(loadingView);
    const [cartView, setCartView] = useState('');
    const [accountView, setAccountView] = useState('');
    const [content, setContent] = useState(randomGoodsView);

    // product data
    const [productsData, setProductsData] = useState([]);
    var productsDataLine = 0;

    function appendData() {
        client.get(`product/random`).then((response) => {
            // console.log(response)

            let list = response.data.product_list;

            for (let index = 0; index < list.length;) {
                let sublist = [];

                for (let n = 0; n < 4; n++) {
                    let element = list[index++];
                    if (element != null) {
                        sublist.push(element);
                    }
                }

                if (sublist.length == 4) {
                    const struct = { 'key': productsDataLine++, 'line': sublist };
                    let tempData = productsData;
                    tempData.push(struct);
                    setProductsData(tempData);
                }
            }
            // console.log("update list", productsData, productsDataLine);

            setRandomGoodsView(
                <List gap="middle" style={{ height: '100%', width: '100%', }} >
                    <VirtualList warp='true' data={productsData} height={ContainerHeight} itemHeight={47} itemKey="key" onScroll={onScroll}  >
                        {(item) => (

                            <>
                                <Flex gap="large" style={{ height: '100%', width: '100%', }}>

                                    <Card style={{ margin: '10px', width: '25%', height: '200px', }}>
                                        <Meta

                                            avatar={item.line[0].avatar_locator ? <Spin size='large'></Spin> : ''}
                                            title={item.line[0].name}
                                            description={item.line[0].intro}
                                        />

                                        <Space style={{ position: 'absolute', left: '0', bottom: '0', margin: '25px', fontSize: '25px', color: '#CCCCCC', }}>
                                            <CheckOutlined />
                                            <ShoppingCartOutlined />
                                            {/* <StarOutlined /> */}
                                        </Space>

                                    </Card>
                                    <Card style={{ margin: '10px', width: '25%', height: '200px', }}>
                                        <Meta
                                            avatar={item.line[1].avatar_locator ? <Spin size='large'></Spin> : ''}
                                            title={item.line[1].name}
                                            description={item.line[1].intro}
                                        />

                                        <Space style={{ position: 'absolute', left: '0', bottom: '0', margin: '25px', fontSize: '25px', color: '#CCCCCC', }}>
                                            <CheckOutlined />
                                            <ShoppingCartOutlined />
                                            {/* <StarOutlined /> */}
                                        </Space>

                                    </Card>
                                    <Card style={{ margin: '10px', width: '25%', height: '200px', }}>
                                        <Meta
                                            avatar={item.line[2].avatar_locator ? <Spin size='large'></Spin> : ''}
                                            title={item.line[2].name}
                                            description={item.line[2].intro}
                                        />

                                        <Space style={{ position: 'absolute', left: '0', bottom: '0', margin: '25px', fontSize: '25px', color: '#CCCCCC', }}>
                                            <CheckOutlined />
                                            <ShoppingCartOutlined />
                                            {/* <StarOutlined /> */}
                                        </Space>

                                    </Card>
                                    <Card style={{ margin: '10px', width: '25%', height: '200px', }}>
                                        <Meta
                                            avatar={item.line[3].avatar_locator ? <Spin size='large'></Spin> : ''}
                                            title={item.line[3].name}
                                            description={item.line[3].intro}
                                        />

                                        <Space style={{ position: 'absolute', left: '0', bottom: '0', margin: '25px', fontSize: '25px', color: '#CCCCCC', }}>
                                            <CheckOutlined />
                                            <ShoppingCartOutlined />
                                            {/* <StarOutlined /> */}
                                        </Space>

                                    </Card>

                                </Flex>
                            </>
                        )}
                    </VirtualList>
                </List>
            )

        }).catch(error => {
            console.log(error);
        });
    };



    // Load goods data
    React.useEffect(() => {
        appendData();
    }, []);

    // Menu click event
    const menuHandle = (event) => {
        let key = event.key;
        if (key == '1') {
            console.log("switch product view");
            setContent(randomGoodsView);
        }
        else if (key == '2') {
            console.log("switch cart view");
            setContent(cartView);
        }
        else if (key == '4') {
            console.log("switch account view");
            setContent(accountView);
        }
        else if (key == '5') {
            // removeAccessToken();
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