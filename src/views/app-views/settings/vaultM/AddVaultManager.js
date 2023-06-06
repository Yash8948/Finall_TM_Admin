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


const AddVaultManager = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [send_txt_msg, setSend_txt_msg] = useState(0);
  const [send_email, setSend_email] = useState(0);
  const [btnStatus, setBtnStatus] = useState(0);
  const [companyData, setCompanyData] = useState([]);
  const [clientName, setClientName] = useState(null);
  const { Option } = Select;


  const successMsg = (msg) => {

    messageApi.success(msg);
  };
  const errorMsg = (msg) => {

    messageApi.error(msg);
  };



  const handleAddClient = async (value, e) => {
    setLoading(true);
    // if (state.button === 2) {
    //   console.log("state.button === 2 working");
    //   // navigate('/app/client/company');
    // }         
    let ApiData = {

      "company": value.CLname,
      "name": value.website_name,
      "usname": value.user_name,
      "email": value.email,
      "pass": value.password,
      "rpass": value.confirm,
      "number": "+91" + value.contact_number,
      "note": value.note,
    };
    console.log(ApiData);

    let response = await await ApiSnippets("/Add_Vault", ApiData);

    let vaultData = await response;


    if (vaultData.status === true) {
      successMsg(vaultData.message)
      setTimeout(() => {
        // form.resetFields();
      }, 500);

      navigate('/app/settings/vaultM')
    } else {

      errorMsg(vaultData.message)
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
      <Form layout="vertical" form={form} onFinish={handleAddClient}>
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
            <Card title="Add New Vault" style={{ marginTop: 20 }}>
              <div className="">
                <Spin spinning={loading}>
                  <Row gutter={12} justify="start">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        name="CLname"
                        label="Client Name"
                        rules={[

                          {
                            required: true,
                            message: "Please Select Client!",
                          },
                        ]}>
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="Select a Client"
                          optionFilterProp="children"
                          // onFocus={onFocus}
                          // onBlur={onBlur}
                          // onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0

                          }

                        >
                          {companyData &&
                            companyData.map((item, index) => (
                              <Option key={index} value={item.id}>
                                {item.name}
                              </Option>
                            ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        name="website_name"
                        label="Name / Website "
                        rules={[

                          {
                            required: true,
                            message: "Please enter Name/Website name!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter Name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item
                          label="User Name  : "
                          name="user_name"
                          rules={[
                            {
                              required: true,
                              message: "Please input your username!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter User name" />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item
                          name="email"
                          label="E-mail :"
                          rules={[
                            {
                              type: "email",
                              message: "The input is not valid E-mail!",
                            },
                            {
                              required: true,
                              message: "Please input your E-mail!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter Mail Address" />
                        </Form.Item>
                      </div>
                    </Col>
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
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item
                          label="Contact Number : "
                          name="contact_number"
                          rules={[
                            {
                              max: 10,
                              message: "Value should only 10 digits",
                            },
                            {
                              required: true,
                              message: "Please input your Number!",
                            },
                          ]}
                        >
                          <Input
                            type="NumberFormat"
                            addonBefore="+91"
                            placeholder="Enter Contact Number"
                            // min={1}
                            // max={1000000000}
                            minLength={10}
                            maxLength={10}
                            // onChange=""
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}

                            style={{
                              width: "100%",
                            }}
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        name="note"
                        label="Note"
                      >
                        <Input placeholder="Enter Note" />
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

export default AddVaultManager;
