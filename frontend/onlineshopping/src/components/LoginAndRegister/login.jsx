import React from 'react';
import { Button, Checkbox, Form, Input, Row, Flex, message } from 'antd';
import {
    UserOutlined,
    VerifiedOutlined,
} from '@ant-design/icons';
import client, { saveAccessToken } from '../../api/axios';


const Login = () => {
    var username = '';
    var password = '';

    function submit() {
        console.log('into submit')
        if (username != '' && password != '') {
            client.post('token/signin', {
                "username": username,
                "password": password
            }).then(function (response) {
                if (response.status == 200) {
                    console.log("login success", response);
                    saveAccessToken(response.data.auth.token);
                    window.location.replace('/');
                } else {
                    console.log(response);
                }
            }).catch(function (error) {
                console.log(error);
                if (error.response.data == "password check failed\n") {
                    message.info("Password check failed");
                }else{
                    message.info("Login failed");
                }
            });
        }
        console.log('go out submit')
    }
    function onChangeUserName(e) {
        username = e.target.value;
    }

    function onChangePassword(e) {
        password = e.target.value;
    }


    return (
        <>
            <p style={{
                fontSize: '60px',
                textAlign: 'center',
            }}>
                Online Sales For User
            </p>
            <Row style={{
                // height: '100vh',
            }} justify="center" align="middle">
                <Flex
                    style={{
                        borderRadius: 10,
                        border: '1px solid #40a9ff',
                        padding: '30px'
                    }}
                    justify='center'
                    align='center'
                >
                    <Form
                        onSubmitCapture={submit}
                        initialValues={{
                            remember: true,
                        }}
                        size='large'
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input onChange={onChangeUserName} prefix={<UserOutlined />}></Input>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password onChange={onChangePassword} prefix={<VerifiedOutlined />}></Input.Password>
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 6,
                                span: 18,
                            }}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                        >
                            <Button
                                type="primary" htmlType='submit' size='large'
                                style={{
                                    width: '100%'
                                }}
                            >
                                Login
                            </Button>
                            <Flex justify='center'>
                                <Button type='link' ><a href="/register">Register</a></Button>
                                <Button type='link' ><a href="/">not login</a></Button>
                            </Flex>
                        </Form.Item>
                    </Form>
                </Flex>
            </Row >
        </>
    );
}

export default Login;