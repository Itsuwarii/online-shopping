import React from 'react';

import {
    ShoppingCartOutlined, CheckOutlined, LoadingOutlined
} from '@ant-design/icons';

import {
    Flex, Card, Button, Space, Image, message, Spin, InputNumber, Empty
} from 'antd';

import client from '../../api/axios';
import { getValue } from '@testing-library/user-event/dist/utils';

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
            if (this.state.cart_product_list[i].id == id) {
                return this.state.cart_product_list[i].number;
            }
        }

        return 0;
    }

    onSelectProduct = (event) => {
        console.log(event)
    }

    onAddToCart = (id) => {
        console.log(id)

        let cart_product_list = [];
        let list = this.state.cart_product_list;
        let existed = false;

        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                existed = true;
                cart_product_list.push({
                    id: list[i].id,
                    number: list[i].number + 1,
                    date: Date.parse(new Date())
                })
            } else cart_product_list.push(list[i])
        }

        if (existed == false) {
            cart_product_list.push({
                id,
                number: 1,
                date: Date.parse(new Date())
            })
        }

        this.setState({ cart_product_list })

        client.post(`cart`, {
            cart_product_list
        }).then((response) => {
            message.config({
                maxCount: 1,
                duration: 1
            })
            message.success("add success")
        }).catch(error => {
            console.log(error);
        });

    }

    // 购物车数量改变
    onChangeCartNumber = (num, id) => {
        console.log(num, id)

        // ProductId int   `json:"id"`
        // Number    int   `json:"number"`
        // Date	  int64 `json:"date`
        let cart_product_list = [];
        let list = this.state.cart_product_list;
        for (let i = 0; i < list.length; i++) {

            if (list[i].id == id) {
                if (num == 0) continue;

                cart_product_list.push({
                    id: list[i].id,
                    number: num,
                    date: Date.parse(new Date())
                })
            } else {
                cart_product_list.push(list[i])
            }
        }

        this.setState({ cart_product_list })

        client.post(`cart`, {
            cart_product_list
        }).then((response) => {
            message.config({
                maxCount: 1,
                duration: 1
            })
            message.success("change success")
        }).catch(error => {
            console.log(error);
        });

    }

    render() {
        return (
            <Flex wrap gap="large" style={{ overflow: 'auto', flex: '1', height: '100%', width: '100%', }}>
                {
                    this.state.list.length == 0
                        ?
                        // <Flex style={{ margin: '0 auto' }}>
                        //     <Space>
                        //         <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
                        //     </Space>
                        // </Flex>
                        <Empty style={{ margin: 'auto auto' }}></Empty >
                        :
                        this.state.list.map((item) => (
                            <Card key={item.id} style={{ width: "250px", height: '300px', }}>
                                <Meta
                                    // avatar={item.avatar_locator ? <Spin size='large'></Spin> : ''}
                                    avatar={<Image placeholder='true'
                                        // style={{ borderRadiusLG: '50px' }}
                                        src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"></Image>}
                                    title={item.name}
                                    description={item.intro}
                                />
                                {/* 
                                <Space style={{ position: 'absolute', left: '0', bottom: '0', margin: '25px', fontSize: '25px' }}>
                                    <Button onClick={this.onSelectProduct}><CheckOutlined /></Button>
                                    <Button  onClick={this.onAddToCart} style={{ backgroundColor: '#1677ff' }}><ShoppingCartOutlined /></Button>
                                    <InputNumber variant='outlined' changeOnWheel='true' min={0} max={1000} defaultValue={item.number} onChange={(num) => this.onChangeCartNumber(num, item.id)} />
                                </Space> */}

                                <Space style={{ position: 'absolute', left: '0', bottom: '0', margin: '25px', fontSize: '25px' }}>
                                    <Button onClick={() => this.onSelectProduct(item.id)}><CheckOutlined /></Button>
                                    <Button onClick={() => this.onAddToCart(item.id)}
                                        style={{ backgroundColor: this.isInCart(item.id) != 0 ? '#1677ff' : 'white' }} ><ShoppingCartOutlined /></Button>
                                    <InputNumber min={0} max={1000}
                                        variant='outlined' changeOnWheel='true'
                                        value={this.isInCart(item.id)}
                                        onChange={(num) => this.onChangeCartNumber(num, item.id)}
                                        style={{ display: this.isInCart(item.id) != 0 ? '' : 'none' }} />
                                </Space>

                            </Card>
                        ))
                }
            </Flex>
        )
    }
}

export default RandomProductView;