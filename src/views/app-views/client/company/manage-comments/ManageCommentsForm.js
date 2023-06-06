import React, { useState, } from "react";
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


const ManageCommentsForm = () => {
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
    const [locationfield, setLocationfield] = useState(null)
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
    let ApiData = {


      "company":value.companyname,
      "title":value.title,
      "data":value.conversation



        // "bdate":value["birth_date"].format("DD-MM-YYYY"),
        // date: value["date"].format("DD-MM-YYYY"), //Add your required date format here
        // date: value["date"].format("YYYY-MM-DD HH:mm:ss")  //Add your required date format here
    };
    console.log(ApiData);
    
    let response = await await ApiSnippets("/EditComments", ApiData);

    let countObj = await response;
    
    console.log(countObj);
    // setApiStatus(countObj.status)
    if (countObj.status === true) {
        successMsg(countObj.message)
        setTimeout(() => {
          navigate('/app/dashboards/file_manager');
            // form.resetFields();
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
        form.resetFields(["txtfilename"]);
        errorMsg(countObj.message)
      }
      
      setLoading(false);
    };
    
    let company = [
    ];
    const getAllData = async () => {
      // setLoading(true);
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
      // setLoading(false);
      setCompanyData(company)
      // console.log(myObj[0].id);
      // console.log(company);
    };
    
    getAllData();

 
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
            <Card title="Add File" style={{ marginTop: 20 }} >
              <div className="">
                <Spin spinning={loading}>
                  <Row gutter={12} justify="start">
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item
                        name="companyname"
                        label="Client Name"
                        rules={[

                          {
                            required: true,
                            message: "Please Select Company!",
                          },
                        ]}>
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="Select a Company"
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
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        name="title"
                        label="Title : "
                        rules={[
                          
                          {
                            required: true,
                            message: "Please input Title!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter Title" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Form.Item
                          name="conversation"
                          label="Data/Conversation : "
                          rules={[
                            {
                              required: true,
                              message: "Please input Data/Conversation!",
                            },
                          ]}
                        >
                           <Input placeholder="Enter Data/Conversation" />
                        </Form.Item>
                      </div>
                    </Col>
                    
                    
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}></Col>
                    
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: 0 }}>
                        <Form.Item>
                        {contextHolder}
                          <Button
                            type="primary"
                            value="0"
                            name="save"
                            htmlType="submit"
                            // onClick={onReset}
                            // onClick={() => setBtnStatus(1)}
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
                            onClick={() =>  navigate('/app/client/manage_comments')}
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

export default ManageCommentsForm;
