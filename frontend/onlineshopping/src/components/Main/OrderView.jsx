import React from 'react';

import {
    AntDesignOutlined, ClearOutlined, ReloadOutlined
} from '@ant-design/icons';

import {
    Flex, Avatar, Input, Image, message, Select, Space, Empty, List, FloatButton,
    Button, Table
} from 'antd';

import client from '../../api/axios';
import TextArea from 'antd/es/input/TextArea';

import css from './styles/index.module.css';
import Column from 'antd/es/table/Column';

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
        client.post(`order/list`)
            .then(respone => {
                // console.log('orderlist==', respone)
                let index = 0;
                let orders_list = [];
                let list = respone.data.orders_list
                for (let i = 0; i < list.length; i++) {
                    let item = list[i];
                    client.post(`product/get`, {
                        id: item.product_id,
                    }).then(
                        respone => {
                            let product = respone.data;
                            client.post(`merchant/get`, {
                                id: item.merchant_id,
                            }).then(
                                merchant => {
                                    orders_list[index++] = {
                                        id: item.id,
                                        user_id: item.user_id,
                                        merchant: merchant.Name,
                                        date: new Date(item.date).toLocaleTimeString("en-US"),
                                        state: item.state,
                                        remark: item.remark,
                                        product: product.name,
                                        price: item.price,
                                        number: item.number,
                                    }
                                    // this.state.orders_list.values.map()
                                    // console.log('orderlist', orders_list)
                                    this.setState({ orders_list })
                                })
                        }).catch(_ => {
                            orders_list[index++] = {
                                id: item.id,
                                user_id: item.user_id,
                                merchant: '',
                                date: new Date(item.date).toLocaleTimeString("en-US"),
                                state: item.state,
                                remark: item.remark,
                                product: '',
                                price: item.price,
                                number: item.number,
                            }

                            this.setState({ orders_list })
                        })
                }
            }).catch(e => {
                // console.log(e);
            })
    }

    onClearOrder = () => {
        let list = this.state.orders_list;
        for (let i = 0; i < list.length; i++) {
            console.log('delete', list[i].id);
            client.post(`order/delete`, {
                id: list[i].id,
            }).then((resp) => {
                message.config({
                    maxCount: 1,
                    duration: 1
                })
                message.success('Clear order')
            })
        }
        this.setState({ orders_list: [] })
    }

    render() {
        return (
            <Flex className={css.con01} style={{ overflow: 'auto', flex: '1', height: '100%', width: '100%', }} >

                <Table rowKey={(item) => item.id} style={{ width: '100%', height: '100%' }} columns={[{
                    title: 'ID',
                    dataIndex: 'id',
                    key: 'id',
                    render: (text) => <p>{text}</p>,
                }, {
                    title: 'State',
                    dataIndex: 'state',
                    key: 'state',
                    render: (text) => <a> {text == 0 ? 'Avaiable' : 'Unabaibale'}</a>,
                }, {
                    title: 'Date',
                    dataIndex: 'date',
                    key: 'date',
                }, {
                    title: 'Remark',
                    dataIndex: 'remark',
                    key: 'remark',
                    render: (text) => <p>{text ? text : 'NULL'} </p>,
                }, {
                    title: 'Product',
                    dataIndex: 'product',
                    key: 'product',
                }, {
                    title: 'Merchant',
                    dataIndex: 'merchant',
                    key: 'merchant',
                }, {
                    title: 'Number',
                    dataIndex: 'number',
                    key: 'number',
                    render: (text) => <p>{text} </p>,
                }, {
                    title: 'Price',
                    dataIndex: 'price',
                    key: 'price',
                    render: (text) => <p>{text} </p>,
                },


                ]} dataSource={this.state.orders_list ? [...this.state.orders_list] : []}>
                </Table>

                <FloatButton onClick={() => { this.setState({ orders_list: [] }); this.pullData() }} style={{ right: 100, bottom: 100 + 70 }} type="default" tooltip={<div>Refresh</div>} icon={<ReloadOutlined />} />
                <FloatButton onClick={this.onClearOrder} style={{ right: 100, bottom: 100 }} type="default" tooltip={<div>Clear All Order</div>} icon={<ClearOutlined />} />
            </Flex>
        )
    }
}

export default OrderView;