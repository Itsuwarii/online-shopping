import React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { ShoppingCartOutlined, CheckOutlined, ReloadOutlined, LoadingOutlined, ClearOutlined, ShoppingOutlined } from '@ant-design/icons';
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
                console.log(respone)
                this.setState({ orders_list: [...respone.data.orders_list] })
            }).catch(e => {
                console.log(e);
            })
    }

    pushData = (order) => {
        let payload = {
            id: order.id,
            user_id: order.user_id,
            merchant_id: order.merchant_id,
            date: order.date,
            state: order.state,
            remark: order.remark,
            product_id: order.product_id,
            price: order.price,
            number: order.number,
        }

        client.post(`order/update`, payload).then(_ => {
            message.config({
                maxCount: 1,
                duration: 1,
            })
            message.success('Update success');
        }).catch(e => {
            console.log(e);
        })
    }

    changeRemark = (record, e) => {
        let remark = e.target.value;

        let newList = [];
        let list = this.state.orders_list;
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            if (item.id == record.id) {
                newList.push({ ...record, remark });

                this.pushData({ ...record, remark });
            } else {
                newList.push(item);
            }
        }
        this.setState({ orders_list: [...newList] });
    }

    changeState = (record) => {
        let state = record.state;
        if (state == 0) state = 1;
        else state = 0;

        let newList = [];
        let list = this.state.orders_list;
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            if (item.id == record.id) {
                newList.push({ ...record, state });

                this.pushData({ ...record, state });
            } else {
                newList.push(item);
            }
        }
        this.setState({ orders_list: [...newList] });
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
                        render: (n, record, _) => (
                            <Input type='text' placeholder='Remark' style={{ borderRadius: '1px', width: '100px' }} value={n} onChange={(e) => { this.changeRemark(record, e) }}></Input>
                        )
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
                            <Button style={{ width: '100px' }} onClick={() => { this.changeState(record) }}>{text == '0' ? 'Activity' : 'Inactive'}</Button>
                        )
                    },

                    ]} dataSource={this.state.orders_list}>
                </Table>


                <FloatButton onClick={() => { this.setState({ orders_list: [] }); this.pullData() }} style={{ right: 300, bottom: 100 + 70 }} type="default" tooltip={<div>Refresh</div>} icon={<ReloadOutlined />} />
            </Flex>
        )
    }
}


export default OrderView;