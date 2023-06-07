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
  Input,
  DatePicker,
  InputNumber,
  Radio,
  Checkbox,
  Select,
  TimePicker
} from "antd";
// import Flex from "components/shared-components/Flex";
// import GeneralField from "../../apps/e-commerce/ProductForm/GeneralField";
// import VariationField from "../../apps/e-commerce/ProductForm/VariationField";
// import ShippingField from "../../apps/e-commerce/ProductForm/ShippingField";
// import ProductListData from "assets/data/product-list.data.json";
import ApiSnippets from "constants/ApiSnippet";
import dayjs from "dayjs";
const options = [];

const AddAttendanceForm = () => {
    const { Option } = Select;
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [companiesData, setCompaniesData] = useState([])
    const [loading, setLoading] = useState(false);
    const [send_txt_msg, setSend_txt_msg] = useState(0);
    const [send_email, setSend_email] = useState(0);
    const [btnStatus, setBtnStatus] = useState(0);
    const [checkTicket, setCheckTicket] = useState(null)
    const [smsRadio, setSmsRadio] = useState(0)
    const [emailRadio, setEmailRadio] = useState(0)
  const dateFormatList = ["DD/MM/YYYY"];
  function disabledDate(current) {
    // Can not select days after today and today
    return current && current > dayjs().startOf("day"-1);
  }

  const successMsg = (msg) => {
    // message.success(countObj.message);
    messageApi.success(msg);
  };
  const errorMsg = (msg) => {
    // message.success(countObj.message);
    messageApi.error(msg);
  };
  const onChangeIN = (time, timeString) => {
    console.log(time, timeString);
     // Assuming time is in the format HH:mm:ss
    //  let [hours, minutes, seconds] = time.split(':');
    
    //  // Convert hours, minutes, and seconds to integers
    //  hours = parseInt(hours, 10);
    //  minutes = parseInt(minutes, 10);
    //  seconds = parseInt(seconds, 10);
     
    //  // Calculate the total seconds
    //  let totalSeconds = hours * 3600 + minutes * 60 + seconds;
  };
  const onChangeOUT = (time, timeString) => {
    // console.log(time, timeString);
  };

//   function timeToSeconds(value) {
//     // Assuming time is in the format HH:mm:ss
//     let [hours, minutes, seconds] = time.split(':');
    
//     // Convert hours, minutes, and seconds to integers
//     hours = parseInt(hours, 10);
//     minutes = parseInt(minutes, 10);
//     seconds = parseInt(seconds, 10);
    
//     // Calculate the total seconds
//     let totalSeconds = hours * 3600 + minutes * 60 + seconds;
// }

const handleAddAttendance = async (value, e) => {
      setLoading(true);
      // if (state.button === 2) {
      //   console.log("state.button === 2 working");
      //   // navigate('/app/client/company');
      // }         
    let ApiData = {
        "Employee":value.companies,
        "in_time":value["in_time"].format("HH:mm"),   
        "out_time":value["out_time"].format("HH:mm"),
        "created_on":value["date"].format("DD-MM-YYYY"),
        "save":"save"

        // date: value["date"].format("DD-MM-YYYY"), //Add your required date format here
        // date: value["date"].format("YYYY-MM-DD HH:mm:ss")  //Add your required date format here
    };
    console.log(ApiData);
    
    let response = await await ApiSnippets("/Reports/AttendanceLog_Edit", ApiData);

    let countObj = await response;
    
    console.log(countObj);
    // setApiStatus(countObj.status)
    if (countObj.status === true) {
        successMsg(countObj.message)
        setTimeout(() => {
            form.resetFields();
          }, 500);
         if(btnStatus === 1){
            navigate('/app/reports/attendance_log')
          }
        
          
    }else{
        // message.error(countObj.message); 
        errorMsg(countObj.message)
    }
      
    setLoading(false);
  };
 



  const hanldeCompaniesSelect = async (value) => {
    console.log(value);
  }
  
  useEffect(() => {
    const getCompanies = async () => {

        let response = await ApiSnippets("/Company");   
        let countObj = await response.data;
        console.log(countObj);
        setCompaniesData(countObj)
    }
    getCompanies();
    
  
  }, [])
  

  return (
    <>
      <Form layout="vertical" form={form} onFinish={handleAddAttendance} initialValues={
        {"date":dayjs()}
      }>
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
            <Card title="Add Attendance" style={{ marginTop: 20 }}>
              <div className="">
                <Spin spinning={loading}>
                  <Row gutter={12} justify="start">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 16 }}>
                      <Form.Item
                          label="companies  : "
                          name="companies"
                          rules={[
                            {
                              required: true,
                              message: "Please select your companies!",
                            },
                          ]}
                        >
                        <Select
                            onChange={hanldeCompaniesSelect}
                        >
                            {companiesData &&
                                companiesData.map(item => (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                      </div>
                    </Col>
                        {/* date input */}
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        name="date"
                        label="Date : "
                        rules={[
                            {
                              required: true,
                              message: "Please input your Date!",
                            },
                          ]}
                      >
                        <DatePicker
                        
                          initialValues={dayjs()}
                          format={dateFormatList}
                          disabledDate={disabledDate}
                          // onChange={handleDatePicker}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        name="in_time"
                        label="In Time : "
                        rules={[
                            {
                              required: true,
                              message: "Please input IN Time!",
                            },
                          ]}
                      >
                        <TimePicker format="hh:mm" onChange={onChangeIN} style={{width:"100%"}} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        name="out_time"
                        label="Out Time : "
                        rules={[
                            {
                              required: true,
                              message: "Please input OUT Time!",
                            },
                          ]}
                      >
                        <TimePicker format="hh:mm" onChange={onChangeOUT} style={{width:"100%"}}/>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 0 }}>
                        <Form.Item>
                        {contextHolder}
                          <Button
                            type="primary"
                            value="0"
                            name="GoToListBtn"
                            htmlType="submit"
                            // onClick={hanldeSaveAndGoToList}
                            onClick={() => setBtnStatus(1)}
                            style={{ width: "100%",whiteSpace: "normal" }}
                          >
                            Save And Go To List
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
                            // onClick={hanldeSaveAndAddCompany}
                            onClick={() => navigate('/app/reports/attendance_log')}
                            style={{ width: "100%",whiteSpace: "normal",boxShadow:"none" }}
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

export default AddAttendanceForm;
