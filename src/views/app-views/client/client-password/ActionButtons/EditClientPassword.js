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
    Select,
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
import { slice } from "lodash";

const AddClientForm = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const { id } = useParams();
    const dataID = id.slice(1, id.length);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [send_txt_msg, setSend_txt_msg] = useState(0);
    const [send_email, setSend_email] = useState(0);
    const [companyData, setCompanyData] = useState([]);
    const [clientName, setClientName] = useState(null);
    const [btnStatus, setBtnStatus] = useState(0);
    const { Option } = Select;

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
        setSend_txt_msg(e.target.checked === true ? 1 : 0);
    };
    const handleSend_email = (e) => {
        // 0 = false
        // 1 = true
        // console.log(`checked = ${e.target.checked}`);

        setSend_email(e.target.checked === true ? 1 : 0);
    };
    //   console.log(send_txt_msg);
    //   console.log(send_email);

    const getClientById = async () => {
        console.log(dataID)
        let ApiData = {
            "id": dataID,
            // "type": 2
        };
        // console.log(ApiData);
        let response = await ApiSnippets("/edit_client_password", ApiData);
        // fetchData();
        // console.log(response.data.data);
        if (response.status) {
            let ClientPasswordData = response.data.per_data;
            let clientlist = response.data.data;
            console.log(clientlist);
            console.log(ClientPasswordData);
          
            const clientNameValue = clientlist.company; // Store the value in a separate variable
          
            form.setFieldsValue({
              "CLname": clientNameValue,
              "gst_username": ClientPasswordData.username,
              "password": ClientPasswordData.name,
              "anPassword": ClientPasswordData.password,
              "note": ClientPasswordData.notes
            });
          }
    }
    // const response = {
    //     data: {
    //         data:""
    //     },
    // };


    const handleEditPassword = async (value, e) => {
        setLoading(true);
        // if (state.button === 2) {
        //   console.log("state.button === 2 working");
        //   // navigate('/app/client/company');
        // }         
        let ApiData = {
            "id": dataID,
            //   "CLname": value.company,
            //   "gst_username": value.username,
            //   "password": value.name,
            //   "anPassword": value.password,
            "company": value.CLname,
            "gstun": value.gst_username,
            "gstpass": value.password,
            "anotherpass": value.anPassword,
            "note": value.note,
            "save": "save",
            // date: value["date"].format("DD-MM-YYYY"), //Add your required date format here
            // date: value["date"].format("YYYY-MM-DD HH:mm:ss")  //Add your required date format here
        };
        // console.log(ApiData);

        let response = await ApiSnippets("/edit_client_password", ApiData);

        let countObj = await response;

        console.log(countObj);
        // setApiStatus(countObj.status)
        if (countObj.status === true) {
            successMsg(countObj.message)
            setTimeout(() => {
                form.resetFields();
            }, 500);

            navigate('/app/client/password');

        } else {
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
                    name: data[index].name,
                });
                // console.log()
            }
            setCompanyData(company)
            // console.log(myObj[0].id);
            // console.log(company);
        };

        getAllData();

    }, []);


    useEffect(() => {
        getClientById();
    }, [])



    return (
        <>
            <Form layout="vertical" form={form} onFinish={handleEditPassword}>
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
                        <Card title="Add New Password" style={{ marginTop: 20 }}>
                            <div className="">
                                <Spin spinning={loading}>
                                    <Row gutter={12} justify="start">
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item
                                                name="CLname"
                                                label="Client Name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please Select Client!",
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    // value={response.data.data}
                                                    showSearch
                                                    style={{ width: "100%" }}
                                                    placeholder="Select a Client"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) =>
                                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    {companyData.map((item, index) => (
                                                        <Option key={index} value={item.id}>
                                                            {item.name}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item
                                                name="gst_username"
                                                label="GST User Name"
                                                rules={[

                                                    {
                                                        required: true,
                                                        message: "Please enter Username!",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Enter User Name" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <div style={{ marginBottom: 16 }}>
                                                <Form.Item
                                                    name="password"
                                                    label="Password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your password!',
                                                        },
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input.Password />
                                                </Form.Item>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item
                                                name="anPassword"
                                                label="Another Password"
                                                // dependencies={['password']}
                                                hasFeedback
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter another password!',
                                                    }
                                                ]}
                                            >
                                                <Input.Password />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Form.Item
                                                name="note"
                                                label="Note"
                                            >
                                                <Input placeholder="Enter Note" />
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

            </Form>
        </>
    );
};

export default AddClientForm;
