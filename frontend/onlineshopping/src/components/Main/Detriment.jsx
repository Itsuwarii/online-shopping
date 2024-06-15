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
            <>
                <List itemLayout="horizontal">
                    {
                        this.props.purchaseList && this.props.purchaseList.length == 0 ?
                            <Empty style={{ margin: 'auto auto' }}></Empty >
                            :
                            this.props.purchaseList.map((item) => (
                                <List.Item key={item.id}>
                                    <List.Item.Meta
                                        avatar={<Avatar src='' />}
                                        title={item.name}
                                        description={item.intro}
                                    />
                                    <Flex >
                                        Price : {item.price}
                                        Total : {item.price * item.buyNumber}
                                    </Flex>
                                </List.Item>
                            ))
                    }
                </List>

                <div style={{ fontSize: '30px', marginRight: '20px', position: 'absolute', right: 200, bottom: 100 }}>Total :  {this.getTotal()}</div>
                <Button size='large' type='primary' style={{ position: 'absolute', right: 100, bottom: 100 }} >PurChase</Button>
            </>
        )
    }
}

export default DetrimentView;