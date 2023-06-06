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
import ApiSnippets from "constants/ApiSnippet";
import dayjs from "dayjs";


const AddLocation = () => {
  const { Option } = Select;
 
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [send_txt_msg, setSend_txt_msg] = useState(0);
    const [send_email, setSend_email] = useState(0);
    const [btnStatus, setBtnStatus] = useState(0);
    const [companyData, setCompanyData] = useState([]);
    const [clientName, setClientName] = useState(null);
    
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


      
        "txtlocname":value.location_name,
        "txtsorttag":value.sort_code,
        "txtminlimit":value.form_limit,
        "txtmaxlimit":value.to_limit,
        "btnSave":"Save"
    




        // "bdate":value["birth_date"].format("DD-MM-YYYY"),
        // date: value["date"].format("DD-MM-YYYY"), //Add your required date format here
        // date: value["date"].format("YYYY-MM-DD HH:mm:ss")  //Add your required date format here
    };
    console.log(ApiData);
    
    let response = await await ApiSnippets("/add_location", ApiData);

    let countObj = await response;
    
    console.log(countObj);
    // setApiStatus(countObj.status)
    if (countObj.status === true) {
        successMsg(countObj.message)
        setTimeout(() => {
          navigate('/app/dashboards/file_manager/add_file_location');

            form.resetFields();
          }, 500);
        //  if(btnStatus === 1){
        //     // console.log("btnStatus: ",btnStatus);
        //     navigate('/app/client/list');
        //   }
        //   if (btnStatus ===2) {
        //     navigate('/app/client/company');
        //  }
          
    }else{
        // message.error(countObj.message); 
        errorMsg(countObj.message)
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
            <Card title="Add Location" style={{ marginTop: 20 }} >
              <div className="">
                <Spin spinning={loading}>
                  <Row gutter={12} justify="start">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        name="location_name"
                        label="Location name : "
                        rules={[
                          {
                            required: true,
                            message: "Please input Location name!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter Location Name" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item
                          label="Sort Code : "
                          name="sort_code"
                          rules={[
                            {
                              required: true,
                              message: "Please input Sort Code!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter Sort Code" />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item
                        name="form_limit"
                        label="Form Limit"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Form Limit!",
                          },
                        ]}>
                        <Input
                          type="NumberFormat"
                            placeholder="Enter Form Limit"
                            // min={1}
                            // max={1000000000}
                            // minLength={10}
                            // maxLength={13}
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
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item
                        name="to_limit"
                        label="To Limit"
                        rules={[

                          {
                            required: true,
                            message: "Please Enter To Limit!",
                          },
                        ]}>
                        <Input
                          type="NumberFormat"
                            placeholder="Enter To Limit"
                            // min={1}
                            // max={1000000000}
                            // minLength={10}
                            // maxLength={13}
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
    
                            onClick={() => navigate('/app/dashboards/file_manager/add_file_location')}
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

export default AddLocation;
