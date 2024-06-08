import React from 'react';

import {
    Button, Checkbox, Form, Input, Row,
    Select, Flex, message,
} from 'antd';

import client, { saveAccessToken } from '../../api/axios';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const Register = () => {
    var username = ''
    var password = ''
    var confirmPassword = ''
    var gender = 0
    var intro = ''
    var telephone = ''
    var agreement = false

    function onChangeUserName(e) {
        username = e.target.value;
    }
    function onChangePassword(e) {
        password = e.target.value;
    }
    function onChangeConfirmPassword(e) {
        confirmPassword = e.target.value;
    }
    function onChangeIntro(e) {
        intro = e.target.value;
    }
    function onChangeTelePhone(e) {
        telephone = e.target.value;
    }
    function onChangeGender(e) {
        gender = e.target.value;

    }
    function onChangeAgreement(e) {
        agreement = e.target.checked
    }
    function submit() {
        if (username != '' && password != '' && confirmPassword == password && agreement == true) {
            client.post('token/register', {
                "name": username,
                "password": password,
                "sex": gender,
                "telephone": telephone,
                "intro": intro,
            }).then(function (response) {
                if (response.code === 200) {
                    console.log("register success", response);
                    saveAccessToken(response.data.Auth.Token);
                    window.location.replace('/');
                }
            }).catch(function (error) {
                console.log(error);
                if (error.response.data == 'user existed\n') {
                    message.info("User existed please goto login!");
                }
            });
        }
    }

    return (
        <>
            <p style={{
                fontSize: '50px',
                textAlign: 'center',
            }}>
                User Register
            </p>
            <Row style={{
                // height: '100vh'
            }} justify="center" align="middle">
                <Flex
                    style={{
                        borderRadius: 10,
                        border: '1px solid #40a9ff',
                        padding: '30px',
                    }}
                    justify='center'
                    align='center'>
                    <Form
                        onSubmitCapture={submit}
                        {...formItemLayout}
                        name="register"
                        initialValues={{
                            prefix: '86',
                        }}
                        style={{
                            maxWidth: 1000,
                        }}
                        size='large'
                        scrollToFirstError
                        labelCol={{
                            span: 9,
                        }}
                        wrapperCol={{
                            span: 15,
                        }}
                    >

                        <Form.Item
                            name="username"
                            label="Username"
                            tooltip="What do you want others to call you?"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input onChange={onChangeUserName} />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password onChange={onChangePassword} />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The new password that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password onChange={onChangeConfirmPassword} />
                        </Form.Item>

                        <Form.Item
                            name="intro"
                            label="Intro"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input Intro',
                                },
                            ]}
                        >
                            <Input.TextArea onChange={onChangeIntro} showCount maxLength={100} />
                        </Form.Item>

                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please select gender!',
                                },
                            ]}
                        >
                            <Select placeholder="select your gender">
                                <Option onChange={onChangeGender} value="1">Male</Option>
                                <Option onChange={onChangeGender} value="2">Female</Option>
                                <Option onChange={onChangeGender} value="0">Other</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve(true) : Promise.reject(new Error('Should accept agreement')),
                                },
                            ]}
                            {...tailFormItemLayout}
                        >
                            <Checkbox onChange={onChangeAgreement}>
                                I have read the <a href="">agreement</a>
                            </Checkbox>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}>
                            <Button type="primary" htmlType="submit"
                                style={{
                                    width: '100%'
                                }}
                            >
                                Register
                            </Button>
                            <Flex justify='center'>
                                <Button type='link'><a href="/login">Login</a></Button>
                            </Flex>
                        </Form.Item>
                    </Form>
                </Flex>
            </Row>
        </>
    );
};

export default Register;