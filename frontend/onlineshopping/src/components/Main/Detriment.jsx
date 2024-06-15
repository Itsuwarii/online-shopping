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
                    this.props.purchaseList != null && this.props.purchaseList.length != 0
                        ?

                        <>
                            <List style={{ margin: '15px', width: '100%', height: '100%' }} itemLayout="horizontal">
                                {
                                    this.props.purchaseList.map((item) => (
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
                                    ))

                                }
                            </List>
                            <div style={{ fontSize: '30px', marginRight: '20px', position: 'absolute', right: 200, bottom: 100 }}>Total :  {(this.getTotal()).toFixed(2)}</div>
                            <Button size='large' type='primary' style={{ position: 'absolute', right: 100, bottom: 100 }} >PurChase</Button>
                        </>
                        :
                        <Empty style={{ margin: 'auto auto' }}></Empty >
                }
            </Flex>
        )
    }
}

export default DetrimentView;