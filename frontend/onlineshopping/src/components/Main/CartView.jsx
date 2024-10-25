import React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { ShoppingCartOutlined, CheckOutlined, LoadingOutlined, ClearOutlined, ReloadOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Flex, Card, Button, Space, Image, Spin, message, InputNumber, Empty, FloatButton, Tooltip } from 'antd';
import client from '../../api/axios';

import css from './styles/index.module.css';

const { Meta } = Card;

class CartView extends React.Component {

    onSelectProduct = (id) => {
        // console.log(id)

        let purchaseList = []

        let list = this.props.cart_product_list;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                this.pullPruduct(list[i].id).then(
                    data => {
                        let n = list[i].number;
                        // console.log(data)

                        client.post(`image/get`, {
                            hash: data.avatar_locator, message: '',
                        }).then((respone) => {

                            purchaseList.push({
                                id: data.id,
                                avatar_locator: data.avatar_locator,
                                images_locator: data.images_locator,
                                intro: data.intro,
                                merchant: data.merchant,
                                name: data.name,
                                price: data.price,
                                buyNumber: n,
                                avatar: respone.data.base64,
                            })
                            this.props.setPurchaseList(purchaseList);
                            this.props.toPurchase();
                        }).catch(e => { console.log(e) })

                    }
                )
                break;
            }
        }
    }

    onAddToCart = (id) => {
        console.log(id)

        let cart_product_list = [];
        let list = this.props.cart_product_list;

        for (let i = 0; i < list.length; i++) {

            if (list[i].id == id) {
                let n = list[i].number;
                if (n < 10000) n++;
                cart_product_list.push({
                    ...list[i],
                    number: n,
                })
            } else cart_product_list.push(list[i])
        }

        this.props.setCartProductList(cart_product_list)

        if (cart_product_list != null) {
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

    }

    onClearCart = () => {
        client.delete(`cart`).then((response) => {
            this.props.setCartProductList([])
            message.success('clear cart success')
        }).catch(err => {
            console.log('delete cart failed')
        })
    }

    async pullPruduct(id) {
        let respone = await client.post(`product/get`, {
            id: id
        }).catch(e => console.log(e))
        return respone.data;
    }

    onBuyAll = () => {
        let purchaseList = []
        let list = this.props.cart_product_list;

        for (let i = 0; i < list.length; i++) {
            this.pullPruduct(list[i].id).then(
                data => {
                    let n = list[i].number;

                    client.post(`image/get`, {
                        hash: data.avatar_locator, message: '',
                    }).then((respone) => {

                        purchaseList.push({
                            id: data.id,
                            avatar_locator: data.avatar_locator,
                            intro: data.intro,
                            avatar: respone.data.base64,
                            merchant: data.merchant,
                            images_locator: data.images_locator,
                            name: data.name,
                            price: data.price,
                            buyNumber: n,
                        })

                        this.props.setPurchaseList([...purchaseList]);
                        if (i == list.length - 1) {
                            this.props.toPurchase();
                        }
                    }).catch(e => { console.log(e) })


                }
            )
        }
    }

    // 购物车数量改变
    onChangeCartNumber = (num, id) => {
        console.log(num, id)

        let cart_product_list = [];
        let list = this.props.cart_product_list;
        for (let i = 0; i < list.length; i++) {

            if (list[i].id == id) {
                if (num == 0) continue;

                cart_product_list.push({
                    ...list[i],
                    number: num,
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
            message.success("Change success")
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <Flex className={css.con01} wrap gap="large" style={{ overflow: 'auto', flex: '1', height: '100%', width: '100%', }}>

                {
                    this.props.cart_product_list && this.props.cart_product_list.length != 0
                        ?
                        this.props.cart_product_list.map((item) => (
                            <Card key={item.id} style={{ width: "250px", height: '300px', }}>
                                <Meta title={<div style={{ fontSize: '15px' }}>{item.product ? item.product.name : ''}</div>} />
                                <Flex style={{ marginTop: '10px', flex: '1', flexDirection: 'column' }}>
                                    {
                                        item.product && item.product.avatar ?
                                            <Image placeholder='true' style={{ width: '200px', height: '150px' }}
                                                src={item.product ? item.product.avatar : ''}></Image>
                                            : <Empty style={{ margin: 'auto auto' }}></Empty >
                                    }


                                    {/* {item.id} */}
                                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', fontSize: '15px' }}>{item.product ? item.product.intro : ''}</div>
                                </Flex>

                                <Space style={{ position: 'absolute', left: '0', bottom: '0', margin: '25px', fontSize: '25px' }}>
                                    <Tooltip title="Buy this">
                                        <Button onClick={() => this.onSelectProduct(item.id)}><CheckOutlined /></Button>
                                    </Tooltip>
                                    <Tooltip title="Add to cart">
                                        <Button onClick={() => this.onAddToCart(item.id)} style={{ backgroundColor: '#bae0ff' }}><ShoppingCartOutlined /></Button>
                                    </Tooltip>
                                    <InputNumber variant='outlined' changeOnWheel='true' min={0} max={10000} value={item.number} onChange={(num) => this.onChangeCartNumber(num, item.id)} />
                                </Space>

                            </Card>
                        ))
                        :
                        <Empty style={{ margin: 'auto auto' }}></Empty >
                }
                <FloatButton onClick={() => { this.props.setCartProductList([]); this.props.pullCartData() }} style={{ right: 100, bottom: 100 + 70 + 70 }} type="default" tooltip={<div>Refresh</div>} icon={<ReloadOutlined />} />
                <FloatButton onClick={this.onBuyAll} style={{ right: 100, bottom: 100 + 70 }} type="primary" tooltip={<div>Buy All</div>} icon={<ShoppingOutlined />} />
                <FloatButton onClick={this.onClearCart} style={{ right: 100, bottom: 100 }} type="default" tooltip={<div>Clear Cart</div>} icon={<ClearOutlined />} />
            </Flex>
        )
    }
}


export default CartView;