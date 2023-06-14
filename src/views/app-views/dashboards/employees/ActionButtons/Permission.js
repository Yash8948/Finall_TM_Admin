import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import {
  GlobalOutlined,
  MailOutlined,
  HomeOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import {
  Form,
  Button,
  message,
  Row,
  Col,
  Card,
  Spin,
  Select,
  Input,
  Checkbox,
  Divider,
} from "antd";
import ApiSnippets from "constants/ApiSnippet";
import dayjs from "dayjs";
import Flex from "components/shared-components/Flex";
import Icon from "components/util-components/Icon";

const Permission = () => {
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
  const [card_employee, setCard_employee] = useState(null);
  const [card_client, setCard_client] = useState(null);
  const [card_setting, setCard_setting] = useState(null);
  const [card_payment_method, setCard_payment_method] = useState(null);
  const [card_expenses, setCard_expenses] = useState(null);
  const [card_config_sms, setCard_config_sms] = useState(null);
  const [card_config_notification, setCard_config_notification] = useState(null);
  const [card_company, setCard_company] = useState(null);
  const [card_company_group, setCard_company_group] = useState(null);
  const [card_client_manual_payment, setCard_client_manual_payment] = useState(null);
  const [card_department, setCard_department] = useState(null);
  const [card_task, setCard_task] = useState(null);
  const [card_notification, setCard_notification] = useState(null);
  const [card_file_manager, setCard_file_manager] = useState(null);
  const [card_manage_location, setCard_manage_location] = useState(null);
  const [card_manage_receipt, setCard_manage_receipt] = useState(null);
  const [card_invoice, setCard_invoice] = useState(null);
  const [card_custom_invoice, setCard_custom_invoice] = useState(null);
  const [card_vault_manager, setCard_vault_manager] = useState(null);
  const [card_activity_log, setCard_activity_log] = useState(null);
  const [card_client_password, setCard_client_password] = useState(null);
  const [card_appointment, setCard_appointment] = useState(null);
  const [card_employee_leave, setCard_employee_leave] = useState(null);
  const [card_admin_leave, setCard_admin_leave] = useState(null);
  const [card_holiday, setCard_holiday] = useState(null);
  const [card_client_login, setCard_client_login] = useState(null);
  const [card_employee_login, setCard_employee_login] = useState(null);
  const [card_reports, setCard_reports] = useState(null);
  const [card_performance_reports, setCard_performance_reports] = useState(null);
  const [card_due, setCard_due] = useState(null);
  const [card_attendence_log, setCard_attendence_log] = useState(null);
  const [card_attendence_report, setCard_attendence_report] = useState(null);
  const [card_gst, setCard_gst] = useState(null);

  const { Option } = Select;

  const successMsg = (msg) => {
    messageApi.success(msg);
  };
  const errorMsg = (msg) => {
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
  const Manage_employee = (e) => {
    // 0 = false // 1 = true
    // console.log(`checked = ${e.target.checked}`);
    // setSend_email(e.target.checked === true ? 1 : 0);
    setCard_employee(e.target.checked === true ? true : false);
  };
  const Manage_client = (e) => {
    setCard_client(e.target.checked === true ? true : false);
  };
  const Manage_setting = (e) => {
    setCard_setting(e.target.checked === true ? true : false);
  };
  const Manage_payment_method = (e) => {
    setCard_payment_method(e.target.checked === true ? true : false);
  };
  const Manage_expenses = (e) => {
    setCard_expenses(e.target.checked === true ? true : false);
  };
  const Manage_config_sms = (e) => {
    setCard_config_sms(e.target.checked === true ? true : false);
  };
  const Manage_config_notification = (e) => {
    setCard_config_notification(e.target.checked === true ? true : false);
  };
  const Manage_company = (e) => {
    setCard_company(e.target.checked === true ? true : false);
  };
  const Manage_company_group = (e) => {
    setCard_company_group(e.target.checked === true ? true : false);
  };
  const Manage_client_manual_payment = (e) => {
    setCard_client_manual_payment(e.target.checked === true ? true : false);
  };
  const Manage_department = (e) => {
    setCard_department(e.target.checked === true ? true : false);
  };
  const Manage_task = (e) => {
    setCard_task(e.target.checked === true ? true : false);
  };
  const Manage_notification = (e) => {
    setCard_notification(e.target.checked === true ? true : false);
  };
  const Manage_file_manger = (e) => {
    setCard_file_manager(e.target.checked === true ? true : false);
  };
  const Manage_location = (e) => {
    setCard_manage_location(e.target.checked === true ? true : false);
  };
  const Manage_receipt = (e) => {
    setCard_manage_receipt(e.target.checked === true ? true : false);
  };
  const Manage_invoice = (e) => {
    setCard_invoice(e.target.checked === true ? true : false);
  };
  const Manage_custom_invoice = (e) => {
    setCard_custom_invoice(e.target.checked === true ? true : false);
  };
  const Manage_vault_manager = (e) => {
    setCard_vault_manager(e.target.checked === true ? true : false);
  };
  const Manage_activity_log = (e) => {
    setCard_activity_log(e.target.checked === true ? true : false);
  };
  const Manage_client_password = (e) => {
    setCard_client_password(e.target.checked === true ? true : false);
  };
  const Manage_appointment = (e) => {
    setCard_appointment(e.target.checked === true ? true : false);
  };
  const Manage_employee_leave = (e) => {
    setCard_employee_leave(e.target.checked === true ? true : false);
  };
  const Manage_admin_leave = (e) => {
    setCard_admin_leave(e.target.checked === true ? true : false);
  };
  const Manage_holiday = (e) => {
    setCard_holiday(e.target.checked === true ? true : false);
  };
  const Manage_client_login = (e) => {
    setCard_client_login(e.target.checked === true ? true : false);
  };
  const Manage_employee_login = (e) => {
    setCard_employee_login(e.target.checked === true ? true : false);
  };
  const Manage_reports = (e) => {
    setCard_reports(e.target.checked === true ? true : false);
  };
  const Manage_performance_reports = (e) => {
    setCard_performance_reports(e.target.checked === true ? true : false);
  };
  const Manage_due = (e) => {
    setCard_due(e.target.checked === true ? true : false);
  };
  const Manage_attendence_log = (e) => {
    setCard_attendence_log(e.target.checked === true ? true : false);
  };
  const Manage_attendence_report = (e) => {
    setCard_attendence_report(e.target.checked === true ? true : false);
  };
  const Manage_gst = (e) => {
    setCard_gst(e.target.checked === true ? true : false);
  };








  console.log(dataID);
  const handleAddNewPassword = async (value, e) => {
    console.log(value);
    setLoading(true);

    let ApiData = {
      id: dataID,
      pass: value.confirmPass,
      sendemail: send_email,
      sendsms: send_txt_msg,
    };
    console.log(ApiData);

    let response = await await ApiSnippets("/EmployeeResetPassword", ApiData);

    if (response.status === true) {
      successMsg(response.message);
      setTimeout(() => {
        form.resetFields();
        navigate("/app/dashboards/employees");
      }, 500);
    } else {
      errorMsg(response.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    var company = [];
    const getAllData = async () => {
      let response = await ApiSnippets("/Company", null);
      let data = response.data;
      let clientName = data.map(
        (item) => item.name,
        (item) => item.id
      );
      setClientName(clientName);
      // console.log(data[0].id)
      for (let index = 0; index < data.length; index++) {
        company.push({
          id: data[index].id,
          name: data[index].name,
        });
      }
      setCompanyData(company);
      // console.log(myObj[0].id);
      // console.log(company);
    };

    getAllData();
  }, []);
  return (
    <>
      <Form layout="vertical" form={form} onFinish={handleAddNewPassword}>
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
            <Card title="Permission" style={{ marginTop: 20 }}>
              <div className="">
                <Spin spinning={loading}>
                  <Row gutter={16} justify="start">
                    {/* =================================================== CARD 1 ================================================== */}

                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto",alignItems: "center" }}>
                        <Form.Item name="EMPLOYEE" label="" rules={[]} style={{  }}>
                          <Checkbox name="EMPLOYEE" value="" onChange={Manage_employee}>Employee</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_employee === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EMPLOYEE_ADD" label="" rules={[]}>
                                  <Checkbox name="EMPLOYEE_ADD" value="" onChange="">Add</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EMPLOYEE_EDIT" label="" rules={[]}>
                                  <Checkbox name="EMPLOYEE_EDIT" value="" onChange="">Edit</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EMPLOYEE_VIEW" label="" rules={[]}>
                                  <Checkbox name="EMPLOYEE_VIEW" value="" onChange="">View</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EMPLOYEE_DELETE" label="" rules={[]}>
                                  <Checkbox name="EMPLOYEE_DELETE" value="" onChange="">Delete</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EMPLOYEE_CHANGE_PASS" label="" rules={[]}>
                                  <Checkbox name="EMPLOYEE_CHANGE_PASS" value="" onChange="">Change Pass</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EMPLOYEE_PERMISSION" label="" rules={[]}>
                                  <Checkbox name="EMPLOYEE_PERMISSION" value="" onChange=""> Permission </Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EMPLOYEE_CHAT" label="" rules={[]} >
                                  <Checkbox name="EMPLOYEE_CHAT" value="" onChange="">Chat</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>

                    {/* =================================================== CARD 2 ================================================== */}
                    
                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="CLIENT" label="" rules={[]} style={{ alignItems: "center" }}>
                          <Checkbox name="CLIENT" value="" onChange={Manage_client}>Client</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_client === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="CLIENT_ADD" label="" rules={[]}>
                                  <Checkbox name="CLIENT_ADD" value="" onChange="">Add</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="CLIENT_EDIT" label="" rules={[]}>
                                  <Checkbox name="CLIENT_EDIT" value="" onChange="">Edit</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="CLIENT_VIEW" label="" rules={[]}>
                                  <Checkbox name="CLIENT_VIEW" value="" onChange="">View</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="CLIENT_DELETE" label="" rules={[]}>
                                  <Checkbox name="CLIENT_DELETE" value="" onChange="">Delete</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="CLIENT_CHANGE_PASS" label="" rules={[]}>
                                  <Checkbox name="CLIENT_CHANGE_PASS" value="" onChange="">Change Pass</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="CLIENT_PERMISSION" label="" rules={[]}>
                                  <Checkbox name="CLIENT_PERMISSION" value="" onChange=""> Permission </Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="CLIENT_CHAT" label="" rules={[]} >
                                  <Checkbox name="CLIENT_CHAT" value="" onChange="">Chat</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 3 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      {/* <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                      </Row> */}
                        {/* <Form.Item name="EXPENCES" label="" rules={[]} style={{ alignItems: "center" }}>
                          <Checkbox name="EXPENCES" value="" onChange={Manage_expenses}>Expences</Checkbox>
                        </Form.Item> */}
                        <Divider orientation="left" type="horizontal" orientationMargin="0" style={{ margin:0 }}>
                        <Form.Item name="SETTING" label="" rules={[]} style={{ alignItems: "center" }}>
                          <Checkbox name="SETTING" value="" onChange={Manage_setting}>Setting</Checkbox>
                        </Form.Item>
                        </Divider>
                        {card_setting === true && (
                          <>
                          <Card>
                          <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="PAYMENT_METHOD" label="" rules={[]}>
                                  <Checkbox name="PAYMENT_METHOD" value="" onChange={Manage_payment_method}>Payment Method</Checkbox>
                              </Form.Item>
                            </Col>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {
                            card_payment_method && true && (
                              <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="PAYMENT_METHOD_ADD" label="" rules={[]}>
                                  <Checkbox name="PAYMENT_METHOD_ADD" value="" onChange="">Add</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="PAYMENT_METHOD_EDIT" label="" rules={[]}>
                                  <Checkbox name="PAYMENT_METHOD_EDIT" value="" onChange="">Edit</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="PAYMENT_METHOD_DELETE" label="" rules={[]}>
                                  <Checkbox name="PAYMENT_METHOD_DELETE" value="" onChange="">Delete</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                            )
                          }
                          </Row>
                          </Card>
                          {/* Exxpences================================================================ */}
                          <Card>
                            <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="EXPENCES" label="" rules={[]}>
                                    <Checkbox name="EXPENCES" value="" onChange={Manage_expenses}>Expences</Checkbox>
                                </Form.Item>
                              </Col>
                              <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                              {
                            card_expenses && true && (
                              <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EXPENCES_ADD" label="" rules={[]}>
                                  <Checkbox name="EXPENCES_ADD" value="" onChange="">Add</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EXPENCES_EDIT" label="" rules={[]}>
                                  <Checkbox name="EXPENCES_EDIT" value="" onChange="">Edit</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EXPENCES_DELETE" label="" rules={[]}>
                                  <Checkbox name="EXPENCES_DELETE" value="" onChange="">Delete</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                            )
                          }
                            </Row>
                          </Card>
                            {/* config SMS============================================================ */}
                          <Card>
                            <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="CONFIG_SMS" label="" rules={[]}>
                                    <Checkbox name="CONFIG_SMS" value="" onChange={Manage_config_sms} >Config SMS</Checkbox>
                                </Form.Item>
                              </Col>
                              <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                              {
                                card_config_sms && true && (
                                <>
                                  <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                    <Form.Item name="CONFIG_SMS_EDIT" label="" rules={[]}>
                                        <Checkbox name="CONFIG_SMS_EDIT" value="" onChange="">Edit</Checkbox>
                                    </Form.Item>
                                  </Col>
                                  <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                    <Form.Item name="CONFIG_SMS_STATUS" label="" rules={[]}>
                                        <Checkbox name="CONFIG_SMS_STATUS" value="" onChange="">Status</Checkbox>
                                    </Form.Item>
                                  </Col>
                                </>
                              )
                            }
                            </Row>
                          </Card>
                          <Card>
                          <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="CONFIG_NOTIFICATION" label="" rules={[]}>
                                  <Checkbox name="CONFIG_NOTIFICATION" value="" onChange={Manage_config_notification}>Config Notification</Checkbox>
                              </Form.Item>
                            </Col>
                            <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                            {
                                card_config_notification && true && (
                                <>
                                  <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                    <Form.Item name="CONFIG_NOTIFICATION_EDIT" label="" rules={[]}>
                                        <Checkbox name="CONFIG_NOTIFICATION_EDIT" value="" onChange="">Edit</Checkbox>
                                    </Form.Item>
                                  </Col>
                                  <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                    <Form.Item name="CONFIG_NOTIFICATION_STATUS" label="" rules={[]}>
                                        <Checkbox name="CONFIG_NOTIFICATION_STATUS" value="" onChange="">Status</Checkbox>
                                    </Form.Item>
                                  </Col>
                                </>
                              )
                            }
                            </Row>
                          </Card>
                          </>
                        )}
                      
                    </Card>
                    
                    {/* =================================================== CARD 4 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="COMPANY" label="" rules={[]} style={{ alignItems: "center" }}>
                          <Checkbox name="COMPANY" value="" onChange={Manage_company}>Company</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_company === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="COMPANY_ADD" label="" rules={[]}>
                                  <Checkbox name="COMPANY_ADD" value="" onChange="">Add</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="COMPANY_EDIT" label="" rules={[]}>
                                  <Checkbox name="COMPANY_EDIT" value="" onChange="">Edit</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="COMPANY_VIEW" label="" rules={[]}>
                                  <Checkbox name="COMPANY_VIEW" value="" onChange="">View</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="PAYMENT_METHOD_DELETE" label="" rules={[]}>
                                  <Checkbox name="PAYMENT_METHOD_DELETE" value="" onChange="">Delete</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 5 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="COMPANY_GROUP" label="" rules={[]} style={{ alignItems: "center" }}>
                          <Checkbox name="COMPANY_GROUP" value="" onChange={Manage_company_group}>Company Group</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_company_group === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="COMPANY_GROUP_ADD" label="" rules={[]}>
                                  <Checkbox name="COMPANY_GROUP_ADD" value="" onChange="">Add</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="COMPANY_GROUP_EDIT" label="" rules={[]}>
                                  <Checkbox name="COMPANY_GROUP_EDIT" value="" onChange="">Edit</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="COMPANY_GROUP_VIEW" label="" rules={[]}>
                                  <Checkbox name="COMPANY_GROUP_VIEW" value="" onChange="">View</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="COMPANY_GROUP_DELETE" label="" rules={[]}>
                                  <Checkbox name="COMPANY_GROUP_DELETE" value="" onChange="">Delete</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 6 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="CLIENT_MANUAL_PAYMENT" label="" rules={[]} style={{ alignItems: "center" }}>
                          <Checkbox name="CLIENT_MANUAL_PAYMENT" value="" onChange={Manage_client_manual_payment}>Client Manual Payment</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_client_manual_payment === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="CLIENT_MANUAL_PAYMENT_VIEW" label="" rules={[]}>
                                  <Checkbox name="CLIENT_MANUAL_PAYMENT_VIEW" value="" onChange="">View</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 7 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="DEPARTMENT" label="" rules={[]} style={{ alignItems: "center" }}>
                          <Checkbox name="DEPARTMENT" value="" onChange={Manage_department}>Department</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_department === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="DEPARTMENT_ADD" label="" rules={[]}>
                                  <Checkbox name="DEPARTMENT_ADD" value="" onChange="">Add</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="DEPARTMENT_EDIT" label="" rules={[]}>
                                  <Checkbox name="DEPARTMENT_EDIT" value="" onChange="">Edit</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="DEPARTMENT_VIEW" label="" rules={[]}>
                                  <Checkbox name="DEPARTMENT_VIEW" value="" onChange="">View</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="DEPARTMENT_DELETE" label="" rules={[]}>
                                  <Checkbox name="DEPARTMENT_DELETE" value="" onChange="">Delete</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 8 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="TASK" label="" rules={[]} style={{ alignItems: "center" }}>
                          <Checkbox name="TASK" value="" onChange={Manage_task}>Task</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_task === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="TASK_ADD" label="" rules={[]}>
                                  <Checkbox name="TASK_ADD" value="" onChange="">Add</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="TASK_EDIT" label="" rules={[]}>
                                  <Checkbox name="TASK_EDIT" value="" onChange="">Edit</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="TASK_VIEW" label="" rules={[]}>
                                  <Checkbox name="TASK_VIEW" value="" onChange="">View</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="TASK_DELETE" label="" rules={[]}>
                                  <Checkbox name="TASK_DELETE" value="" onChange="">Delete</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="TASK_CLOSE" label="" rules={[]}>
                                  <Checkbox name="TASK_CLOSE" value="" onChange="">Close</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 9 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="NOTIFICATION" label="" rules={[]} style={{ alignItems: "center" }}>
                          <Checkbox name="NOTIFICATION" value="" onChange={Manage_notification}>Notification</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_notification === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="NOTIFICATION_SEND_SMS" label="" rules={[]}>
                                  <Checkbox name="NOTIFICATION_SEND_SMS" value="" onChange="">Send SMS</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="NOTIFICATION_SEND_EMAIL" label="" rules={[]}>
                                  <Checkbox name="NOTIFICATION_SEND_EMAIL" value="" onChange="">Send Email</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="NOTIFICATION_SEND_DAILY" label="" rules={[]}>
                                  <Checkbox name="NOTIFICATION_SEND_DAILY" value="" onChange="">Send Daily</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 10 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="FILE_MANAGER" label="" rules={[]} style={{ alignItems: "center" }}>
                          <Checkbox name="FILE_MANAGER" value="" onChange={Manage_file_manger}>File Manager</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_file_manager === true && (
                          <>
                          <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="FILE_MANAGER_ADD" label="" rules={[]}>
                                  <Checkbox name="FILE_MANAGER_ADD" value="" onChange="">Add</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="FILE_MANAGER_EDIT" label="" rules={[]}>
                                  <Checkbox name="FILE_MANAGER_EDIT" value="" onChange="">Edit</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="FILE_MANAGER_DISPATCH" label="" rules={[]}>
                                  <Checkbox name="FILE_MANAGER_DISPATCH" value="" onChange="">Dispatch</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="FILE_MANAGER_DIPATCHED" label="" rules={[]}>
                                  <Checkbox name="FILE_MANAGER_DIPATCHED" value="" onChange="">Dipatched</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 11 ================================================== */}
                      <Card style={{ width: "100%" }}>
                        <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                          <Form.Item name="MANAGE_LOCATION" label="" rules={[]} style={{ alignItems: "center" }}>
                            <Checkbox name="MANAGE_LOCATION" value="" onChange={Manage_location}>Manage Location</Checkbox>
                          </Form.Item>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {card_manage_location === true && (
                            <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="MANAGE_LOCATION_ADD" label="" rules={[]}>
                                    <Checkbox name="MANAGE_LOCATION_ADD" value="" onChange="">Add</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="MANAGE_LOCATION_EDIT" label="" rules={[]}>
                                    <Checkbox name="MANAGE_LOCATION_EDIT" value="" onChange="">Edit</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="MANAGE_LOCATION_DELETE" label="" rules={[]}>
                                    <Checkbox name="MANAGE_LOCATION_DELETE" value="" onChange="">Delete</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="MANAGE_LOCATION_DEFAULT" label="" rules={[]}>
                                    <Checkbox name="MANAGE_LOCATION_DEFAULT" value="" onChange="">Default</Checkbox>
                                </Form.Item>
                              </Col>
                            </>
                          )}
                        </Row>
                      </Card>
                    {/* =================================================== CARD 12 ================================================== */}
                    <Card style={{ width: "100%" }}>
                        <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                          <Form.Item name="RECEIPT" label="" rules={[]} style={{ alignItems: "center" }}>
                            <Checkbox name="RECEIPT" value="" onChange={Manage_receipt}>Receipt</Checkbox>
                          </Form.Item>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {card_manage_receipt === true && (
                            <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="RECEIPT_ADD" label="" rules={[]}>
                                    <Checkbox name="RECEIPT_ADD" value="" onChange="">Add</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="RECEIPT_EDIT" label="" rules={[]}>
                                    <Checkbox name="RECEIPT_EDIT" value="" onChange="">Edit</Checkbox>
                                </Form.Item>
                              </Col>
                             </>
                          )}
                        </Row>
                      </Card>
                    {/* =================================================== CARD 13 ================================================== */}
                    <Card style={{ width: "100%" }}>
                        <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                          <Form.Item name="INVOICE" label="" rules={[]} style={{ alignItems: "center" }}>
                            <Checkbox name="INVOICE" value="" onChange={Manage_invoice}>Invoice</Checkbox>
                          </Form.Item>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {card_invoice === true && (
                            <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="INVOICE_ADD" label="" rules={[]}>
                                    <Checkbox name="INVOICE_ADD" value="" onChange="">Add</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="INVOICE_EDIT" label="" rules={[]}>
                                    <Checkbox name="INVOICE_EDIT" value="" onChange="">Edit</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="INVOICE_MESSAGE" label="" rules={[]}>
                                    <Checkbox name="INVOICE_MESSAGE" value="" onChange="">Message</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="INVOICE_VIEW" label="" rules={[]}>
                                    <Checkbox name="INVOICE_VIEW" value="" onChange="">View</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="INVOICE_PAYMENT" label="" rules={[]}>
                                    <Checkbox name="INVOICE_PAYMENT" value="" onChange="">Payment</Checkbox>
                                </Form.Item>
                              </Col>
                            </>
                          )}
                        </Row>
                      </Card>
                    {/* =================================================== CARD 14 ================================================== */}
                    <Card style={{ width: "100%" }}>
                        <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                          <Form.Item name="CUSTOM_INVOICE" label="" rules={[]} style={{ alignItems: "center" }}>
                            <Checkbox name="CUSTOM_INVOICE" value="" onChange={Manage_custom_invoice}>Custom Invoice</Checkbox>
                          </Form.Item>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {card_custom_invoice === true && (
                            <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="CUSTOM_INVOICE_ADD" label="" rules={[]}>
                                    <Checkbox name="CUSTOM_INVOICE_ADD" value="" onChange="">Add</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="CUSTOM_INVOICE_EDIT" label="" rules={[]}>
                                    <Checkbox name="CUSTOM_INVOICE_EDIT" value="" onChange="">Edit</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="CUSTOM_INVOICE_DELETE" label="" rules={[]}>
                                    <Checkbox name="CUSTOM_INVOICE_DELETE" value="" onChange="">Delete</Checkbox>
                                </Form.Item>
                              </Col>
                            </>
                          )}
                        </Row>
                      </Card>
                    {/* =================================================== CARD 15 ================================================== */}
                    <Card style={{ width: "100%" }}>
                        <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                          <Form.Item name="VAULT_MANAGER" label="" rules={[]} style={{ alignItems: "center" }}>
                            <Checkbox name="VAULT_MANAGER" value="" onChange={Manage_vault_manager}>Vault Manager</Checkbox>
                          </Form.Item>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {card_vault_manager === true && (
                            <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="VAULT_MANAGER_ADD" label="" rules={[]}>
                                    <Checkbox name="VAULT_MANAGER_ADD" value="" onChange="">Add</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="VAULT_MANAGER_EDIT" label="" rules={[]}>
                                    <Checkbox name="VAULT_MANAGER_EDIT" value="" onChange="">Edit</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="VAULT_MANAGER_DELETE" label="" rules={[]}>
                                    <Checkbox name="VAULT_MANAGER_DELETE" value="" onChange="">Delete</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="VAULT_MANAGER_SHOW_PASSWORD" label="" rules={[]}>
                                    <Checkbox name="VAULT_MANAGER_SHOW_PASSWORD" value="" onChange="">Show Password</Checkbox>
                                </Form.Item>
                              </Col>
                            </>
                          )}
                        </Row>
                      </Card>
                    {/* =================================================== CARD 16 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="ACTIVITY_LOG" label="" rules={[]} style={{ alignItems: "center" }}>
                          <Checkbox name="ACTIVITY_LOG" value="" onChange={Manage_activity_log}>Activity Log</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_activity_log === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="ACTIVITY_LOG_VIEW" label="" rules={[]}>
                                  <Checkbox name="ACTIVITY_LOG_VIEW" value="" onChange="">View</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 17 ================================================== */}
                    <Card style={{ width: "100%" }}>
                        <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                          <Form.Item name="CLIENT_PASSWORD" label="" rules={[]} style={{ alignItems: "center" }}>
                            <Checkbox name="CLIENT_PASSWORD" value="" onChange={Manage_client_password}>Client Password</Checkbox>
                          </Form.Item>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {card_client_password === true && (
                            <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="CLIENT_PASSWORD_ADD" label="" rules={[]}>
                                    <Checkbox name="CLIENT_PASSWORD_ADD" value="" onChange="">Add</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="CLIENT_PASSWORD_EDIT" label="" rules={[]}>
                                    <Checkbox name="CLIENT_PASSWORD_EDIT" value="" onChange="">Edit</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="CLIENT_PASSWORD_DELETE" label="" rules={[]}>
                                    <Checkbox name="CLIENT_PASSWORD_DELETE" value="" onChange="">Delete</Checkbox>
                                </Form.Item>
                              </Col>
                            </>
                          )}
                        </Row>
                      </Card>
                    {/* =================================================== CARD 18 ================================================== */}
                    <Card style={{ width: "100%" }}>
                        <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                          <Form.Item name="APPOINTMENT" label="" rules={[]} style={{ alignItems: "center" }}>
                            <Checkbox name="APPOINTMENT" value="" onChange={Manage_appointment}>Appointment</Checkbox>
                          </Form.Item>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {card_appointment === true && (
                            <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="APPOINTMENT_ADD" label="" rules={[]}>
                                    <Checkbox name="APPOINTMENT_ADD" value="" onChange="">Add</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="APPOINTMENT_EDIT" label="" rules={[]}>
                                    <Checkbox name="APPOINTMENT_EDIT" value="" onChange="">Edit</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="APPOINTMENT_ACCEPT_REJECT" label="" rules={[]}>
                                    <Checkbox name="APPOINTMENT_ACCEPT_REJECT" value="" onChange="" style={{textWrap: "nowrap"}}>Accept & Reject</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="APPOINTMENT_DELETE" label="" rules={[]}>
                                    <Checkbox name="APPOINTMENT_DELETE" value="" onChange="">Delete</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="APPOINTMENT_CHAT" label="" rules={[]}>
                                    <Checkbox name="APPOINTMENT_CHAT" value="" onChange="">Chat</Checkbox>
                                </Form.Item>
                              </Col>
                            </>
                          )}
                        </Row>
                      </Card>
                    {/* =================================================== CARD 19 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="EMPLOYEE_LEAVE" label="" rules={[]} style={{ alignItems: "center" }}>
                          <Checkbox name="EMPLOYEE_LEAVE" value="" onChange={Manage_employee_leave}>Employee Leave</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_employee_leave === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EMPLOYEE_LEAVE_VIEW" label="" rules={[]}>
                                  <Checkbox name="EMPLOYEE_LEAVE_VIEW" value="" onChange="">View</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 20 ================================================== */}
                    <Card style={{ width: "100%" }}>
                        <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                          <Form.Item name="ADMIN_LEAVE" label="" rules={[]} style={{ alignItems: "center" }}>
                            <Checkbox name="ADMIN_LEAVE" value="" onChange={Manage_admin_leave}>Admin Leave</Checkbox>
                          </Form.Item>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {card_admin_leave === true && (
                            <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="ADMIN_LEAVE_ADD" label="" rules={[]}>
                                    <Checkbox name="ADMIN_LEAVE_ADD" value="" onChange="">Add</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="ADMIN_LEAVE_EDIT" label="" rules={[]}>
                                    <Checkbox name="ADMIN_LEAVE_EDIT" value="" onChange="">Edit</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="ADMIN_LEAVE_DELETE" label="" rules={[]}>
                                    <Checkbox name="ADMIN_LEAVE_DELETE" value="" onChange="">Delete</Checkbox>
                                </Form.Item>
                              </Col>
                            </>
                          )}
                        </Row>
                      </Card>
                    {/* =================================================== CARD 21 ================================================== */}
                    <Card style={{ width: "100%" }}>
                        <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                          <Form.Item name="HOLIDAY" label="" rules={[]} style={{ alignItems: "center" }}>
                            <Checkbox name="HOLIDAY" value="" onChange={Manage_holiday}>Holiday</Checkbox>
                          </Form.Item>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {card_holiday === true && (
                            <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="HOLIDAY_ADD" label="" rules={[]}>
                                    <Checkbox name="HOLIDAY_ADD" value="" onChange="">Add</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="HOLIDAY_EDIT" label="" rules={[]}>
                                    <Checkbox name="HOLIDAY_EDIT" value="" onChange="">Edit</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="HOLIDAY_DELETE" label="" rules={[]}>
                                    <Checkbox name="HOLIDAY_DELETE" value="" onChange="">Delete</Checkbox>
                                </Form.Item>
                              </Col>
                            </>
                          )}
                        </Row>
                      </Card>
                    {/* =================================================== CARD 22 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="CLIENT_LOGIN" label="" rules={[]} style={{ alignItems: "center" }}>
                          <Checkbox name="CLIENT_LOGIN" value="" onChange={Manage_client_login}>Client Login</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_client_login === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="CLIENT_LOGIN_VIEW" label="" rules={[]}>
                                  <Checkbox name="CLIENT_LOGIN_VIEW" value="" onChange="">View</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 23 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      <Row gutter={8} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="EMPLOYEE_LOGIN" label="" rules={[]} style={{ alignItems: "center" }}>
                          <Checkbox name="EMPLOYEE_LOGIN" value="" onChange={Manage_employee_login}>Employee Login</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_employee_login === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EMPLOYEE_LOGIN_VIEW" label="" rules={[]}>
                                  <Checkbox name="EMPLOYEE_LOGIN_VIEW" value="" onChange="">View</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 24 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      {/* <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                      </Row> */}
                        {/* <Form.Item name="EXPENCES" label="" rules={[]} style={{ alignItems: "center" }}>
                          <Checkbox name="EXPENCES" value="" onChange={Manage_expenses}>Expences</Checkbox>
                        </Form.Item> */}
                        <Divider orientation="left" type="horizontal" orientationMargin="0" style={{ margin:0 }}>
                        <Form.Item name="REPORTS" label="" rules={[]} style={{ alignItems: "center" }}>
                          <Checkbox name="REPORTS" value="" onChange={Manage_reports}>Reports</Checkbox>
                        </Form.Item>
                        </Divider>
                        {card_reports === true && (
                          <>
                          <Card>
                          <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="PERFORMANCE_REPORT" label="" rules={[]}>
                                  <Checkbox name="PERFORMANCE_REPORT" value="" onChange={Manage_performance_reports}>Performance Report</Checkbox>
                              </Form.Item>
                            </Col>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {
                            card_performance_reports && true && (
                              <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="PERFORMANCE_REPORT_VIEW" label="" rules={[]}>
                                  <Checkbox name="PERFORMANCE_REPORT_VIEW" value="" onChange="">View</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                            )
                          }
                          </Row>
                          </Card>
                          {/* Exxpences================================================================ */}
                          <Card>
                            <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="DUE_REPORTS" label="" rules={[]}>
                                    <Checkbox name="DUE_REPORTS" value="" onChange={Manage_due}>Due</Checkbox>
                                </Form.Item>
                              </Col>
                              <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                              {
                                card_due && true && (
                              <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="DUE_REPORTS_VIEW" label="" rules={[]}>
                                  <Checkbox name="DUE_REPORTS_VIEW" value="" onChange="">View</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                            )
                          }
                            </Row>
                          </Card>
                            {/* config SMS============================================================ */}
                          <Card>
                            <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="ATTENDENCE_LOG" label="" rules={[]}>
                                    <Checkbox name="ATTENDENCE_LOG" value="" onChange={Manage_attendence_log} >Attendence Log</Checkbox>
                                </Form.Item>
                              </Col>
                              <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                              {
                                card_attendence_log && true && (
                                <>
                                  <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                    <Form.Item name="ATTENDENCE_LOG_ADD" label="" rules={[]}>
                                        <Checkbox name="ATTENDENCE_LOG_ADD" value="" onChange="">Add</Checkbox>
                                    </Form.Item>
                                  </Col>
                                  <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                    <Form.Item name="ATTENDENCE_LOG_EDIT" label="" rules={[]}>
                                        <Checkbox name="ATTENDENCE_LOG_EDIT" value="" onChange="">Edit</Checkbox>
                                    </Form.Item>
                                  </Col>
                                  <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                    <Form.Item name="ATTENDENCE_LOG_DELETE" label="" rules={[]}>
                                        <Checkbox name="ATTENDENCE_LOG_DELETE" value="" onChange="">Delete</Checkbox>
                                    </Form.Item>
                                  </Col>
                                </>
                              )
                            }
                            </Row>
                          </Card>
                          {/* ATTENDENCE_REPORT====================================================== */}
                          <Card>
                          <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="ATTENDENCE_REPORT" label="" rules={[]}>
                                  <Checkbox name="ATTENDENCE_REPORT" value="" onChange={Manage_attendence_report}>Attendence Report</Checkbox>
                              </Form.Item>
                            </Col>
                            <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                            {
                              card_attendence_report && true && (
                                <>
                                  <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                    <Form.Item name="ATTENDENCE_REPORT_VIEW" label="" rules={[]}>
                                        <Checkbox name="ATTENDENCE_REPORT_VIEW" value="" onChange="">View</Checkbox>
                                    </Form.Item>
                                  </Col>
                                </>
                              )
                            }
                            </Row>
                          </Card>
                          {/* GST_REPORT====================================================== */}
                          <Card>
                          <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="GST_REPORT" label="" rules={[]}>
                                  <Checkbox name="GST_REPORT" checked={false} onChange={Manage_gst}>GST Report</Checkbox>
                              </Form.Item>
                            </Col>
                            <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                            {
                              card_gst && true && (
                                <>
                                  <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                    <Form.Item name="GST_REPORT_VIEW" label="" rules={[]}>
                                        <Checkbox name="GST_REPORT_VIEW" value="" onChange="">View</Checkbox>
                                    </Form.Item>
                                  </Col>
                                </>
                              )
                            }
                            </Row>
                          </Card>
                          </>
                        )}
                    </Card>
                    {/* =================================================== CARD 25 ================================================== */}
                    
                
                    <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                      <Form.Item>
                        {contextHolder}
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="w-100"
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                      <Form.Item>
                        {contextHolder}
                        <Button
                          danger
                          type="primary"
                          className="w-100"
                          style={{ boxShadow: "none" }}
                        >
                          Cancel
                        </Button>
                      </Form.Item>
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

export default Permission;
