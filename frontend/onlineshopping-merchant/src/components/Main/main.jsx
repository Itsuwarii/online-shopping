import React, { Fragment, useState, useEffect } from 'react';

import {
    MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, AppstoreAddOutlined,
    UserOutlined, agsOutlined, SettingOutlined, LogoutOutlined, TagsOutlined,
    UnorderedListOutlined, MessageOutlined, ProductOutlined, CommentOutlined
} from '@ant-design/icons';

import {
    Menu, Flex, Affix, Avatar, Spin, Card, Skeleton, message, Switch, Input,
    Layout, theme, Button, Drawer, Radio, ConfigProvider, Space, List
} from 'antd';

import client, { removeAccessToken } from '../../api/axios';
import ProductView from './ProductView';
import OrderView from './OrderView';
import DialogueView from './DislogueView';
import AccountView from './AccountView';
import AddProductView from './AddProductView';
import { useFetcher } from 'react-router-dom';

const { Search } = Input;
const { Header, Sider, Content } = Layout;
const { Meta } = Card;

function Main() {

    const [product_list, setProductList] = useState([]);

    useEffect(() => {
        pullData();
    }, [])

    const pullData = () => {

        client.post(`product/all`, {
            index: 0,
            size: 1000,
        }).then((respone) => {
            let list = respone.data.product_list;
            setProductList(list);

            let newList = [];
            for (let i = 0; i < list.length; i++) {
                let item = list[i];

                if (item.avatar_locator == '') {
                    newList.push(item);
                    continue;
                }

                client.post(`image/get`, {
                    hash: item.avatar_locator, message: '',
                }).then((respone) => {
                    console.log('image download down');

                    item = { ...item, avatar: respone.data.base64 };
                    // 修改一个商品
                    newList.push(item);

                    setProductList([...newList]);
                })
            }
        }).catch((e) => {
            console.log(e);
        })
    }


    // View
    const [viewIndex, setViewIndex] = useState('1');
    const [search, setSearch] = useState('');

    // Menu click event
    const menuHandle = (event) => {
        setSearch('');
        // pullData();
        let key = event.key;

        if (key == '1') {
            setViewIndex('1');
        }
        else if (key == '2') {
            setViewIndex('2');
        }
        else if (key == '3') {
            setViewIndex('3');
        } else if (key == '4') {
            setViewIndex('4')
        } else if (key == '5') {
            setViewIndex('5')
        } else if (key == '6') {
            setViewIndex('6');
            removeAccessToken();
            window.location.replace('/login')
        }
    };

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const onSearch = (keyword, event) => {
        if (keyword == '') {
            message.config({
                maxCount: 1,
                duration: 1
            })
            message.info("Please input the search content")
            return
        }
    }

    return (
        <Layout style={{
            height: '100vh',
        }}>
            <ConfigProvider theme={{
                token: {
                    colorPrimary: '#874d00', borderRadius: 100, colorBgContainer: '#FFFFFF',
                },
            }}>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        <Flex style={{ justifyContent: 'flex-end' }}>
                            <Flex style={{
                                align: 'center',
                                justify: 'center',
                                marginLeft: '20px',
                                width: '100%',
                            }}>
                                <Search
                                    style={{
                                        height: 64,
                                        paddingTop: 15,
                                    }}
                                    value={search}
                                    onChange={(e) => setSearch(e.value)} onSearch={onSearch}
                                    placeholder="search goods" enterButton />
                            </Flex>

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
                        </Flex>
                    </Header>

                    <Content style={{ flexFlow: 'column', margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, borderRadius: borderRadiusLG, }} >
                        <div style={{ display: viewIndex == '1' ? 'inline' : 'none' }}><ProductView pullData={pullData} setProductList={setProductList} product_list={product_list} setSearch={setSearch} search={search}></ProductView></div>
                        <div style={{ display: viewIndex == '2' ? 'inline' : 'none' }}><AddProductView ></AddProductView></div>
                        <div style={{ display: viewIndex == '3' ? 'inline' : 'none' }}><OrderView></OrderView></div>
                        <div style={{ display: viewIndex == '4' ? 'inline' : 'none' }}><DialogueView></DialogueView></div>
                        <div style={{ display: viewIndex == '5' ? 'inline' : 'none' }}><AccountView></AccountView></div>
                        <div style={{ display: viewIndex == '6' ? 'inline' : 'none' }}><Skeleton active avatar paragraph={{ rows: 2 }} /></div>
                    </Content>
                </Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}
                    theme="light">
                    <div className="demo-logo-vertical" />
                    <Menu
                        onClick={menuHandle}
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['main', 'setting']}
                        items={[
                            {
                                key: 'main',
                                label: 'Sale',
                                icon: <UnorderedListOutlined />,
                                children: [
                                    {
                                        key: '1',
                                        label: 'Product',
                                        icon: <ProductOutlined />,
                                    },
                                    {
                                        key: '2',
                                        label: 'AddProduct',
                                        icon: <AppstoreAddOutlined />,
                                    },
                                    {
                                        key: '3',
                                        label: 'Orders',
                                        icon: <TagsOutlined />,
                                    },
                                    // {
                                    //     key: '4',
                                    //     label: 'Dialogue',
                                    //     icon: <MessageOutlined />,
                                    // },
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
                                        key: '5',
                                        label: 'Account',
                                        icon: <UserOutlined />,
                                    },
                                    {
                                        icon: <LogoutOutlined />,
                                        key: '6',
                                        label: 'Logout',
                                    },
                                ],
                            }
                        ]}
                    />
                </Sider>
            </ConfigProvider>
        </Layout>

    );
};
export default Main;