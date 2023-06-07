import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import {
    Tabs,
    Form,
    Button,
    message,
    Row,
    Col,
    Card,
    Spin,
    Select,
    Input,
    DatePicker,
    InputNumber,
    Radio,
    Checkbox,
} from "antd";
import ApiSnippets from "constants/ApiSnippet";
import TextArea from "antd/es/input/TextArea";



const SandEmail = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);



    const successMsg = (msg) => {

        messageApi.success(msg);
    };
    const errorMsg = (msg) => {

        messageApi.error(msg);
    };



    const handlesendSMS = async (value, e) => {
        setLoading(true);

        let ApiData = {

            "message": value.tmasg,
            "email": value.email,
            "sub": value.subject,
        }
        console.log(ApiData);

        let response = await await ApiSnippets("/SendMail", ApiData);




        if (response.status === true) {
            successMsg(response.message)
            setTimeout(() => {
                // form.resetFields();
            }, 500);

            navigate('/app/notification')
        } else {

            errorMsg(response.message)
        }

        setLoading(false);
    };

    return (
        <>
            <Form layout="vertical" form={form} onFinish={handlesendSMS}>
                <PageHeaderAlt className="border-bottom">
                    <div className="container">
                        <Flex
                            className="py-0"
                            mobileFlex={false}
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <h2 className="mb-0">Sand SMS</h2>
                        </Flex>
                    </div>
                </PageHeaderAlt>
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Card title="" style={{ marginTop: 20 }}>
                            <div className="">
                                <Spin spinning={loading}>
                                    <Row gutter={12} justify="start">
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item
                                                name="email"
                                                label="Email :"
                                                rules={[
                                                    {
                                                        type: 'email'
                                                    },
                                                    {
                                                        required: true,
                                                        message: "Please Enter Email!",
                                                    },
                                                ]}>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item
                                                name="subject"
                                                label="Subject :"
                                                rules={[
                                                    
                                                    {
                                                        required: true,
                                                        message: "Please Enter Subject!",
                                                    },
                                                ]}>
                                                <Input />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Form.Item
                                                name="tmasg"
                                                label="Text Message"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please Enter message!",
                                                    },
                                                ]}
                                            >
                                                <TextArea placeholder="Enter Message" rows={4} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Form.Item>
                                        {contextHolder}
                                        <Button
                                            type="primary" htmlType="submit" className='w-100'
                                        >Submit</Button>
                                    </Form.Item>
                                </Spin>
                            </div>
                        </Card>
                    </Col>
                </Row>

            </Form>
        </>
    );
};

export default SandEmail;
