import React from 'react';

import {
    ShoppingCartOutlined, CheckOutlined, LoadingOutlined
} from '@ant-design/icons';

import {
    Flex, Card, Button, Space, Image, message, Spin, InputNumber, Empty,
    Tooltip
} from 'antd';

import client from '../../api/axios';

import css from './styles/index.module.css';


const { Meta } = Card;

class SearchResultView extends React.Component {

    isInCart = (id) => {
        let list = this.props.cart_product_list;

        if (list == null) {
            return false;
        }

        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                return list[i].number;
            }
        }

        return 0;
    }

    onSelectProduct = (id) => {
        // console.log(id)

        let purchaseList = []
        let list = this.props.searchedProductList

        let buyNumber = 1;
        let cart_product_list = this.props.cart_product_list;
        if (cart_product_list != null) {
            for (let i = 0; i < cart_product_list.length; i++) {
                if (cart_product_list[i].id == id) {
                    buyNumber = cart_product_list[i].number;
                    break;
                }
            }
        }

        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                purchaseList.push({
                    id: list[i].id,
                    avatar_locator: list[i].avatar_locator,
                    images_locator: list[i].images_locator,
                    intro: list[i].intro,
                    merchant: list[i].merchant,
                    name: list[i].name,
                    price: list[i].price,
                    buyNumber: buyNumber,
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

        if (list != null) {
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

    render() {
        return (
            <Flex className={css.con01} wrap={true} gap="large" style={{ overflow: 'auto', flex: '1', height: '100%', width: '100%', }}>
                {
                    this.props.searchedProductList == null || this.props.searchedProductList.length == 0
                        ?
                        <Empty style={{ margin: 'auto auto' }}></Empty >
                        :
                        this.props.searchedProductList.map((item) => (
                            <Card key={item.id} style={{ width: "250px", height: '300px', }}>
                                <Meta title={<div style={{ fontSize: '15px' }}>{item.name}</div>} />
                                <Flex style={{ marginTop: '10px', flex: '1', flexDirection: 'column' }}>
                                    {
                                        item.avatar ?
                                            <Image placeholder='true' style={{ width: '200px', height: '150px' }}
                                                src={item.avatar}></Image>
                                            : <Empty style={{ margin: 'auto auto' }}></Empty >
                                    }
                                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', fontSize: '15px' }}> {item.intro}</div>
                                </Flex>

                                <Space style={{ position: 'absolute', left: '0', bottom: '0', margin: '25px', fontSize: '25px' }}>
                                    <Tooltip title="Buy this">
                                        <Button onClick={() => this.onSelectProduct(item.id)}><CheckOutlined /></Button>
                                    </Tooltip>
                                    <Tooltip title="Add to cart">
                                        <Button onClick={() => this.onAddToCart(item.id)} style={{ backgroundColor: this.isInCart(item.id) != 0 ? '#bae0ff' : 'white' }} ><ShoppingCartOutlined /></Button>
                                    </Tooltip>
                                    <InputNumber min={0} max={10000} variant='outlined' changeOnWheel='true' value={this.isInCart(item.id)} onChange={(num) => this.onChangeCartNumber(num, item.id)}
                                        style={{ display: this.isInCart(item.id) != 0 ? '' : 'none' }} />
                                </Space>

                            </Card>
                        ))
                }
            </Flex>
        )
    }
}

export default SearchResultView;