import React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { TagOutlined, ShoppingCartOutlined, CheckOutlined, LoadingOutlined, ClearOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Flex, Card, Button, Space, Image, Spin, message, InputNumber, Empty, FloatButton, Tooltip, Input, List } from 'antd';
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
                console.log(respone);
                this.setState({ product_list: respone.data.product_list })
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
                    dataSource={this.state.product_list}
                    renderItem={(item) => (
                        <List.Item>
                            <Flex style={{ margin: '5px', marginRight: '20px', height: '200px', width: '100%' }} key={item.id}>
                                <Flex style={{ flexDirection: 'column', padding: '5px', height: '100%', width: '100%' }}>
                                    <Space style={{ width: '100%', }}>
                                        <img src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' style={{ width: '200px', height: '150px' }}></img>
                                        <Input.TextArea style={{ height:'100%',width:'100%', borderRadius: '5px', fontSize: '20px' }}  >
                                        </Input.TextArea>
                                    </Space>
                                    
                                    <Flex style={{ bottom: 0, height: '100%', width: '100%' }}>
                                        <Space >
                                            <Input style={{ textAlign: 'center' }} value={item.name}></Input>
                                            Amount<Input style={{ width: '100px', }} type='number' value={item.amount}></Input>
                                            Price<Input style={{ width: '100px', }} type='text' value={item.price}></Input>
                                            Available<Button style={{ width: '100px', }} type="primary" >{item.state == 1 ? 'Available' : "Unavailable"}</Button>
                                        </Space>
                                    </Flex>

                                </Flex>
                            </Flex>
                        </List.Item>
                    )}
                />
            </Flex>
        )
    }
}


export default ProductView;