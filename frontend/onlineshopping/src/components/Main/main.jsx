import React, { Fragment, useState, useEffect } from 'react';

import {
    MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, ShoppingCartOutlined,
    ShoppingOutlined, CheckOutlined, SettingOutlined, StarOutlined, LogoutOutlined,
} from '@ant-design/icons';

import {
    Menu, Flex, Avatar, Spin, Card, Input,
    Layout, theme, Button, Space, List, Image
} from 'antd';

import client, { removeAccessToken } from '../../api/axios';

const { Search } = Input;
const { Header, Sider, Content } = Layout;
const { Meta } = Card;

const Main = () => {

    // views
    // const loadingView = (
    //     <List gap="middle" style={{ height: '100%', width: '100%', }} >
    //         <VirtualList warp='true' data={[{ "key": 1 }, { "key": 2 }, { "key": 3 }, { "key": 4 }]} itemHeight={47} itemKey="key"  >
    //             {(item) => (
    //                 <>
    //                     <Flex gap="large" style={{ height: '100%', width: '100%', }}>
    //                         <Card style={{ margin: '10px', width: '25%', height: '200px', }}>
    //                             <Meta avatar={<Spin size='large'></Spin>} />
    //                             <Space style={{ position: 'absolute', left: '0', bottom: '0', margin: '25px', fontSize: '25px', color: '#CCCCCC', }}>
    //                                 <CheckOutlined />     <ShoppingCartOutlined />  </Space>
    //                         </Card>                            <Card style={{ margin: '10px', width: '25%', height: '200px', }}>
    //                             <Meta avatar={<Spin size='large'></Spin>} />
    //                             <Space style={{ position: 'absolute', left: '0', bottom: '0', margin: '25px', fontSize: '25px', color: '#CCCCCC', }}>
    //                                 <CheckOutlined />     <ShoppingCartOutlined />  </Space>
    //                         </Card>                            <Card style={{ margin: '10px', width: '25%', height: '200px', }}>
    //                             <Meta avatar={<Spin size='large'></Spin>} />
    //                             <Space style={{ position: 'absolute', left: '0', bottom: '0', margin: '25px', fontSize: '25px', color: '#CCCCCC', }}>
    //                                 <CheckOutlined />     <ShoppingCartOutlined />  </Space>
    //                         </Card>                            <Card style={{ margin: '10px', width: '25%', height: '200px', }}>
    //                             <Meta avatar={<Spin size='large'></Spin>} />
    //                             <Space style={{ position: 'absolute', left: '0', bottom: '0', margin: '25px', fontSize: '25px', color: '#CCCCCC', }}>
    //                                 <CheckOutlined />     <ShoppingCartOutlined />  </Space>
    //                         </Card>
    //                     </Flex>
    //                 </>
    //             )}
    //         </VirtualList>
    //     </List>
    // );

    class RandomProductView extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                list: []
            }

        }

        componentDidMount() {
            this.pullData()
        }

        pullData = () => {
            client.get(`product/random`)
                .then((response) => {
                    console.log('data respone')
                    this.setState({
                        data: this.state.list = this.state.list.concat(response.data.product_list)
                    })
                })
                .catch(error => {
                    console.log(error);
                });
        };

        onSelectProduct = (event) => {
            console.log(event.target)
        }

        onAddToCart = (event) => {
            console.log(event.target)
        }

        render() {
            return (
                <Flex wrap gap="large" style={{ overflow: 'auto', flex: '1', height: '100%', width: '100%', }}>
                    {
                        this.state.list.map((item) => (
                            <Card key={item.id} style={{ width: "250px", height: '300px', }}>
                                <Meta
                                    // avatar={item.avatar_locator ? <Spin size='large'></Spin> : ''}
                                    avatar={<Image placeholder='true'
                                        // style={{ borderRadiusLG: '50px' }}
                                        src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'></Image>}
                                    title={item.name}
                                    description={item.intro}
                                />

                                <Space style={{ position: 'absolute', left: '0', bottom: '0', margin: '25px', fontSize: '25px' }}>
                                    <Button value={item.id} onClick={this.onSelectProduct}><CheckOutlined /></Button>
                                    <Button value={item.id} onClick={this.onAddToCart}><ShoppingCartOutlined /></Button>
                                    {/* <StarOutlined /> */}
                                </Space>

                            </Card>
                        ))
                    }
                </Flex>
            )
        }
    }

    class CartView extends React.Component {
        render() {
            return (
                <div></div>
            )
        }
    }

    class AccountView extends React.Component {
        render() {
            return (
                <div></div>
            )
        }
    }

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
            // removeAccessToken();
            window.location.replace('/login')
        }
    };

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
                            <Search style={{ height: 64, paddingTop: 15, }} placeholder="search goods" enterButton />
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