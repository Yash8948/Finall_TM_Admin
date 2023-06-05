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
} from "antd";
import ApiSnippets from "constants/ApiSnippet";
import dayjs from "dayjs";


const AddFile = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [send_txt_msg, setSend_txt_msg] = useState(0);
    const [send_email, setSend_email] = useState(0);
    const [btnStatus, setBtnStatus] = useState(0);
    
  const dateFormatList = ["DD/MM/YYYY"];
  function disabledDate(current) {
    // Can not select days after today and today
    return current && current > dayjs().startOf("day");
  }

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
    setSend_txt_msg(e.target.checked === true ? 1:0);
  };
  const handleSend_email = (e) => {
    // 0 = false
    // 1 = true
    // console.log(`checked = ${e.target.checked}`);

    setSend_email(e.target.checked === true ? 1:0);
  };
//   console.log(send_txt_msg);
//   console.log(send_email);


  const hanldeAddCompany = () => {
    navigate('/app/client/addadmin_company');
  }

const handleAddClient = async (value, e) => {
      setLoading(true);
      // if (state.button === 2) {
      //   console.log("state.button === 2 working");
      //   // navigate('/app/client/company');
      // }         
    let ApiData = {

        "un":value.user_name,
        "fname":value.first_name,
        "lname":value.last_name,
        "email":value.email,
        "num":"+91"+value.contact_number,
        "active":value.active_deactive,
        "sendemail":`${send_email}`,
        "sendsms":`${send_txt_msg}`,
        "bdate":value["birth_date"].format("DD-MM-YYYY"),
        // date: value["date"].format("DD-MM-YYYY"), //Add your required date format here
        // date: value["date"].format("YYYY-MM-DD HH:mm:ss")  //Add your required date format here
    };
    console.log(ApiData);
    
    let response = await await ApiSnippets("/Add_Client", ApiData);

    let countObj = await response;
    
    // console.log(countObj);
    // setApiStatus(countObj.status)
    if (countObj.status === true) {
        successMsg(countObj.message)
        setTimeout(() => {
            // form.resetFields();
          }, 500);
         if(btnStatus === 1){
            // console.log("btnStatus: ",btnStatus);
            navigate('/app/client/list');
          }
          if (btnStatus ===2) {
            navigate('/app/client/company');
         }
          
    }else{
        // message.error(countObj.message); 
        errorMsg(countObj.message)
    }
      
    setLoading(false);
  };
  
  const hanldeSaveAndAddCompany = async () => {
    // if (apiStatus === true) {
    //     // console.log("object");
    //     navigate('');
    // }
  } 
  const hanldeSaveAndGoToList = async () => {
    // if (apiStatus === true) {
    //     // console.log("object");
    //     // navigate('/app/client/company');
    // }
  }

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
            <Card title="Add File" style={{ marginTop: 20 }} extra={<Button
                            type="primary"
                            value="0"
                            name="GoToListBtn"
                            htmlType="submit"
                            onClick={hanldeAddCompany}
                            style={{ width: "100%",whiteSpace: "normal" }}
                          >
                            Add Company
                          </Button>}>
              <div className="">
                <Spin spinning={loading}>
                  <Row gutter={12} justify="start">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        name="file_name"
                        label="File name : "
                        rules={[
                          
                          {
                            required: true,
                            message: "Please input your File name!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter File Name" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item
                          label="File Number : "
                          name="file_number"
                          rules={[
                            {
                              required: true,
                              message: "Please input your File Number!",
                            },
                          ]}
                        >
                          <Input
                          type="NumberFormat"
                          // addonBefore="+91"
                            placeholder="Enter File Number"
                            // min={1}
                            // max={1000000000}
                            // minLength={10}
                            // maxLength={10}
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
                      <div style={{ marginBottom: 0 }}>
                        <Form.Item>
                        {contextHolder}
                          <Button
                            type="primary"
                            value="0"
                            name="save"
                            htmlType="submit"
                            // onClick={hanldeSaveAndGoToList}
                            onClick={() => setBtnStatus(1)}
                            style={{ width: "100%",whiteSpace: "normal" }}
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
                        <Button type="primary" danger
    
                            onClick={() => setBtnStatus(2)}
                            style={{ width: "100%",whiteSpace: "normal", boxShadow:"none" }}
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

export default AddFile;