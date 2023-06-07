import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import {
  Tabs,
  Form,
  message,
  Button,
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




const AddAdminLeave = () => {
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


  const handleAddAdminLeave = async (value, e) => {
    setLoading(true);
    // if (state.button === 2) {
    //   console.log("state.button === 2 working");
    //   // navigate('/app/client/company');
    // }         
    let ApiData = {

      "reason": value.reason,
      "fdate": value.Fdate,
      "tdate": value.Tdate,
      "shift": value.shifts,
      "description": value.description,
      "save": "save",
    };
    console.log(ApiData);

    let response = await await ApiSnippets("/Edit_Admin_Leave", ApiData);

    let adminleaveData = await response;


    if (adminleaveData.status === true) {
      successMsg(adminleaveData.message)
      setTimeout(() => {
        // form.resetFields();
      }, 500);

      navigate('/app/leave/adminleave')
    } else {

      errorMsg(adminleaveData.message)
    }

    setLoading(false);
  };

  return (
    <>
      <Form layout="vertical" form={form} onFinish={handleAddAdminLeave}>

        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Card title="Add New Admin Leave" style={{ marginTop: 20 }}>
              <div className="">
                <Spin spinning={loading}>
                  <Row gutter={12} justify="start">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        name="reason"
                        label="Reason"
                        rules={[

                          {
                            required: true,
                            message: "Please Add Reason!",
                          },
                        ]}>
                        <Input placeholder="Enter Reason for Leave" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        label="Shift "
                        name="shifts"
                        rules={[
                          {
                            required: true,
                            message: "Please select your any one !",
                          },
                        ]}
                      >
                        <Radio.Group initialValues="" buttonStyle="solid">
                          <Radio.Button name="shift1" value="0">Shift 1</Radio.Button>
                          <Radio.Button name="shift2" value="1">Shift 2</Radio.Button>
                          <Radio.Button name="fullday" value="2">Full day</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item label="From Date" name="Fdate" 
                      rules={[
                        {
                          required: true,
                          message: "Please select date !",
                        },
                      ]}>
                        <DatePicker
                          // defaultValue={dayjs()}
                          format={dateFormatList}
                          disabledDate={disabledDate}
                          onChange={handleDatePicker}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>

                      <Form.Item label=" To Date" name="Tdate"
                      rules={[
                        {
                          required: true,
                          message: "Please select date !",
                        },
                      ]} >
                        <DatePicker

                          // defaultValue={dayjs()}
                          format={dateFormatList}
                          disabledDate={disabledDate}
                          onChange={handleDatePicker}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                      {
                        required: true,
                        message: "Please enter description!",
                      },
                    ]}
                  >
                    <Input.TextArea rows={4} />
                  </Form.Item>
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

export default AddAdminLeave;
