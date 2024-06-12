import React from 'react';

import {
    AntDesignOutlined,
} from '@ant-design/icons';

import {
    Flex, Avatar, Input,
    message, Select
} from 'antd';

import client from '../../api/axios';


class AccountView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {
                avatar_locator: '',
                intro: '',
                name: '',
                sex: '',
                telephone: '',
            }
        }
    }

    componentDidMount() {
        this.pullData()
    }

    pullData = () => {
        client.get(`user`)
            .then((response) => {
                if (response.data != null) {
                    this.setState({
                        data: this.state.userInfo = {
                            avatar_locator: response.data.avatar_locator,
                            intro: response.data.intro,
                            name: response.data.name,
                            sex: response.data.sex,
                            telephone: response.data.telephone,
                        }
                    })
                }
            })
            .catch(error => {
                console.log(error);
                // message.config({
                //     duration: 1,
                //     maxCount: 1
                // })
                // message.error('Network error')
                setTimeout(this.pullData, 5000);
            });
    };


    pushData = (tipe) => {
        client.post(`user`, {
            name: this.state.userInfo.name,
            avatar_locator: this.state.userInfo.avatar_locator,
            sex: this.state.userInfo.sex,
            telephone: this.state.userInfo.telephone,
            intro: this.state.userInfo.intro,
        })
            .then((response) => {
                message.config({
                    duration: 1,
                    maxCount: 1,
                });
                message.success(tipe + " update success")

            })
            .catch(error => {
                console.log(error);
                message.config({
                    duration: 2,
                    maxCount: 1,
                });
                message.error(tipe + " update failed")
            });
    }

    onChangeName = (event) => {
        let value = event.target.value

        if (value == '') {
            message.error("You must to input a user name")
        } else {
            this.setState({
                data: this.state.userInfo = {
                    avatar_locator: this.state.userInfo.avatar_locator,
                    intro: this.state.userInfo.intro,
                    name: value,
                    sex: this.state.userInfo.sex,
                    telephone: this.state.userInfo.telephone,
                }
            })
        }
    }

    onChangeIntro = (event) => {
        let value = event.target.value
        this.setState({
            data: this.state.userInfo = {
                avatar_locator: this.state.userInfo.avatar_locator,
                intro: value,
                name: this.state.userInfo.name,
                sex: this.state.userInfo.sex,
                telephone: this.state.userInfo.telephone,
            }
        })

        this.pushData('Intro')
    }

    onChangeSex = (event) => {
        console.log('into change sex', event)
        let value = event
        this.setState({
            data: this.state.userInfo = {
                avatar_locator: this.state.userInfo.avatar_locator,
                intro: this.state.userInfo.intro,
                name: this.state.userInfo.name,
                sex: value,
                telephone: this.state.userInfo.telephone,
            }
        })

        this.pushData('Sex')
    }

    onChangeTelephone = (event) => {
        let value = event.target.value
        this.setState({
            data: this.state.userInfo = {
                avatar_locator: this.state.userInfo.avatar_locator,
                intro: this.state.userInfo.intro,
                name: this.state.userInfo.name,
                sex: this.state.userInfo.sex,
                telephone: value,
            }
        })

        this.pushData('TelePhone')
    }


    render() {
        return (
            <Flex style={{ flexDirection: 'column', width: '100%', height: '100%', textAlign: 'center', verticalAlign: 'center' }}>
                <Flex style={{ flexDirection: 'column', margin: "0 auto" }}>
                    <Avatar
                        size={{ xs: 240, sm: 320, md: 400, lg: 640, xl: 300, xxl: 100 }}
                        icon={<AntDesignOutlined />}
                    />
                    <Input onChange={this.onChangeName} size='large' style={{ textAlign: 'center', marginTop: '20px', padding: '10px', fontSize: '20px' }} width={'50%'} placeholder='Name' value={this.state.userInfo.name}></Input>

                    <Input onChange={this.onChangeIntro} size='large' style={{ textAlign: 'center', marginTop: '20px', padding: '10px', fontSize: '20px' }} width={'50%'} placeholder='Intro' value={this.state.userInfo.intro}></Input>

                    <Select onChange={this.onChangeSex} value={this.state.userInfo.sex ? this.state.userInfo.sex : 'Are you a human?'} style={{ textAlign: 'center', marginTop: '20px', fontSize: '20px' }} size='large' placeholder="select your gender">
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                        <Select.Option value="secret">Secret</Select.Option>
                    </Select>

                    {/* <Input onChange={this.onChangeSex} size='large' style={{ textAlign: 'center', marginTop: '20px', padding: '10px', fontSize: '20px' }} width={'50%'} placeholder='Sex' value={this.state.userInfo.sex}></Input> */}

                    <Input onChange={this.onChangeTelephone} size='large' style={{ textAlign: 'center', marginTop: '20px', padding: '10px', fontSize: '20px' }} width={'50%'} placeholder='Telephone' value={this.state.userInfo.telephone}></Input>

                </Flex>


            </Flex>
        )
    }
}

export default AccountView;