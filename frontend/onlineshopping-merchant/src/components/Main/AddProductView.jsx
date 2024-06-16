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
                        {this.state.base64 ?
                            <Image
                                width={250}
                                height={250}
                                style={{ borderRadius: '300px' }}
                                src={this.state.base64}
                            />
                            :
                            <Image
                                width={250}
                                height={250}
                                style={{ borderRadius: '300px' }}
                                src="error"
                                fallback="data:image/png;base64,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"
                            />
                        }
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