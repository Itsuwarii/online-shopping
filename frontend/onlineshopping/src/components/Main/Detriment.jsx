import React from 'react';

import {
    AntDesignOutlined,
} from '@ant-design/icons';

import {
    Flex, Avatar, Input, Image, message, Select, Space, Empty,
    List,
    Button
} from 'antd';

import client from '../../api/axios';
import TextArea from 'antd/es/input/TextArea';

import css from './styles/index.module.css';

class DetrimentView extends React.Component {

    pruchase = () => {
        let list = this.props.purchaseList;
        console.log(list)

        // ID            int64       `json:"id"`
        // Name          string      `json:"name"`
        // MerchantId    int64       `json:"merchant"`
        // AvatarLocator string      `json:"avatar_locator"`
        // ImagesLocator string      `json:"images_locator"`
        // Intro         string      `json:"intro"`
        // Price         float64     `json:"price"`
        // Amount        int64       `json:"amount"`
        // State         int64       `json:"state"`

        for (let i = 0; i < list.length; i++) {
            console.log(list[i])
            let item = list[i];
            client.post(`order`, {
                remark: '',
                product: {
                    id: item.id,
                    name: item.name,
                    merchant: item.merchant,
                    avatar_locator: item.avatar_locator,
                    images_locator: item.images_locator,
                    intro: item.intro,
                    price: item.price,
                    amount: item.buyNumber,
                    state: 1,
                },
            }).then(e => {
                console.log(e);
                this.props.setPurchaseList()
            }).catch(e => {
                console.log(e);
            })
        }
    }

    getTotal = () => {
        let total = 0;
        let list = this.props.purchaseList;
        for (let i = 0; i < list.length; i++) {
            total += list[i].price * list[i].buyNumber;
        }
        return total;
    }

    render() {
        return (
            <Flex className={css.con01} style={{ overflow: 'auto', flex: '1', height: '100%', width: '100%', }} >
                {
                    <>
                        <List dataSource={this.props.purchaseList} style={{ margin: '15px', width: '100%', height: '100%' }} itemLayout="horizontal"
                            renderItem={(item) => (
                                <List.Item key={item.id}>
                                    <List.Item.Meta
                                        avatar={<Avatar src='' />}
                                        title={item.name}
                                        description={item.intro}
                                    />
                                    <Flex >
                                        Price : {item.price.toFixed(2)}
                                        Total : {(item.price * item.buyNumber).toFixed(2)}
                                    </Flex>
                                </List.Item>
                            )}>
                        </List>
                        <div style={{ fontSize: '30px', marginRight: '20px', position: 'absolute', right: 200, bottom: 100 }}>Total :  {(this.getTotal()).toFixed(2)}</div>
                        <Button onClick={this.pruchase} size='large' type='primary' style={{ position: 'absolute', right: 100, bottom: 100 }} >PurChase</Button>
                    </>

                }
            </Flex>
        )
    }
}

export default DetrimentView;