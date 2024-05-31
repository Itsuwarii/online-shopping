import React from 'react';
import { Button, Checkbox, Form, Input, Row, Flex } from 'antd';
import {
    UserOutlined,
    VerifiedOutlined,
} from '@ant-design/icons';


const Login = () => {
    function submit(){
        
    }


    return (
        <>
        <p style={{
            fontSize: '60px',
            textAlign:'center',
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
                        <Input prefix={<UserOutlined />}></Input>
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
                        <Input.Password prefix={<VerifiedOutlined />}></Input.Password>
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
                            onClick={submit}
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