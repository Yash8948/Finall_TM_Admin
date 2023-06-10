import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
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
import dayjs from "dayjs";


const ResetPassword = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [send_txt_msg, setSend_txt_msg] = useState(0);
    const [send_email, setSend_email] = useState(0);
    const [companyData, setCompanyData] = useState([]);
    const [clientName, setClientName] = useState(null);
    const { Option } = Select;


    const successMsg = (msg) => {

        messageApi.success(msg);
    };
    const errorMsg = (msg) => {

        messageApi.error(msg);
    };
    const handleSend_txt_msg = (e) => {
        // 0 = false
        // 1 = true
        // console.log(`checked = ${e.target.checked}`);
        setSend_txt_msg(e.target.checked === true ? 1 : 0);
    };
    const handleSend_email = (e) => {
        // 0 = false
        // 1 = true
        // console.log(`checked = ${e.target.checked}`);

        setSend_email(e.target.checked === true ? 1 : 0);
    };


    const handleAddNewPassword = async (value, e) => {
        setLoading(true);

        let ApiData = {

            "company": value.CLname,
            "gstun": value.gst_username,
            "gstpass": value.password,
            "anotherpass": value.anPassword,
            "note": value.note,
            "save": "save"
        }
        console.log(ApiData);

        let response = await await ApiSnippets("/add_client_password", ApiData);




        if (response.status === true) {
            successMsg(response.message)
            setTimeout(() => {
                // form.resetFields();
            }, 500);

            navigate('/app/client/password')
        } else {

            errorMsg(response.message)
        }

        setLoading(false);
    };

    useEffect(() => {
        var company = [
        ];
        const getAllData = async () => {
            let response = await ApiSnippets("/Company", null);
            let data = response.data;
            let clientName = data.map(item => item.name, item => item.id);
            setClientName(clientName);
            // console.log(data[0].id)
            for (let index = 0; index < data.length; index++) {
                company.push({
                    id: data[index].id,
                    name: data[index].name
                });

            }
            setCompanyData(company)
            // console.log(myObj[0].id);
            // console.log(company);
        };

        getAllData();

    }, []);
    return (
        <>
            <Form layout="vertical" form={form} onFinish={handleAddNewPassword}>
                {/* <PageHeaderAlt className="border-bottom">
          <div className="container">
            <Flex
              className="py-0"
              mobileFlex={false}
              justifyContent="space-between"
              alignItems="center"
            >
              <h2 className="mb-0">Add Client</h2>
            </Flex>
          </div>
        </PageHeaderAlt> */}
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Card title="Add New Password" style={{ marginTop: 20 }}>
                            <div className="">
                                <Spin spinning={loading}>
                                    <Row gutter={12} justify="start">
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <div style={{ marginBottom: 16 }}>
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
                                                    <Input.Password />
                                                </Form.Item>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
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
                                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                        },
                                                    }),
                                                ]}
                                            >
                                                <Input.Password />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className="my-2">


                                            <div style={{ marginTop: 0 }} className="my-1">
                                                <Checkbox onChange={handleSend_txt_msg}>Send Text Message</Checkbox>
                                            </div>


                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className="my-2">
                                            <div style={{ marginBottom: 5 }}>
                                                <Checkbox onChange={handleSend_email}>Send Email</Checkbox>
                                            </div>
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

export default ResetPassword;
