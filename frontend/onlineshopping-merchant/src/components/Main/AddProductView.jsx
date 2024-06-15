import React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { ShoppingCartOutlined, CheckOutlined, LoadingOutlined, ClearOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Flex, Skeleton, Card, Button, Space, Image, Spin, message, InputNumber, Empty, FloatButton, Tooltip, Input } from 'antd';
import client from '../../api/axios';


class AddProductView extends React.Component {

    uploadImage = async (image) => {
        let resp = await client.post(`image`, {
            base64: image
        }).catch(e => {
            console.log(e);
        })

        return resp.data.hash;
    }

    // Name           string    `json:"name"`
    // Price          float64   `json:"price"`
    // AvatarLocator  string    `json:"avatar_locator"`
    // ImagesLocator  string    `json:"images_locator"`
    // Intro          string    `json:"intro"`
    // State          int64     `json:"state"`
    // Amount         int64     `json:"amount"`

    render() {
        return (
            <Flex wrap gap="large" style={{ overflow: 'auto', flex: '1', height: '100%', width: '100%', }}>
                <Flex style={{ height: '50%', width: '100%' }}>
                    <img src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' style={{ margin:'10px', width:'200px', height: '200px' }}></img>
                    <Space style={{ flexFlow: 'column', }}>
                        <Input placeholder='Product Name'></Input>
                        <Input placeholder='Product Name'></Input>
                        <Input placeholder='Product Name'></Input>
                    </Space>
                </Flex>

            </Flex>
        )
    }
}


export default AddProductView;