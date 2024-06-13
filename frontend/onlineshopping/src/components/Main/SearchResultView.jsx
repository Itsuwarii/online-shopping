import React from 'react';

import {
    ShoppingCartOutlined, CheckOutlined, LoadingOutlined
} from '@ant-design/icons';

import {
    Flex, Card, Button, Space, Image, message, Spin, InputNumber, Empty
} from 'antd';

import client from '../../api/axios';

const { Meta } = Card;

class SearchResultView extends React.Component {

    isInCart = (id) => {
        let list = this.props.cart_product_list;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                return list[i].number;
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

    render() {
        return (
            <Flex wrap gap="large" style={{ overflow: 'auto', flex: '1', height: '100%', width: '100%', }}>
                {
                    this.props.searchedProductList == null || this.props.searchedProductList.length == 0
                        ?
                        <Empty style={{ margin: 'auto auto' }}></Empty >
                        :
                        this.props.searchedProductList.map((item) => (
                            <Card key={item.id} style={{ width: "250px", height: '300px', }}>
                                <Meta avatar={<Image placeholder='true' src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"></Image>} title={item.name} description={item.intro} />

                                <Space style={{ position: 'absolute', left: '0', bottom: '0', margin: '25px', fontSize: '25px' }}>
                                    <Button onClick={() => this.onSelectProduct(item.id)}><CheckOutlined /></Button>
                                    <Button onClick={() => this.onAddToCart(item.id)} style={{ backgroundColor: this.isInCart(item.id) != 0 ? '#1677ff' : 'white' }} ><ShoppingCartOutlined /></Button>
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