import React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { ShoppingCartOutlined, CheckOutlined, LoadingOutlined, ClearOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Flex, Card, Button, Space, Image, Input, Select, Spin, message, InputNumber, Empty, FloatButton, Tooltip } from 'antd';
import client from '../../api/axios';

import TextArea from 'antd/es/input/TextArea';
const { Meta } = Card;

class AccountView extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            userInfo: {
                AvatarLocator: '',
                Intro: '',
                Licence: ',',
                TelePhone: '',
                Name: '',
                Date: 0,
            },
            image: null,
            isDragging: false,
            imageBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg==",
        }
    }

    componentDidMount() {
        this.pullData()
    }

    pullData = () => {
        client.get(`merchant`)
            .then((response) => {

                console.log(response);
                if (response.data != null) {
                    this.setState({
                        userInfo: response.data
                    })
                    this.getImage(response.data.AvatarLocator);
                }
            })
            .catch(error => {
                console.log(error);
                setTimeout(this.pullData, 5000);
            });
    };


    pushData = (tipe, data) => {

        client.post(`merchant`, data)
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
                    duration: 1,
                    maxCount: 1,
                });
                message.error(tipe + " update failed")
            });
    }

    onChangeName = (event) => {
        let value = event.target.value
        let userInfo = {
            ...this.state.userInfo,
            Name: value,
        }

        if (value == '') {
            message.error("You must to input a user name")
        } else {
            this.setState({
                userInfo
            })
        }

        this.pushData('Name', userInfo)
    }

    onChangeIntro = (event) => {
        let value = event.target.value
        let userInfo = {
            ...this.state.userInfo,
            Intro: value,
        }

        this.setState({
            userInfo
        })

        this.pushData('Intro', userInfo)
    }

    onChangeLience = (event) => {
        let value = event.target.value

        let userInfo = {
            ...this.state.userInfo,
            Licence: value,
        }

        this.setState({
            userInfo
        })

        this.pushData('Licence', userInfo)
    }

    onChangeTelephone = (event) => {
        let value = event.target.value

        let userInfo = {
            ...this.state.userInfo,
            TelePhone: value,
        }

        this.setState({
            userInfo
        })

        this.pushData('TelePhone', userInfo)
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
            this.setState({ imageBase64: reader.result });
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
                    let userInfo = {
                        ...this.state.userInfo,
                        AvatarLocator: respone.data.hash,
                    }

                    this.setState({
                        userInfo
                    })
                    this.pushData("Image", userInfo);
                }
            })
            .catch((e) => {
                console.log(e)
            })
    };

    getImage = (AvatarLocator) => {
        if (AvatarLocator != '')
            client.post(`image/get`, {
                hash: AvatarLocator,
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
                    </Space>
                    <Input onChange={this.onChangeName} size='large' style={{ textAlign: 'center', marginTop: '20px', padding: '10px', fontSize: '20px' }} placeholder='Name' value={this.state.userInfo.Name}></Input>

                    <TextArea onChange={this.onChangeIntro} size='large' style={{ height: '100px', textAlign: 'center', marginTop: '20px', padding: '10px', fontSize: '20px' }} placeholder='Intro' value={this.state.userInfo.Intro}></TextArea>

                    <Input onChange={this.onChangeLience} size='large' style={{ textAlign: 'center', marginTop: '20px', padding: '10px', fontSize: '20px' }} placeholder='Lience' value={this.state.userInfo.Licence}></Input>
                    <Input onChange={this.onChangeTelephone} size='large' style={{ textAlign: 'center', marginTop: '20px', padding: '10px', fontSize: '20px' }} placeholder='Telephone' value={this.state.userInfo.TelePhone}></Input>

                </Flex>
            </Flex>
        )
    }
}


export default AccountView;