import React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { ShoppingCartOutlined, CheckOutlined, LoadingOutlined, ClearOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Flex, Skeleton, Card, Button, Space, Image, Spin, message, InputNumber, Empty, FloatButton, Tooltip, Input } from 'antd';
import client from '../../api/axios';


class AddProductView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                name: '',
                price: 0.0,
                avatar_locator: '',
                images_locator: '',
                intro: '',
                state: 0,
                amount: 0,
            },
            base64: '',
        }
    }

    handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ isDragging: true })
    };

    handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ isDragging: false })
    };

    handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    convertToBase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            // console.log(reader.result)
            this.setState({ base64: reader.result });
            this.uploadImage(reader.result);
        };
    };

    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ isDragging: false })

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            this.convertToBase64(file);
        }
    };

    uploadImage = (file) => {
        client.post('image/', {
            base64: file,
        }).then((respone) => {
            if (respone.data.hash) {
                this.setState({
                    product: {
                        ...this.state.product,
                        avatar_locator: respone.data.hash,
                    }
                })
            }
        }).catch((e) => {
            console.log(e)
        })
    };

    // Name           string    `json:"name"`
    // Price          float64   `json:"price"`
    // AvatarLocator  string    `json:"avatar_locator"`
    // ImagesLocator  string    `json:"images_locator"`
    // Intro          string    `json:"intro"`
    // State          int64     `json:"state"`
    // Amount         int64     `json:"amount"`

    pushData = () => {
        client.post(`product`, this.state.product).then(e => {
            console.log(e);
            this.setState({
                product: {
                    name: '',
                    price: 0,
                    avatar_locator: '',
                    images_locator: '',
                    intro: '',
                    state: '',
                    amount: 0,
                }
            })

            message.success('create success');
        }).catch(e => { console.log(e) })
    }

    changeName = (e) => {
        this.setState({
            product: {
                ...this.state.product,
                name: e.target.value,
            }
        })
    }
    changeIntro = (e) => {
        this.setState({
            product: {
                ...this.state.product,
                intro: e.target.value,
            }
        })
    }
    changePrice = (e) => {
        let price = Number(e.target.value);
        this.setState({
            product: {
                ...this.state.product,
                price: price,
            }
        })
    }

    changeAmount = (e) => {
        let amount = Number(e.target.value);
        this.setState({
            product: {
                ...this.state.product,
                amount,
            }
        })
    }

    changeState = (e) => {
        let state = this.state.product.state;
        if (state == 0) {
            state = Number(1);
        } else state = Number(0);

        this.setState({
            product: {
                ...this.state.product,
                state: state,
            }
        })
    }

    submit = () => {
        if (this.state.product.name == '') {
            message.config({
                maxCount: 1,
                duration: 1,
            })
            message.error('name cannot empty')
            return;
        }
        if (this.state.product.intro == '') {
            message.config({
                maxCount: 1,
                duration: 1,
            })
            message.error('intro cannot empty')
            return;
        }
        if (this.state.product.avatar_locator == '') {
            message.config({
                maxCount: 1,
                duration: 1,
            })
            message.error('image cannot empty')
            return;
        }
        if (this.state.product.price == '' || this.state.product.price == '0') {
            message.config({
                maxCount: 1,
                duration: 1,
            })
            message.error('price cannot empty')
            return;
        }
        if (this.state.product.amount == 0) {
            message.config({
                maxCount: 1,
                duration: 1,
            })
            message.error('amount cannot empty')
            return;
        }

        this.pushData();
    }

    render() {
        return (
            <Flex wrap gap="large" style={{ overflow: 'auto', flex: '1', height: '100%', width: '100%', }}>
                <Flex style={{ padding: '10px', height: '100%', width: '100%' }}>
                    <div
                        onDragEnter={this.handleDragEnter}
                        onDragLeave={this.handleDragLeave}
                        onDragOver={this.handleDragOver}
                        onDrop={this.handleDrop} >
                        <img
                            width={300}
                            height={300}
                            style={{ borderRadius: '300px' }}
                            src={this.state.base64}
                        />
                    </div>

                    <Space style={{ flexFlow: 'column', width: '100%' }}>
                        <Flex><Input style={{ width: '500px' }} placeholder='Name' onChange={this.changeName} value={this.state.product.name}></Input></Flex>
                        <Flex><Input style={{ width: '500px' }} placeholder='Intro' onChange={this.changeIntro} value={this.state.product.intro}></Input></Flex>
                        <Flex><Input style={{ width: '500px' }} placeholder='Price' onChange={this.changePrice} value={this.state.product.price} min={0} max={99999} type='number'></Input></Flex>
                        <Flex><Input style={{ width: '500px' }} placeholder='Amount' onChange={this.changeAmount} value={this.state.product.amount} min={0} max={99999} type='number'></Input></Flex>
                        <Button style={{ width: '500px' }} onClick={this.changeState}>{this.state.product.state == 0 ? 'Activity' : 'Inactive'}</Button>
                        <Button type='primary' style={{ width: '500px' }} onClick={this.submit}>Submit</Button>
                    </Space>
                </Flex>

            </Flex>
        )
    }
}


export default AddProductView;