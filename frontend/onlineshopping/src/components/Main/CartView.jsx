import React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { ShoppingCartOutlined, CheckOutlined, LoadingOutlined, ClearOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Flex, Card, Button, Space, Image, Spin, message, InputNumber, Empty, FloatButton, Tooltip } from 'antd';
import client from '../../api/axios';

const { Meta } = Card;

class CartView extends React.Component {

    onSelectProduct = (id) => {
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
                    id: list[i].id,
                    number: n,
                    date: Date.parse(new Date())
                })
            } else cart_product_list.push(list[i])
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

    onClearCart = () => {
        client.delete(`cart`).then((response) => {
            this.props.setCartProductList([])
            message.success('clear cart success')
        }).catch(err => {
            console.log('delete cart failed')
        })
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
            message.success("Change success")
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <Flex wrap gap="large" style={{ overflow: 'auto', flex: '1', height: '100%', width: '100%', }}>

                {
                    this.props.cart_product_list.length != 0 ?
                        this.props.cart_product_list.map((item) => (
                            <Card key={item.id} style={{ width: "250px", height: '300px', }}>
                                <Meta
                                    // avatar={item.avatar_locator ? <Spin size='large'></Spin> : ''}
                                    avatar={<Image placeholder='true'
                                        // style={{ borderRadiusLG: '50px' }}
                                        src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"></Image>}
                                    title={item.name}
                                    description={item.intro}
                                />

                                <Space style={{ position: 'absolute', left: '0', bottom: '0', margin: '25px', fontSize: '25px' }}>
                                    <Tooltip title="Buy this">
                                        <Button onClick={() => this.onSelectProduct(item.id)}><CheckOutlined /></Button>
                                    </Tooltip>
                                    <Tooltip title="Add to cart">
                                        <Button onClick={() => this.onAddToCart(item.id)} style={{ backgroundColor: '#1677ff' }}><ShoppingCartOutlined /></Button>
                                    </Tooltip>
                                    <InputNumber variant='outlined' changeOnWheel='true' min={0} max={10000} value={item.number} onChange={(num) => this.onChangeCartNumber(num, item.id)} />
                                </Space>

                            </Card>
                        ))
                        :
                        <Empty style={{ margin: 'auto auto' }}></Empty >
                }
                <FloatButton style={{ right: 100, bottom: 100 + 70 }} type="primary" tooltip={<div>Buy All</div>} icon={<ShoppingOutlined />} />
                <FloatButton onClick={this.onClearCart} style={{ right: 100, bottom: 100 }} type="default" tooltip={<div>Clear Cart</div>} icon={<ClearOutlined />} />
            </Flex>
        )
    }
}


export default CartView;