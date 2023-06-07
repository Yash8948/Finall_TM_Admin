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



const SandSMS = () => {
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



  const handlesendSMS = async (value, e) => {
    setLoading(true);

    let ApiData = {

      "message": value.tmasg,
      "number": value.number,
      "client": value.CLname,
    }
    console.log(ApiData);

    let response = await await ApiSnippets("/SendSms", ApiData);

   


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
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item
                          label="Number : "
                          name="number"
                        //   rules={[
                        //     {
                        //       max: 10,
                        //       message: "Value should only 10 digits",
                        //     },
                        //     {
                        //       required: true,
                        //       message: "Please input your Number!",
                        //     },
                        //   ]}
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
                        name="CLname"
                        label="Client Name"
                        // rules={[

                        //   {
                        //     required: true,
                        //     message: "Please Select Client!",
                        //   },
                        // ]}
                        >
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
                        <TextArea placeholder="Enter Message" rows={4}/>
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

export default SandSMS;
