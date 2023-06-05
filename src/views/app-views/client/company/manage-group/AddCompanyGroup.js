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
  Select
} from "antd";
// import Flex from "components/shared-components/Flex";
// import GeneralField from "../../apps/e-commerce/ProductForm/GeneralField";
// import VariationField from "../../apps/e-commerce/ProductForm/VariationField";
// import ShippingField from "../../apps/e-commerce/ProductForm/ShippingField";
// import ProductListData from "assets/data/product-list.data.json";
import ApiSnippets from "constants/ApiSnippet";
import dayjs from "dayjs";
const options = [];

const AddCompanyGroup = () => {
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
    return current && current < dayjs().startOf("day");
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

const handleAddClient = async (value, e) => {
      setLoading(true);
      // if (state.button === 2) {
      //   console.log("state.button === 2 working");
      //   // navigate('/app/client/company');
      // }         
    let ApiData = {
        "name":value.group_name,
        "msg":value.message,
        "intval":value.interval,
        "start":value["start_date"].format("DD-MM-YYYY"),
        "file":value.companies,
        "auto":checkTicket,
        "sms":checkTicket !== 0 ? smsRadio: 0,
        "email":checkTicket !== 0 ? emailRadio : 0

        // "active":value.active_deactive,
        // "sendemail":`${send_email}`,
        // "sendsms":`${send_txt_msg}`,
        // "bdate":value["birth_date"].format("DD-MM-YYYY"),
        // date: value["date"].format("DD-MM-YYYY"), //Add your required date format here
        // date: value["date"].format("YYYY-MM-DD HH:mm:ss")  //Add your required date format here
    };
    console.log(ApiData);
    
    let response = await await ApiSnippets("/EditCompanyGroup", ApiData);

    let countObj = await response;
    
    console.log(countObj);
    // setApiStatus(countObj.status)
    if (countObj.status === true) {
        successMsg(countObj.message)
        setTimeout(() => {
            form.resetFields();
          }, 500);
         if(btnStatus === 1){
            // console.log("btnStatus: ",btnStatus);
            navigate('/app/client/manage_group');
            
          }
        //   if (btnStatus ===2) {
        //     navigate('/app/client/company');
        //  }
          
    }else{
        // message.error(countObj.message); 
        errorMsg(countObj.message)
    }
      
    setLoading(false);
  };
 


const intervalData = [
    { id: 0, duration: 'Week' },
    { id: 1, duration: 'Half-Month' },
    { id: 2, duration: 'Month' },
    { id: 3, duration: 'Quater' },
    { id: 4, duration: 'Half-Year' },
    { id: 5, duration: 'Year' },
]
  const hanldeCompaniesSelect = async (value) => {
    console.log(value);
  }
  const handleInterval = (value) => {
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
            <Card title="Add Group" style={{ marginTop: 20 }}>
              <div className="">
                <Spin spinning={loading}>
                  <Row gutter={12} justify="start">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        name="group_name"
                        label="Group name : "
                        rules={[
                          
                          {
                            required: true,
                            message: "Please input your Group name!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter User Name" />
                      </Form.Item>
                    </Col>

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
                            mode="multiple"
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

                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item
                          label="Message : "
                          name="message"
                          rules={[
                            {
                              required: true,
                              message: "Please input your message!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter first name" />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<Form.Item name="interval" label="interval"  
                                    rules={[
                                        {
                                            required: true,message: "Please input Client name!",
                                        },
                                        ]}>
									<Select
										showSearch
										style={{ width: "100%" }}
										placeholder="Select a Client"
										optionFilterProp="children"
										onChange={handleInterval}
										// onFocus={onFocus}
										// onBlur={onBlur}
                                        // onSelect={getuserData}
										// onSearch={onSearch}
										filterOption={(input, Option) =>
											Option.props.children
												.toLowerCase()
												.indexOf(input.toLowerCase()) >= 0
										}
									>
										{
											intervalData.map((item, index) => (
												<Option key={index} value={item.id} >
													{item.duration}
												</Option>
											))}
									</Select>
								</Form.Item>
							</Col>
                        {/* date input */}
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        name="start_date"
                        label="Starting Date : "
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
                      <div style={{ marginBottom: 12 }}>
                        <Form.Item
                          label="Auto Ticket Generate : "
                          name="ticketgenerate"
                          rules={[
                            {
                              required: true,
                              message: "Please select your any one !",
                            },
                          ]}
                        >
                          <Radio.Group initialValues=""  buttonStyle="solid">
                            <Radio.Button name="active" value="1" onClick={()=> setCheckTicket(1)}>Yes</Radio.Button>
                            <Radio.Button name="deactive" value="0" onClick={()=> setCheckTicket(0)}>No</Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                    </Col>

                    {checkTicket === 1 && (
                        <>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 12 }}>
                        <Form.Item
                          label="Send SMS : "
                          name="sms"
                          rules=""
                        >
                          <Radio.Group initialValues="" buttonStyle="solid">
                            <Radio.Button name="active" value="1" onClick={()=>setSmsRadio(1)} >Yes</Radio.Button>
                            <Radio.Button name="deactive" value="0" onClick={()=>setSmsRadio(0)} >No</Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                    </Col> <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 12 }}>
                        <Form.Item
                          label="Send Email : "
                          name="email"
                          rules=""
                        >
                          <Radio.Group initialValues="" buttonStyle="solid">
                            <Radio.Button name="active" value="1" onClick={()=>setEmailRadio(1)} >Yes</Radio.Button>
                            <Radio.Button name="deactive" value="0" onClick={()=>setEmailRadio(0)} >No</Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                    </Col>
                    </>
                    )} 





                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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
                    {/* <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 0 }}>
                        <Form.Item>
                        {contextHolder}
                          <Button
                            type="primary"
                            value="1"
                            name="AddCompanyBtn"
                            htmlType="submit"
                            // onClick={hanldeSaveAndAddCompany}
                            onClick={() => setBtnStatus(2)}
                            style={{ width: "100%",whiteSpace: "normal" }}
                          >
                            Save and Add Company
                          </Button>
                        </Form.Item>
                      </div>
                    </Col> */}
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

export default AddCompanyGroup;
