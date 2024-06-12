import React from 'react';

import {
    ShoppingCartOutlined, CheckOutlined, LoadingOutlined
} from '@ant-design/icons';

import {
    Flex, Card, Button, Space, Image, message, Spin
} from 'antd';

import client from '../../api/axios';

const { Meta } = Card;

class RandomProductView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            cart_product_list: [],
        }
    }

    componentDidMount() {
        // console.log('to update')
        this.pullData()
    }

    pullData = () => {
        client.get(`product/random`)
            .then((response) => {
                // console.log(response)
                // console.log('data respone')
                this.setState({ list: response.data.product_list })
            })
            .catch(error => {
                console.log(error);
                if (error.response != null)
                    if (error.response.statusText != null)
                        if (error.response.statusText == "Unauthorized") {
                            message.config({
                                duration: 1,
                                maxCount: 1,
                            })
                            message.error("You are not login");
                            return
                        }

                // message.config({
                //     duration: 1,
                //     maxCount: 1
                // })
                // message.error('Network error')
                setTimeout(this.pullData, 5000);
            });

        client.get(`cart`)
            .then((response) => {
                // console.log('data respone', response)
                if (response.data != null)
                    if (response.data.cart_product_list != null) {
                        this.setState({
                            cart_product_list: response.data.cart_product_list
                        })

                        // console.log(this.state)
                    }
            })
            .catch(error => {
                console.log(error);
                setTimeout(this.pullData, 5000);
            });
    };

    isInCart = (id) => {
        for (let i = 0; i < this.state.cart_product_list.length; i++) {
            console.log(this.state.cart_product_list[i].id)
            if (this.state.cart_product_list[i].id == id) {
                return true;
            }
        }

        return false;
    }

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
                    this.state.list.length == 0
                        ?
                        <Flex style={{ margin: '0 auto' }}>
                            <Space>
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
                            </Space>
                        </Flex>
                        :
                        this.state.list.map((item) => (
                            <Card key={item.id} style={{ width: "250px", height: '300px', }}>
                                <Meta
                                    // avatar={item.avatar_locator ? <Spin size='large'></Spin> : ''}
                                    avatar={<Image placeholder='true'
                                        // style={{ borderRadiusLG: '50px' }}
                                        src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'></Image>}
                                    title={item.name}
                                    description={item.intro}
                                />{item.id}

                                <Space style={{ position: 'absolute', left: '0', bottom: '0', margin: '25px', fontSize: '25px' }}>
                                    <Button value={item.id} onClick={this.onSelectProduct}><CheckOutlined /></Button>
                                    <Button value={item.id} style={{ backgroundColor: this.isInCart(item.id) ? '' : 'white' }} onClick={this.onAddToCart}><ShoppingCartOutlined /></Button>
                                    {/* <StarOutlined /> */}
                                </Space>

                            </Card>
                        ))
                }
            </Flex>
        )
    }
}

export default RandomProductView;