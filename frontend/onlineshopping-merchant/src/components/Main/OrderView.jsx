import React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { ShoppingCartOutlined, CheckOutlined, LoadingOutlined, ClearOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Flex, Card, Button, Space, Image, Spin, message, InputNumber, Empty, FloatButton, Tooltip, List } from 'antd';
import client from '../../api/axios';

const { Meta } = Card;

class OrderView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orders_list: [],
        }

    }
    componentDidMount() {
        this.pullData();
    }

    pullData = () => {
        client.post(`order/merchant/get`)
            .then((respone) => {
                console.log(respone);
                // [
                //     {
                //         "user_id": 1,
                //         "merchant_id": 1,
                //         "date": 1718464002,
                //         "state": 0,
                //         "remark": "",
                //         "product_id": 25,
                //         "price": 2.22,
                //         "number": 2
                //     }
                // ]

                this.setState({ orders_list: respone.data.orders_list })
            }).catch(e => {
                console.log(e);
            })
    }


    render() {
        return (
            <Flex wrap gap="large" style={{ overflow: 'auto', flex: '1', height: '100%', width: '100%', }}>
                <List
                    style={{ width: '100%' }}
                    size="large"
                    itemLayout="horizontal"
                    dataSource={this.state.orders_list}
                    renderItem={(item) => (
                        <List.Item>


                            <Flex>{new Date(item.date).toLocaleTimeString("en-US")}</Flex>
                        </List.Item>
                    )}>
                </List>
            </Flex>
        )
    }
}


export default OrderView;