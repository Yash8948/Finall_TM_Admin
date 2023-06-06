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
  Switch,
  Input,
  DatePicker,
  InputNumber,
  Radio,
  Checkbox,
} from "antd";
import ApiSnippets from "constants/ApiSnippet";



const AddManageHoliday = () => {
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
  const dateFormatList = ["DD/MM/YYYY"];

  const successMsg = (msg) => {

    messageApi.success(msg);
  };
  const errorMsg = (msg) => {

    messageApi.error(msg);
  };
  const handleDatePicker = (date, dateString) => {
    // console.log(date, dateString);
  };
  function disabledDate(current) {
    // Can not select days before today and today
    // return current && current < dayjs().startOf("day");
  }


  const handleAddHoliday = async (value, e) => {
    setLoading(true);
    // if (state.button === 2) {
    //   console.log("state.button === 2 working");
    //   // navigate('/app/client/company');
    // }         
    let ApiData = {

      "title": value.title,
      "description": value.description,
      "date": value.date,
      "show_to_users": value.switchValue1,
    };
    console.log(ApiData);

    let response = await await ApiSnippets("/AddHoliday", ApiData);

    let holidayData = await response;


    if (holidayData.status === true) {
      successMsg(holidayData.message)
      setTimeout(() => {
        // form.resetFields();
      }, 500);

      navigate('/app/leave/manageHoliday')

    } else {

      errorMsg(holidayData.message)
    }

    setLoading(false);
  };

  return (
    <>
      <Form layout="vertical" form={form} onFinish={handleAddHoliday}>

        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Card title="Add New Holiday Leave" style={{ marginTop: 20 }}>
              <div className="">
                <Spin spinning={loading}>
                  <Row gutter={12} justify="start">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        name="title"
                        label="Title"
                        rules={[

                          {
                            required: true,
                            message: "Please Add Title!",
                          },
                        ]}>
                        <Input placeholder="Enter Title for Leave" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        name="description"
                        label="Description"
                        rules={[

                          {
                            required: true,
                            message: "Please Add Description!",
                          },
                        ]}
                      >
                        <Input.TextArea rows={1} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item label=" Date " name="date"
                       rules={[
                        {
                          required: true,
                          message: "Please Add date!",
                        },
                      ]}>
                        <DatePicker
                          format={dateFormatList}
                          disabledDate={disabledDate}
                          onChange={handleDatePicker}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        name="switchValue1"
                        label="Show to User"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ marginBottom: 0 }}
                        rules={[
                          {
                            required: true,
                            message: "",
                          },
                        ]}
                      >
                        <Switch
                          name="switchValue1"
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        // defaultChecked
                        />
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

      </Form >
    </>
  );
};

export default AddManageHoliday;
