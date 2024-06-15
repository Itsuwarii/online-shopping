import React from 'react';

import {
    AntDesignOutlined,
} from '@ant-design/icons';

import {
    Flex, Avatar, Input, Image, message, Select, Space, Upload
} from 'antd';

import client from '../../api/axios';
import TextArea from 'antd/es/input/TextArea';


class AccountView extends React.Component {
    constructor(props) {
        super(props)
        // const [previewOpen, setPreviewOpen] = useState(false);
        // const [previewImage, setPreviewImage] = useState('');

        this.state = {
            userInfo: {
                avatar_locator: '',
                intro: '',
                name: '',
                sex: '',
                telephone: '',
            },
            image: null,
            isDragging: false,
            imageBase64: "data:image/png;base64,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",
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
                    this.getImage();
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
            this.setState({ image: reader.result });
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
        })
            .then((respone) => {
                if (respone.data.hash) {
                    this.setState({
                        data: this.state.userInfo = {
                            avatar_locator: respone.data.hash,
                            intro: this.state.userInfo.intro,
                            name: this.state.userInfo.name,
                            sex: this.state.userInfo.sex,
                            telephone: this.state.userInfo.telephone,
                        }
                    })
                    this.pushData();
                }
            })
            .catch((e) => {
                console.log(e)
            })
    };

    getImage = () => {
        client.post(`image/get`, {
            hash: this.state.userInfo.avatar_locator,
            message: ''
        }).then((respone) => {
            this.setState({ imageBase64: respone.data.base64 })
        }).catch(e => {
            console.log(e);
        })

    }

    render() {
        return (
            <Flex warp='true' style={{ overflow: 'auto', flex: '1', flexDirection: 'column', width: '100%', height: '100%', textAlign: 'center', verticalAlign: 'center' }}>
                <Flex style={{ height: '100%', width: '50%', flexDirection: 'column', margin: "0 auto" }}>
                    <Space style={{ flexDirection: 'column', verticalAlign: 'center' }}>
                        {/* <Upload showUploadList={false}  maxCount='1' method='post' > */}
                        <div
                            onDragEnter={this.handleDragEnter}
                            onDragLeave={this.handleDragLeave}
                            onDragOver={this.handleDragOver}
                            onDrop={this.handleDrop} >
                            <img

                                width={300}
                                height={300}
                                style={{ borderRadius: '300px' }}
                                src={this.state.imageBase64}
                            />
                        </div>
                        {/* </Upload> */}
                    </Space>
                    <Input onChange={this.onChangeName} size='large' style={{ textAlign: 'center', marginTop: '20px', padding: '10px', fontSize: '20px' }} width={'50%'} placeholder='Name' value={this.state.userInfo.name}></Input>

                    <TextArea onChange={this.onChangeIntro} size='large' style={{ textAlign: 'center', marginTop: '20px', padding: '10px', fontSize: '20px' }} width={'50%'} placeholder='Intro' value={this.state.userInfo.intro}></TextArea>

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