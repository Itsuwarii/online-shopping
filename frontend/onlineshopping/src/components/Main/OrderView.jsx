import React from 'react';

import {
    AntDesignOutlined,
} from '@ant-design/icons';

import {
    Flex, Avatar, Input, Image, message, Select, Space, Empty,
    List,
    Button,
    Table
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
                let orders_list = [];
                let list = respone.data.orders_list
                for (let i = 0; i < list.length; i++) {
                    let item = list[i];
                    this.getProduct(item.product_id).then(
                        product => {
                            this.getMerchant(item.merchant_id)
                                .then(
                                    merchant => {
                                        // console.log(merchant.Name);
                                        orders_list.push({
                                            id: item.id,
                                            user_id: item.user_id,
                                            merchant: merchant.Name,
                                            date: new Date(item.date).toLocaleTimeString("en-US"),
                                            state: item.state,
                                            remark: item.remark,
                                            product: product.name,
                                            price: item.price,
                                            number: item.number,
                                        })
                                        this.setState({ orders_list: orders_list })
                                    }).catch(e => {
                                        console.log(e)
                                    })
                        }).catch(e => {
                            console.log(e);
                        })
                }
            }).catch(e => {
                console.log(e);
            })
    }

    getMerchant = async (id) => {
        // console.log(id);
        let resp = await client.post(`merchant/get`, {
            id: id,
        }).catch(e => {
            console.log(e)
        })

        return resp.data;
    }

    getProduct = async (id) => {
        // console.log(id);
        let resp = await client.post(`product/get`, {
            id: id,
        }).catch(e => {
            console.log(e)
        })

        return resp.data;
    }

    render() {
        return (
            <Flex className={css.con01} style={{ overflow: 'auto', flex: '1', height: '100%', width: '100%', }} >

                <Table style={{ width: '100%', height: '100%' }} columns={[{
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


                ]} dataSource={this.state.orders_list}>
                </Table>

            </Flex>
        )
    }
}

export default OrderView;