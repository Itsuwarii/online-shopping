import React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { TagOutlined, ShoppingCartOutlined, CheckOutlined, LoadingOutlined, ClearOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Flex, Card, Button, Space, Image, Spin, message, InputNumber, Empty, FloatButton, Tooltip, Input, List, Table } from 'antd';
import client from '../../api/axios';
import TextArea from 'antd/es/input/TextArea';

const { Meta } = Card;

class ProductView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product_list: [],
        }
    }

    componentDidMount() {
        this.pullData();
    }

    pullData = () => {
        client.post(`product/all`, {
            index: 0,
            size: 1000,
        })
            .then((respone) => {
                // console.log(respone);
                this.setState({ product_list: respone.data.product_list })
            }).catch(e => {
                console.log(e);
            })
    }

    pushData = (product) => {
        client.post(`product/update`, {
            id: product.id,
            name: product.name,
            price: product.price,
            avatar_locator: product.avatar_locator,
            images_locator: product.images_locator,
            intro: product.intro,
            state: product.state,
            amount: product.amount,
        }).then(resp => {
            message.config({
                maxCount: 1,
                duration: 0.05,
            })
            message.success('Updated success')
        }).catch(e => {
            console.log(e);
        })

    }

    updateList = (product) => {
        let newList = []
        let list = this.state.product_list;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == product.id) {
                newList.push({
                    ...product,
                })

                this.pushData(product);
            } else {
                newList.push(list[i]);
            }
        }
        this.setState({ product_list: newList });
    }


    changeState = (product) => {
        if (product.state == 1) {
            product.state = 0;
        } else {
            product.state = 1;
        }

        this.updateList(product);
    }

    changePrice = (product, e) => {
        let price = Number(e.target.value);
        product = {
            ...product,
            price: price,
        }

        this.updateList(product);
    }

    changeNumber = (product, e) => {
        let amount = Number(e.target.value);
        product = {
            ...product,
            amount: amount,
        }

        this.updateList(product);
    }
    changeIntro = (product, e) => {
        let i = e.target.value;
        product = {
            ...product,
            intro: i,
        }

        this.updateList(product);
    }
    changeName = (product, e) => {
        let i = e.target.value;
        product = {
            ...product,
            name: i,
        }

        this.updateList(product);
    }
    changeImage = (product, e) => {
        this.updateList(product);
    }

    render() {
        return (
            <Flex wrap gap="large" style={{ overflow: 'auto', flex: '1', height: '100%', width: '100%', }}>

                <Table rowKey={(item) => item.id} style={{ width: '100%', height: '100%' }}

                    columns={[{
                        title: 'ID',
                        dataIndex: 'id',
                        key: 'id',
                        render: (text) => <p>{text}</p>,
                    }, {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
                        render: (n, record, _) => (
                            <Input type='text' style={{ borderRadius: '0', height: '100%', width: '100px' }} value={n} onChange={(e) => { this.changeName(record, e) }}></Input>
                        )
                    }, {
                        title: 'Avatar',
                        dataIndex: 'avatar_locator',
                        key: 'avatar_locator',
                        render: (n, record, _) => (
                            <Image type='text' style={{ borderRadius: '0', height: '100%', width: '100px' }} value={n} onChange={(e) => { this.changeImage(record, e) }}></Image>
                        )
                    },
                    {
                        title: 'Intro',
                        dataIndex: 'intro',
                        key: 'intro',
                        render: (n, record, _) => (
                            <Input type='text' style={{ borderRadius: '0', width: '150px' }} value={n} onChange={(e) => { this.changeIntro(record, e) }}></Input>
                        )
                    }, {
                        title: 'Price',
                        dataIndex: 'price',
                        key: 'price',
                        render: (n, record, _) => (
                            <Input type='number' style={{ width: '100px' }} value={n} onChange={(e) => { this.changePrice(record, e) }}></Input>
                        )
                    }, {
                        title: 'Amount',
                        dataIndex: 'amount',
                        key: 'amount',
                        render: (n, record, _) => (
                            <Input type='number' style={{ width: '100px' }} value={n} onChange={(e) => { this.changeNumber(record, e) }}></Input>
                        )
                    }, {
                        title: 'State',
                        dataIndex: 'state',
                        key: 'state',
                        render: (text, record, _) => (
                            <Button style={{ width: '100px' }} onClick={() => { this.changeState(record) }}>{text == 1 ? 'Avaibable' : 'Unavaibable'}</Button>
                        )
                    },


                    ]} dataSource={this.state.product_list ? [...this.state.product_list] : []}>
                </Table>


            </Flex>
        )
    }
}


export default ProductView;