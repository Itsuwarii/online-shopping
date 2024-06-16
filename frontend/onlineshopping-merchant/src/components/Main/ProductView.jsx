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
        let list = this.props.product_list;
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
        this.props.setProductList(newList);
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

    handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    handleDrop = (e, product) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {

                // 本地的更新
                let newList = [];
                let list = this.props.product_list;
                for (let i = 0; i < list.length; i++) {
                    let item = list[i];
                    if (product.id != item.id) {
                        newList.push(item);
                        continue;
                    }
                    newList.push({
                        ...item,
                        avatar: reader.result,
                    });
                }
                this.props.setProductList(newList);

                this.uploadImage(reader.result, product);
            };
        }
    };

    uploadImage = (file, product) => {
        client.post('image/', {
            base64: file,
        }).then((respone) => {
            let hash = respone.data.hash
            if (hash) {
                product = {
                    ...product,
                    avatar_locator: hash,
                }
                this.updateList(product);
                this.pushData(product);
                message.success('Image uploaded success');
            }
        }).catch((e) => {
            console.log(e)
        })
    };

    deleteProduct = (product) => {
        client.post(`product/delete`, {
            id: product.id,
        }).then(_ => {
            let newList = []
            let list = this.props.product_list;
            for (let i = 0; i < list.length; i++) {
                if (list[i].id == product.id) {
                } else {
                    newList.push(list[i]);
                }
            }
            this.props.setProductList(newList);

            message.config({
                maxCount: 1,
                duration: 1,
            })
            message.success('Delete success');
        }).catch((e) => {
            console.log(e)
        })
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
                        dataIndex: 'avatar',
                        key: 'avatar',
                        render: (avatar, record, _) => (
                            <div
                                onDragEnter={this.handleDragEnter}
                                onDragLeave={this.handleDragLeave}
                                onDragOver={this.handleDragOver}
                                onDrop={(e) => this.handleDrop(e, record)} >
                                {
                                    avatar && avatar != '' ?
                                        <><img style={{ height: '100%', width: '100px' }}
                                            src={avatar}>
                                        </img>
                                        </>
                                        :
                                        <Empty style={{ height: '100%', width: '100px' }}></Empty>
                                }
                            </div>
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
                        sorter: (a, b) => a.price - b.price,
                        render: (n, record, _) => (
                            <Input type='number' style={{ width: '100px' }} value={n} onChange={(e) => { this.changePrice(record, e) }}></Input>
                        )
                    }, {
                        title: 'Amount',
                        dataIndex: 'amount',
                        key: 'amount',
                        sorter: (a, b) => a.amount - b.amount,
                        render: (n, record, _) => (
                            <Input type='number' style={{ width: '100px' }} value={n} onChange={(e) => { this.changeNumber(record, e) }}></Input>
                        )
                    }, {
                        title: 'State',
                        dataIndex: 'state',
                        key: 'state',
                        sorter: (a, b) => a.state - b.state,
                        render: (text, record, _) => (
                            <Button style={{ width: '100px' }} onClick={() => { this.changeState(record) }}>{text == 1 ? 'Avaibable' : 'Unavaibable'}</Button>
                        )
                    }, {
                        title: '',
                        dataIndex: 'delete',
                        // key: '',
                        render: (v, record, _) => (
                            <Button style={{ width: '70px' }} onClick={() => { this.deleteProduct(record) }}>Delete</Button>
                        )
                    },


                    ]} dataSource={[...this.props.product_list]}>
                </Table>


            </Flex>
        )
    }
}


export default ProductView;