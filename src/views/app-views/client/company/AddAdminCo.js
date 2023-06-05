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
} from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "../../apps/e-commerce/ProductForm/GeneralField";
import VariationField from "../../apps/e-commerce/ProductForm/VariationField";
import ShippingField from "../../apps/e-commerce/ProductForm/ShippingField";
import ProductListData from "assets/data/product-list.data.json";
import ApiSnippets from "constants/ApiSnippet";
import dayjs from "dayjs";


const AddAdminCo = () => {
    const { Option } = Select;
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [send_txt_msg, setSend_txt_msg] = useState(0);
    const [send_email, setSend_email] = useState(0);
    const [btnStatus, setBtnStatus] = useState(0);
    const [getAllClient, setGetAllClient] = useState([]);
    const [clientID, setClientID] = useState(null);
    const [matchdata, setMatchdata] = useState([]);
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





const onSearch = async(value) => {
    let type = {
        "type ": 2,
        "search":value
    };
    let response = await ApiSnippets("/GetUsers", type);   
    let countObj = await response.data;
    // console.log(countObj);
    let searchedClients = [];
    for (let i = 0; i < countObj.length; i++) {
        searchedClients.push({
            id: countObj[i].ID,
            name: countObj[i].first_name+" "+countObj[i].last_name
        });
    }
    setGetAllClient(searchedClients);
    // console.log(clients);

}
const getClients = async (value) => {
    // console.log(value);
    setClientID(value);
    // console.log(clientID);
    let type = {
        "type ": 2
    };
    let response = await ApiSnippets("/GetUsers", type);   
    let countObj = await response.data;
    // console.log(countObj);
    let clients = [];
    for (let i = 0; i < countObj.length; i++) {
        clients.push({
            id: countObj[i].ID,
            name: countObj[i].first_name+" "+countObj[i].last_name,
            number:countObj[i].contact_number,
            mail:countObj[i].email,
        });
    }
    setGetAllClient(clients);
    // console.log(clients);
    // console.log(getAllClient);
}

const getuserData = (value,event) => {
    console.log("selected client");
    let eventData = event; 
    let result = Object.keys(eventData).map((key) => [key, eventData[key]]);
    console.log("result");
  console.log(result);

  setMatchdata(result);
  console.log(matchdata);
  }
  // console.log(matchdata[3][1][0]);
  
useEffect(() => {
  // console.log("useeffect");
    getClients();
  console.log(getAllClient);    
}, [])
useEffect(() => {
  // form.setFieldsValue({
  //     email:"",
  //     contact_number:"",
  //   });
  if(matchdata.length !== 0){

    form.setFieldsValue({
      email: matchdata[3][1][0],
      contact_number: matchdata[3][1][1],
      // contact_number: matchdata[3][1][1].slice(3),
    });
    // console.log(matchdata[3][1][1]);
    // console.log(matchdata[3][1][1].slice(3));
  }

}, [matchdata])


const handleAddClient = async (value, e) => {
      setLoading(true);
      // if (state.button === 2) {
      //   console.log("state.button === 2 working");
      //   // navigate('/app/client/company');
      // }         
    let ApiData = {
        Employee:value.client_name,
        name:value.user_name,
        sdate:value["starting_date"].format("DD-MM-YYYY"),
        pname:value.proprietor_name,
        gstno:value.gst_number,
        pannum:value.pan_number,
        add1:value.address_one,
        add2:value.address_two,
        district:value.district,
        state:value.state,
        ref:value.refernce,
        number:value.contact_number,
        email:value.email,
        // date: value["date"].format("DD-MM-YYYY"), //Add your required date format here
        // date: value["date"].format("YYYY-MM-DD HH:mm:ss")  //Add your required date format here
    };
    console.log(ApiData);
    
    let response = await ApiSnippets("/AddCompany", ApiData);
    

    let countObj = await response;
    console.log(countObj);
    // console.log(countObj);
    // setApiStatus(countObj.status)
    if (countObj.status === true) {
        successMsg(countObj.message)
        setTimeout(() => {
            // form.resetFields();
          }, 500);
         if(btnStatus === 1){
            // console.log("btnStatus: ",btnStatus);
            navigate('/app/client/company');
          }
          if (btnStatus ===2) {
            navigate('/app/dashboards/task/taskadd');
          }
          if (btnStatus ===3) {
           navigate('/app/dashboards/file_manager/addfile');
         }
          
    }else{
        // message.error(countObj.message); 
        errorMsg(countObj.message)
    }
      
    setLoading(false);
  };
  

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
            <Card title="Add Company" style={{ marginTop: 20 }} extra=
                        {<Button
                              type="primary"
                              value="0"
                              name="GoToListBtn"
                              htmlType="submit"
                              onClick={() =>  navigate('/app/client/addclientform')}
                              style={{ width: "100%",whiteSpace: "normal" }}
                          >
                            Add New Client
                          </Button>}>
              <div className="">
                <Spin spinning={loading}>
                  <Row gutter={12} justify="start">
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
								<Form.Item name="client_name" label="Client Name"  
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
										onChange={getClients}
										// onFocus={onFocus}
										// onBlur={onBlur}
                    onSelect={getuserData}
										onSearch={onSearch}
										filterOption={(input, Option) =>
											Option.props.children
												.toLowerCase()
												.indexOf(input.toLowerCase()) >= 0
										}
									>
										{getAllClient &&
											getAllClient.map((item, index) => (
												<Option key={index} value={item.id} title={[item.mail,item.number]}>
													{item.name}
												</Option>
											))}
									</Select>
								</Form.Item>
							</Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        name="user_name"
                        label="Name : "
                        rules={[
                          
                          {
                            required: true,
                            message: "Please input User name!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter User Name" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        name="starting_date"
                        label="Starting Date : "
                        rules={[
                            {
                              required: true,
                              message: "Please input Starting Date!",
                            },
                          ]}
                      >
                        <DatePicker
                          initialValues={dayjs()}
                          format={dateFormatList}
                        //   disabledDate={disabledDate}
                          // onChange={handleDatePicker}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item
                          label="Proprietor Name : "
                          name="proprietor_name"
                          rules={[
                            {
                              required: true,
                              message: "Please input Proprietor name!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter Proprietor name" />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item
                          label="GST Number : "
                          name="gst_number"
                          rules={[
                            {
                              required: true,
                              message: "Please input GST Number!",
                            },
                          ]}
                        >
                          <Input
                          type="NumberFormat"
                        //   addonBefore="+91"
                            placeholder="Enter GST Number"
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
                            
                            // style={{
                            //   width: "100%",
                            // }}
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item
                          label="PAN Number : "
                          name="pan_number"
                          rules={[
                            {
                              required: true,
                              message: "Please input PAN Number!",
                            },
                          ]}
                        >
                          <Input
                          type="NumberFormat"
                        //   addonBefore="+91"
                            placeholder="Company's PAN Number. If Not Then Individual PAN Number."
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
                            
                            // style={{
                            //   width: "100%",
                            // }}
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item
                          label="Address 1. : "
                          name="address_one"
                          rules={[
                            {
                              required: true,
                              message: "Please input Address 1!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter Address 1." />
                        </Form.Item>
                      </div>
                    </Col>
                    
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item
                          label="Address 2. : "
                          name="address_two"
                          rules={[
                            {
                              required: true,
                              message: "Please input Address 2!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter Address 2." />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item
                          label="District : "
                          name="district"
                          rules={[
                            {
                              required: true,
                              message: "Please input District!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter District" />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item
                          label="State : "
                          name="state"
                          rules={[
                            {
                              required: true,
                              message: "Please input State!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter State" />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item
                          label="Refernce : "
                          name="refernce"
                          rules={[
                            {
                              required: true,
                              message: "Please input Refernce!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter Refernce" />
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
                              message: "Please input E-mail!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter Mail Address"   />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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
                              message: "Please input Contact Number!",
                            },
                          ]}
                        >
                          <Input
                          type="NumberFormat"
                          // addonBefore="+91"
                            placeholder="Enter Contact Number"
                            // min={1}
                            // max={1000000000}
                            minLength={10}
                            maxLength={10}
                            // onChange=""
                            // defaultValue={myArray[0].number}
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
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                      <div style={{ marginBottom: 0 }}>
                        <Form.Item>
                        {contextHolder}
                          <Button
                            type="primary"
                            value="0"
                            name="GoToListBtn"
                            htmlType="submit"
                            onClick={() => setBtnStatus(1)}
                            style={{ width: "100%",whiteSpace: "normal" }}
                          >
                            Save And Go To List
                          </Button>
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                      <div style={{ marginBottom: 0 }}>
                        <Form.Item>
                        {contextHolder}
                          <Button
                            type="primary"
                            value="0"
                            name="GoToListBtn"
                            htmlType="submit"
                            onClick={() => setBtnStatus(2)}
                            style={{ width: "100%",whiteSpace: "normal" }}
                          >
                            Save And Go To Add Task
                          </Button>
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                      <div style={{ marginBottom: 0 }}>
                        <Form.Item>
                        {contextHolder}
                          <Button
                            type="primary"
                            value="1"
                            name="AddCompanyBtn"
                            htmlType="submit"
                            onClick={() => setBtnStatus(3)}
                            style={{ width: "100%",whiteSpace: "normal" }}
                          >
                            Save and Add To Add File
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

export default AddAdminCo;
