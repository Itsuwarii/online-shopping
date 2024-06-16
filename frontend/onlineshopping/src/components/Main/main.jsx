import React, { useEffect, useState } from 'react';

import {
    MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, ShoppingCartOutlined, SearchOutlined,
    ShoppingOutlined, SettingOutlined, LogoutOutlined, PayCircleOutlined, HistoryOutlined
} from '@ant-design/icons';

import {
    Menu, Flex, Input, Layout, theme, Button,
    message,
} from 'antd';

import client, { removeAccessToken } from '../../api/axios';
import AccountView from './AccountView';
import RandomProductView from './RandomProductView';
import CartView from './CartView';
import SearchResultView from './SearchResultView';
import DetrimentView from './Detriment';
import OrderView from './OrderView';

const { Search } = Input;
const { Header, Sider, Content } = Layout;

const Main = () => {

    const [viewIndex, setViewIndex] = useState('1');
    const [search, setSearch] = useState('');

    // Menu click event
    const menuHandle = (event) => {
        pullData();
        setSearch('');
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
        } else if (key == '6') {
            setViewIndex('6')

        } else if (key == '7') {
            setViewIndex('7')
        } else if (key == '8') {
            setViewIndex('8')
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

            setSearchedProductList(response.data.product_list);
            setViewIndex('6');
        }).catch(error => {
            console.log(error);
        });
    }

    const [productList, setProductList] = useState([]);
    const [searchedProductList, setSearchedProductList] = useState([]);
    const [cart_product_list, setCartProductList] = useState([]);
    const [purchaseList, setPurchaseList] = useState([]);
    const toPurchase = () => {
        setViewIndex('7')
    }
    const toOrder = () => {
        setViewIndex('8')
    }

    useEffect(() => {
        pullData();
    }, [])

    const pullData = () => {
        client.get(`product/random`).then((response) => {
            setProductList(response.data.product_list)
        }).catch(error => {
            if (error.response != null && error.response.statusText != null)
                if (error.response.statusText == "Unauthorized") {
                    message.config({
                        duration: 1,
                        maxCount: 1,
                    })
                    message.error("You are not login");
                    return
                }
            setTimeout(this.pullData, 5000);
        });

        pullCartData();
    };

    const pullCartData = () => {
        client.get(`cart`).then((response) => {
            if (response.data != null)
                if (response.data.cart_product_list != null) {
                    setCartProductList(response.data.cart_product_list)
                }
        }).catch(error => {
            console.log(error);
            setTimeout(this.pullData, 5000);
        });
    }

    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

    return (
        <Layout style={{ height: '100vh', }}>
            <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
                <Menu onClick={menuHandle}
                    mode="inline"
                    selectedKeys={viewIndex}
                    defaultSelectedKeys={['1']} defaultOpenKeys={['main', 'setting']}
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
                                {
                                    key: '6', label: 'Search', icon: <SearchOutlined />,
                                },
                                {
                                    key: '7', label: 'Purchase', icon: <PayCircleOutlined />,
                                },
                                {
                                    key: '8', label: 'Order', icon: <HistoryOutlined />,
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
                            <Search value={search} onChange={(e) => setSearch(e.value)} onSearch={onSearch} style={{ height: 64, paddingTop: 15, }} placeholder="search goods" enterButton />
                        </Flex>
                    </Flex>
                </Header>

                <Content style={{ flexFlow: 'column', margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, borderRadius: borderRadiusLG, }} >

                    <div style={{ display: viewIndex == '1' ? 'inline' : 'none' }}><RandomProductView setPurchaseList={setPurchaseList} toPurchase={toPurchase} pullData={pullData} setCartProductList={setCartProductList} cart_product_list={cart_product_list} setProductList={setProductList} list={productList} /></div>
                    <div style={{ display: viewIndex == '2' ? 'inline' : 'none' }}><CartView purchaseList={purchaseList} setPurchaseList={setPurchaseList} toPurchase={toPurchase} pullCartData={pullCartData} setCartProductList={setCartProductList} cart_product_list={cart_product_list} /></div>
                    <div style={{ display: viewIndex == '4' ? 'inline' : 'none' }}><AccountView /></div>
                    <div style={{ display: viewIndex == '5' ? 'inline' : 'none' }}>Logout</div>
                    <div style={{ display: viewIndex == '6' ? 'inline' : 'none' }}><SearchResultView purchaseList={purchaseList} setPurchaseList={setPurchaseList} toPurchase={toPurchase} setCartProductList={setCartProductList} cart_product_list={cart_product_list} setSearchedProductList={setSearchedProductList} searchedProductList={searchedProductList} ></SearchResultView></div>
                    <div style={{ display: viewIndex == '7' ? 'inline' : 'none' }}><DetrimentView toOrder={toOrder} setCartProductList={setCartProductList} cart_product_list={cart_product_list} setPurchaseList={setPurchaseList} purchaseList={purchaseList} ></DetrimentView></div>
                    <div style={{ display: viewIndex == '8' ? 'inline' : 'none' }}><OrderView></OrderView></div>

                </Content>
            </Layout>
        </Layout>
    );

};

export default Main;