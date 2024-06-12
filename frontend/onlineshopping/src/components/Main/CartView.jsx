import React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { ShoppingCartOutlined, CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { Flex, Card, Button, Space, Image, Spin, message, InputNumber, Empty } from 'antd';
import client from '../../api/axios';

const { Meta } = Card;

class CartView extends React.Component {
    constructor(props) {
        super(props)
        this.state = { list: [] }
    }

    componentDidMount() {
        this.pullData()
    }

    pullData = () => {
        client.get(`cart`)
            .then((response) => {
                // console.log('data respone', response)
                if (response.data != null)
                    if (response.data.cart_product_list != null) {
                        this.setState({
                            data: this.state.list = response.data.cart_product_list
                        })
                    }
            })
            .catch(error => {
                console.log(error);
                setTimeout(this.pullData, 5000);
            });
    };

    // 购物车数量改变
    onChangeCartNumber = (num, id) => {
        console.log(num, id)

        // ProductId int   `json:"id"`
        // Number    int   `json:"number"`
        // Date	  int64 `json:"date`
        let cart_product_list = [];
        let list = this.state.list;
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

        this.setState({ list: cart_product_list })

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
                    this.state.list.length != 0 ?
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

                                <Space style={{ position: 'absolute', left: '0', bottom: '0', margin: '25px', fontSize: '25px' }}>
                                    <Button value={item.id} onClick={this.onSelectProduct}><CheckOutlined /></Button>
                                    <Button value={item.id} onClick={this.onAddToCart} style={{ backgroundColor: '#1677ff' }}><ShoppingCartOutlined /></Button>
                                    <InputNumber variant='outlined' changeOnWheel='true' min={0} max={1000} defaultValue={item.number} onChange={(num) => this.onChangeCartNumber(num, item.id)} />
                                </Space>

                            </Card>
                        ))
                        :
                        <Empty style={{ margin: 'auto auto' }}></Empty >
                }
            </Flex>
        )
    }
}


export default CartView;