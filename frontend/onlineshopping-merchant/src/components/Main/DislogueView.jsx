import React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { ShoppingCartOutlined, CheckOutlined, LoadingOutlined, ClearOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Flex, Card, Button, Space, Image, Spin, message, InputNumber, Empty, FloatButton, Tooltip } from 'antd';
import client from '../../api/axios';

const { Meta } = Card;

class DialogueView extends React.Component {

    render() {
        return (
            <Flex wrap gap="large" style={{ overflow: 'auto', flex: '1', height: '100%', width: '100%', }}>

                {/* { */}
                {/* // this.props.product_list.length != 0 ?
                        // .map((item) => (
                        //     <></>
                        // ))
                        <></>
                        // : */}
                <Empty style={{ margin: 'auto auto' }}></Empty >
                {/* } */}
            </Flex>
        )
    }
}


export default DialogueView;