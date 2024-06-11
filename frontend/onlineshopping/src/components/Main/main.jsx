import React, { Fragment, useState, useEffect } from 'react';

import {
    MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, ShoppingCartOutlined, AntDesignOutlined,
    ShoppingOutlined, CheckOutlined, SettingOutlined, StarOutlined, LogoutOutlined,
} from '@ant-design/icons';

import {
    Menu, Flex, Avatar, Spin, Card, Input,
    Layout, theme, Button, Space, List, Image,
    message, Select
} from 'antd';

import client, { removeAccessToken } from '../../api/axios';

const { Option } = Select;
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
                    if (error.response.statusText == "Unauthorized") {
                        message.config({
                            duration: 1,
                            maxCount: 1,
                        })
                        message.error("You are not login");
                    }
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
            client.get(`cart`)
                .then((response) => {
                    console.log('data respone', response)
                    if (response.data.cart_product_list != null) {
                        this.setState({
                            data: this.state.list = response.data.cart_product_list
                        })
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        };

        render() {
            return (
                <Flex wrap gap="large" style={{ overflow: 'auto', flex: '1', height: '100%', width: '100%', }}>
                    {
                        this.state.list ?
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
                            :
                            ''
                    }
                </Flex>
            )
        }
    }

    class AccountView extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                userInfo: {
                    avatar_locator: '',
                    intro: '',
                    name: '',
                    sex: '',
                    telephone: '',
                }
            }
        }

        componentDidMount() {
            this.pullData()
        }

        pullData = () => {
            client.get(`user`)
                .then((response) => {
                    console.log('data respone', response)
                    if (response.data != null) {
                        this.setState({
                            data: this.state.userInfo = {
                                avatar_locator: response.data.avatar_locator,
                                intro: response.data.intro,
                                name: response.data.name,
                                sex: response.data.sex,
                                telephone: response.data.telephone,
                            }
                        })
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        };


        pushData = (tipe) => {
            client.post(`user`, {
                name: this.state.userInfo.name,
                avatar_locator: this.state.userInfo.avatar_locator,
                sex: this.state.userInfo.sex,
                telephone: this.state.userInfo.telephone,
                intro: this.state.userInfo.intro,
            })
                .then((response) => {
                    message.config({
                        duration: 1,
                        maxCount: 1,
                    });
                    message.success(tipe + " update success")

                })
                .catch(error => {
                    console.log(error);
                    message.config({
                        duration: 2,
                        maxCount: 1,
                    });
                    message.error(tipe + " update failed")
                });
        }

        onChangeName = (event) => {
            let value = event.target.value

            if (value == '') {
                message.error("You must to input a user name")
            } else {
                this.setState({
                    data: this.state.userInfo = {
                        avatar_locator: this.state.userInfo.avatar_locator,
                        intro: this.state.userInfo.intro,
                        name: value,
                        sex: this.state.userInfo.sex,
                        telephone: this.state.userInfo.telephone,
                    }
                })
            }
        }

        onChangeIntro = (event) => {
            let value = event.target.value
            this.setState({
                data: this.state.userInfo = {
                    avatar_locator: this.state.userInfo.avatar_locator,
                    intro: value,
                    name: this.state.userInfo.name,
                    sex: this.state.userInfo.sex,
                    telephone: this.state.userInfo.telephone,
                }
            })

            this.pushData('Intro')
        }

        onChangeSex = (event) => {
            console.log('into change sex', event)
            let value = event
            this.setState({
                data: this.state.userInfo = {
                    avatar_locator: this.state.userInfo.avatar_locator,
                    intro: this.state.userInfo.intro,
                    name: this.state.userInfo.name,
                    sex: value,
                    telephone: this.state.userInfo.telephone,
                }
            })

            this.pushData('Sex')
        }

        onChangeTelephone = (event) => {
            let value = event.target.value
            this.setState({
                data: this.state.userInfo = {
                    avatar_locator: this.state.userInfo.avatar_locator,
                    intro: this.state.userInfo.intro,
                    name: this.state.userInfo.name,
                    sex: this.state.userInfo.sex,
                    telephone: value,
                }
            })

            this.pushData('TelePhone')
        }


        render() {
            return (
                <Flex style={{ flexDirection: 'column', width: '100%', height: '100%', textAlign: 'center', verticalAlign: 'center' }}>
                    <Flex style={{ flexDirection: 'column', margin: "0 auto" }}>
                        <Avatar
                            size={{ xs: 240, sm: 320, md: 400, lg: 640, xl: 300, xxl: 100 }}
                            icon={<AntDesignOutlined />}
                        />
                        <Input onChange={this.onChangeName} size='large' style={{ textAlign: 'center', marginTop: '20px', padding: '10px', fontSize: '20px' }} width={'50%'} placeholder='Name' value={this.state.userInfo.name}></Input>

                        <Input onChange={this.onChangeIntro} size='large' style={{ textAlign: 'center', marginTop: '20px', padding: '10px', fontSize: '20px' }} width={'50%'} placeholder='Intro' value={this.state.userInfo.intro}></Input>

                        <Select onChange={this.onChangeSex} value={this.state.userInfo.sex ? this.state.userInfo.sex : 'Are you a human?'} style={{ textAlign: 'center', marginTop: '20px', fontSize: '20px' }} size='large' placeholder="select your gender">
                            <Select.Option value="male">Male</Select.Option>
                            <Select.Option value="female">Female</Select.Option>
                            <Select.Option value="secret">Secret</Select.Option>
                        </Select>

                        {/* <Input onChange={this.onChangeSex} size='large' style={{ textAlign: 'center', marginTop: '20px', padding: '10px', fontSize: '20px' }} width={'50%'} placeholder='Sex' value={this.state.userInfo.sex}></Input> */}

                        <Input onChange={this.onChangeTelephone} size='large' style={{ textAlign: 'center', marginTop: '20px', padding: '10px', fontSize: '20px' }} width={'50%'} placeholder='Telephone' value={this.state.userInfo.telephone}></Input>

                    </Flex>


                </Flex>
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
            removeAccessToken();
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