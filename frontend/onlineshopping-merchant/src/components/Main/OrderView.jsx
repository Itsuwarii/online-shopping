import React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { ShoppingCartOutlined, CheckOutlined, LoadingOutlined, ClearOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Flex, Card, Button, Space, Image, Spin, message, InputNumber, Empty, FloatButton, Tooltip, List, Table, Input } from 'antd';
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
                // console.log(respone);
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

    changeState = (record) => {


    }


    render() {
        return (
            <Flex wrap gap="large" style={{ overflow: 'auto', flex: '1', height: '100%', width: '100%', }}>
                <Table rowKey={(item) => item.id} style={{ width: '100%', height: '100%' }}
                    columns={[{
                        title: 'ID',
                        dataIndex: 'id',
                        key: 'id',
                        sorter: true,
                        defaultSortOrder: 'ascend',
                        sorter: (a, b) => a.id - b.id,
                        render: (text) => <p style={{ fontSize: '15px', }}>{text}</p>,
                    }, {
                        title: 'Date',
                        dataIndex: 'date',
                        key: 'date',
                        sorter: (a, b) => a.date - b.date,
                        render: (text) => <Flex style={{ fontSize: '15px', }}>{new Date(text).toLocaleTimeString("en-US")}</Flex>,
                    }, {
                        title: 'Remark',
                        dataIndex: 'remark',
                        key: 'remark',
                        render: text => <div style={{ fontSize: '15px', }}>{text}</div>
                    },
                    {
                        title: 'Price',
                        dataIndex: 'price',
                        key: 'price',
                        sorter: (a, b) => a.price - b.price,
                        render: text => <p style={{ fontSize: '15px', }}> {text.toFixed(2)}</p>,
                    }, {
                        title: 'Number',
                        dataIndex: 'number',
                        key: 'number',
                        sorter: (a, b) => a.amount - b.amount,
                    }, {
                        title: 'State',
                        dataIndex: 'state',
                        key: 'state',
                        sorter: (a, b) => a.state - b.state,
                        render: (text, record, _) => (
                            <Button style={{ width: '100px' }} onClick={() => { this.changeState(record) }}>{text == 1 ? 'Avaibable' : 'Unavaibable'}</Button>
                        )
                    },

                    ]} dataSource={this.state.orders_list}>
                </Table>
            </Flex>
        )
    }
}


export default OrderView;