import React from 'react';

import {
    ShoppingCartOutlined, CheckOutlined, LoadingOutlined, ShoppingOutlined, ReloadOutlined
} from '@ant-design/icons';

import {
    Flex, Card, Button, Space, Image, message, Spin, InputNumber, Empty, Tooltip, FloatButton
} from 'antd';

import client from '../../api/axios';

import css from './styles/index.module.css';


const { Meta } = Card;

class RandomProductView extends React.Component {

    isInCart = (id) => {
        let list = this.props.cart_product_list
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                return list[i].number;
            }
        }
        return 0;
    }

    onSelectProduct = (id) => {
        console.log(id)

        let purchaseList = []
        let list = this.props.list

        let buyNumber = 1;
        let cart_product_list = this.props.cart_product_list;
        for (let i = 0; i < cart_product_list.length; i++) {
            if (cart_product_list[i].id == id) {
                buyNumber = cart_product_list[i].number;
                break;
            }
        }

        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                purchaseList.push({
                    id: list[i].id,
                    avatar_locator:list[i].avatar_locator,
                    intro:list[i].intro,
                    merchant:list[i].merchant,
                    name:list[i].name,
                    price:list[i].price,
                    buyNumber:buyNumber,
                })
                break;
            }
        }

        this.props.setPurchaseList(purchaseList)
        this.props.toPurchase()
    }


    onAddToCart = (id) => {
        console.log(id)

        let cart_product_list = [];
        let list = this.props.cart_product_list;
        let existed = false;

        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                existed = true;

                let n = list[i].number;
                if (n < 10000) n++;
                cart_product_list.push({
                    id: list[i].id,
                    number: n,
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

        this.props.setCartProductList(cart_product_list)

        client.post(`cart`, {
            cart_product_list
        }).then((response) => {
            message.config({
                maxCount: 1,
                duration: 1
            })
            message.success("Add success")
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
        let list = this.props.cart_product_list;
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

        this.props.setCartProductList(cart_product_list)

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
            <Flex className={css.con01} wrap gap="large" style={{ overflow: 'auto', flex: '1', height: '100%', width: '100%', }}>
                {
                    this.props.list.length == 0
                        ?
                        // <Flex style={{ margin: '0 auto' }}>
                        //     <Space>
                        //         <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
                        //     </Space>
                        // </Flex>
                        <Empty style={{ margin: 'auto auto' }}></Empty >
                        :
                        this.props.list.map((item) => (
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
                                    <Tooltip title="Buy this">
                                        <Button onClick={() => this.onSelectProduct(item.id)}><CheckOutlined /></Button>
                                    </Tooltip>

                                    <Tooltip title="Add to cart">
                                        <Button onClick={() => this.onAddToCart(item.id)}
                                            style={{ backgroundColor: this.isInCart(item.id) != 0 ? '#1677ff' : 'white' }} ><ShoppingCartOutlined /></Button>
                                    </Tooltip>
                                    <InputNumber min={0} max={10000}
                                        variant='outlined' changeOnWheel='true'
                                        value={this.isInCart(item.id)}
                                        onChange={(num) => this.onChangeCartNumber(num, item.id)}
                                        style={{ display: this.isInCart(item.id) != 0 ? '' : 'none' }} />
                                </Space>

                            </Card>
                        ))
                }
                <FloatButton onClick={() => { this.props.setProductList([]); this.props.pullData() }} style={{ right: 100, bottom: 100 }} type="default" tooltip={<div>Refresh</div>} icon={<ReloadOutlined />} />
            </Flex>
        )
    }
}

export default RandomProductView;