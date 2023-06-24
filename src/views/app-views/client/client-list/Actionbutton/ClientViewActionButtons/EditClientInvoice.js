import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Input,
  DatePicker,
  InputNumber,
  Radio,
  Checkbox,
  Select
} from "antd";

import ApiSnippets from "constants/ApiSnippet";
import dayjs from "dayjs";
const options = [];

const EditClientInvoice = () => {
  const { Option } = Select;
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [companiesData, setCompaniesData] = useState([])
  const [companyData, setCompanyData] = useState([]);
  const [clientName, setClientName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [send_txt_msg, setSend_txt_msg] = useState(0);
  const [send_email, setSend_email] = useState(0);
  const { id } = useParams();
  const viewDataId = id.slice(1, id.length);

  const successMsg = (msg) => {
    // message.success(countObj.message);
    messageApi.success(msg);
  };
  const errorMsg = (msg) => {
    // message.success(countObj.message);
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
  const handleEditInvoice = async (value, id) => {
    // console.log(value);
    let ApiData = {
      "id": viewDataId,
      "btnSave": "Update",
      "Client":value.CLname,
      "amount": value.amount,
      "name": value.description,
      //Add your required date format here
      // date: value["date"].format("YYYY-MM-DD HH:mm:ss")  //Add your required date format here
    };
    console.log(ApiData)
    let response = await ApiSnippets("/edit_invoice_data", ApiData);
    let countObj = await response;

    if (countObj.status === true) {
      successMsg(countObj.message)
      setTimeout(() => {
        form.resetFields();
        navigate('/app/payment/invoice_list');
      }, 500);
    } else {
      // message.error(countObj.message); 
      errorMsg(countObj.message)
    }

    setLoading(false);
  };

  const handleCancel = () => {
    // navigate('/app/payment/custom_invoice');
  }
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
      <Form layout="vertical" form={form} onFinish={handleEditInvoice} >
        {/* <PageHeaderAlt className="border-bottom">
          <div className="container">
          //////////////////////////////////////////////////onFinish={handleAddClient}
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
            <Card title="Add New Custom Invoice" style={{ marginTop: 20 }}>
              <div className="">
                <Spin spinning={loading}>
                  <Row gutter={12} justify="start">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item name="CLname" label="Client Name"
                        rules={[
                          {
                            required: true,
                            message: "Please select your Client!",
                          },
                        ]}>
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="Select a Client"
                          optionFilterProp="children"
                          // onChange={handleClientChange}
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
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item label="Amount" name="amount"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Amount!",
                            },
                          ]}>

                          <Input
                            id='Amount'
                            type="NumberFormat"
                            // instialsValues={paymentAmount}
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}

                            className='w-100 '
                          />



                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item label="Description" name="description"
                          rules={[
                            {
                              required: true,
                              message: "Please enter description!",
                            },
                          ]}>

                          <Input className='w-100 '
                          />
                        </Form.Item>
                      </div>
                    </Col>







                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 0 }}>
                        <Form.Item>
                          {contextHolder}
                          <Button
                            type="primary"
                            value="0"
                            name="save"
                            htmlType="submit"
                            // onClick={hanldeSaveAndGoToList}
                            // onClick={() => setBtnStatus(1)}
                            style={{ width: "100%", whiteSpace: "normal" }}
                          >
                            Save
                          </Button>
                        </Form.Item>
                      </div>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 0 }}>
                        <Form.Item>
                          {contextHolder}
                          <Button
                            danger
                            type="primary"
                            value="0"
                            name="cancel"
                            // htmlType="submit"
                            onClick={handleCancel}
                            // onClick={() => setBtnStatus(1)}
                            style={{ width: "100%", whiteSpace: "normal", boxShadow: "none" }}
                          >
                            Cancel
                          </Button>
                        </Form.Item>
                      </div>
                    </Col>

                  </Row>
                </Spin>
              </div>
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default EditClientInvoice;
