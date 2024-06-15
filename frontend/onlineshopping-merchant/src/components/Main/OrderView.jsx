import React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { ShoppingCartOutlined, CheckOutlined, LoadingOutlined, ClearOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Flex, Card, Button, Space, Image, Spin, message, InputNumber, Empty, FloatButton, Tooltip } from 'antd';
import client from '../../api/axios';

const { Meta } = Card;

class OrderView extends React.Component {
    componentDidMount() {
        this.pullData();
    }

    pullData = () => {
        client.post(`order/merchant/get`)
            .then((respone) => {
                console.log(respone);
                // this.setState({ product_list: respone.data.product_list })
            }).catch(e => {
                console.log(e);
            })
    }


    render() {
        return (
            <Flex wrap gap="large" style={{ overflow: 'auto', flex: '1', height: '100%', width: '100%', }}>



            </Flex>
        )
    }
}


export default OrderView;