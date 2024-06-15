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

class OrderView extends React.Component {
    componentDidMount() {
        this.pullData();
    }

    pullData = () => {
        client.post(`order/list`)
            .then(respone => {
                // console.log(respone);
            }).catch(e => {
                console.log(e);
            })
    }

    render() {
        return (
            <Flex className={css.con01} style={{ overflow: 'auto', flex: '1', height: '100%', width: '100%', }} >
                {

                }
            </Flex>
        )
    }
}

export default OrderView;