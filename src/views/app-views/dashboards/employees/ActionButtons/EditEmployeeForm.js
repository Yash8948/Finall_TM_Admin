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
  Radio,
  Checkbox,
} from "antd";
// import Flex from "components/shared-components/Flex";
// import GeneralField from "../../apps/e-commerce/ProductForm/GeneralField";
// import VariationField from "../../apps/e-commerce/ProductForm/VariationField";
// import ShippingField from "../../apps/e-commerce/ProductForm/ShippingField";
// import ProductListData from "assets/data/product-list.data.json";
import ApiSnippets from "constants/ApiSnippet";
import dayjs from "dayjs";


const EditEmployeeForm = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const {id} = useParams();
    const dataID = id.slice(1, id.length);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [send_txt_msg, setSend_txt_msg] = useState(0);
    const [send_email, setSend_email] = useState(0);
    const [btnStatus, setBtnStatus] = useState(0);
    const [sendemaildDefault, setSendemaildDefault] = useState()
    const [textMsgDefault, setTextMsgDefault] = useState();
    // console.log(textMsgDefault);
    // var SendemaildDefault;
    // var TextMsgDefault;
  const dateFormatList = ["DD/MM/YYYY"];


  const getUserByID =async () =>{
    // dataID

    let ApiData = {
        "id":dataID,
        "type":1
    };
    // console.log(ApiData);
    
    let response = await ApiSnippets("/GetUsers", ApiData);

    let countObj = await response;
    
    console.log(countObj.data[0]);

 
    if(countObj.status){
        let empData = countObj.data[0]; 
        // console.log(data.employee);
        
// console.log(empData.send_email);
        var birthDayTOdate = new Date(empData.birthdate * 1000).toLocaleDateString("en-GB")
        // console.log(birthDayTOdate);
            
        form.setFieldsValue({

            user_name:empData.username,
            first_name:empData.first_name,
            last_name:empData.last_name,
            email:empData.email,
            contact_number:empData.contact_number,
            birth_date:dayjs(birthDayTOdate, 'DD-MM-YYYY'),
            // birth_date:birthDayTOdate,
            // alt_number:,
            active_deactive:empData.active,
            sendemail:empData.send_email === "1" ? setSendemaildDefault(true) : setSendemaildDefault(false),
            textmsg:empData.send_sms === "1" ? setTextMsgDefault(true) : setTextMsgDefault(false)
            // textmsg:true


        })
        console.log(textMsgDefault);
        console.log(sendemaildDefault);

    }
    //   });

  }


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
  const onReset = () => {
    form.resetFields();
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

const handleEditClient = async (value, e) => {
      setLoading(true);
      // if (state.button === 2) {
      //   console.log("state.button === 2 working");
      //   // navigate('/app/client/company');
      // }         
    let ApiData = {
        "id":dataID,
        "un":value.user_name,
        "fname":value.first_name,
        "lname":value.last_name,
        "email":value.email,
        "num":value.contact_number,
        "par_num":value.alt_number,
        "active":value.active_deactive,
        "sendemail":`${send_email}`,
        "sendsms":`${send_txt_msg}`,
        "bdate":value["birth_date"].format("DD-MM-YYYY"),
        // date: value["date"].format("DD-MM-YYYY"), //Add your required date format here
        // date: value["date"].format("YYYY-MM-DD HH:mm:ss")  //Add your required date format here
    };
    console.log(ApiData);
    
    let response = await ApiSnippets("/Edit_Employee", ApiData);

    let countObj = await response;
    
    console.log(countObj);
    // setApiStatus(countObj.status)
    if (countObj.status === true) {
        successMsg(countObj.message)
        setTimeout(() => {
            form.resetFields();
          }, 500);
         if(btnStatus === 1){
            navigate('/app/dashboards/employees');
          }
          if (btnStatus ===2) {
            navigate('/app/dashboards/employees');
         }
          
    }else{
        // message.error(countObj.message); 
        errorMsg(countObj.message)
    }
      
    setLoading(false);
  };
  


  useEffect(() => {
    getUserByID();
}, [])

// console.log(textMsgDefault);

  return (
    <>  
      <Form layout="vertical" form={form} onFinish={handleEditClient}
      initialValues={{
        sendemail: true,
        textmsg:textMsgDefault
      }}
      

       >
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
            <Card title="Edit Employee" style={{ marginTop: 20 }}>
              <div className="">
                <Spin spinning={loading}>
                  <Row gutter={12} justify="start">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        name="user_name"
                        label="User name : "
                        rules={[
                          
                          {
                            required: true,
                            message: "Please input your User name!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter User Name" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        name="birth_date"
                        label="Birth Date : "
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
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item
                          label="First name  : "
                          name="first_name"
                          rules={[
                            {
                              required: true,
                              message: "Please input your first name!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter first name" />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item
                          label="Last Name : "
                          name="last_name"
                          rules={[
                            {
                              required: true,
                              message: "Please input your Last Name!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter Last Name" />
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
                          label="Contact Number : "
                          name="contact_number"
                          rules={[
                            {
                                max: 13,
                                message: "Value should only 13 digits",
                            },
                            {
                              required: true,
                              message: "Please input your Number!",
                            },
                          ]}
                        >
                          <Input
                          type="NumberFormat"
                        //   addonBefore="+91"
                            placeholder="Enter Contact Number"
                            // min={1}
                            // max={1000000000}
                            minLength={10}
                            maxLength={13}
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
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item
                          label="Alternate Number : "
                          name="alt_number"
                          rules={[
                            {
                                max: 13,
                                message: "Value should only 13 digits",
                            },
                            {
                              required: true,
                              message: "Please input your Alternative Number!",
                            },
                          ]}
                        >
                          <Input
                          type="NumberFormat"
                        //   addonBefore="+91"
                            placeholder="Enter Contact Number"
                            // min={1}
                            // max={1000000000}
                            minLength={10}
                            maxLength={13}
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
                      <div style={{ marginBottom: 12 }}>
                        <Form.Item
                          label="Account : "
                          name="active_deactive"
                          rules={[
                            {
                              required: true,
                              message: "Please select your any one !",
                            },
                          ]}
                        >
                          <Radio.Group initialValues="" buttonStyle="solid">
                            <Radio.Button name="active" value="1">Active</Radio.Button>
                            <Radio.Button name="deactive" value="0">Deactive</Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className="my-2">
                      {/* <Row xs={24} sm={12} md={12} lg={12} xl={12}> */}

                      <div style={{ marginTop: 0 }} className="my-1">
                        <Checkbox name="textmsg" value="textmsg" onChange={handleSend_txt_msg}>Send Text Message</Checkbox>
                      </div>
                       <div style={{ marginBottom: 5 }}>
                        <Checkbox name="sendemail" value="sendemail" onChange={handleSend_email}>Send Email</Checkbox>
                      </div>
                      {/* </Row> */}
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}></Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
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
                            Submit
                          </Button>
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                      <div style={{ marginBottom: 0 }}>
                        <Form.Item>
                        {contextHolder}
                        <Button htmlType="button" onClick={onReset} style={{ width: "100%",whiteSpace: "normal" }}>
                            Reset
                        </Button>
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                      <div style={{ marginBottom: 0 }}>
                        <Form.Item>
                        {contextHolder}
                        <Button
                        danger
                            type="primary"
                            // value="0"
                            // name="GoToListBtn"
                            // htmlType="submit"
                            // onClick={hanldeSaveAndGoToList}
                            onClick={() =>    navigate('/app/dashboards/employees')}
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

export default EditEmployeeForm;
