import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { GlobalOutlined, MailOutlined, HomeOutlined, PhoneOutlined,} from "@ant-design/icons";
import { Form, Button, message, Row, Col, Card, Spin, Select, Input, Checkbox, Divider,} from "antd";
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

  const [permissions, setPermissions] = useState(null)

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
    // console.log(e.target.checked);

    form.setFieldsValue({
      EMPLOYEE_ADD: e.target.checked === false && false,
      EMPLOYEE_EDIT:e.target.checked === false && false,
      EMPLOYEE_VIEW:e.target.checked === false && false,
      EMPLOYEE_DELETE:e.target.checked === false && false,
      EMPLOYEE_CHANGE_PASS:e.target.checked === false && false,
      EMPLOYEE_PERMISSION:e.target.checked === false && false,
      EMPLOYEE_CHAT:e.target.checked === false && false,
    });
  };
  const Manage_client = (e) => {
    setCard_client(e.target.checked === true ? true : false);
    form.setFieldsValue({
       CLIENT_ADD:e.target.checked === false && false,
       CLIENT_EDIT:e.target.checked === false && false,
       CLIENT_VIEW:e.target.checked === false && false,
       CLIENT_DELETE:e.target.checked === false && false,
       CLIENT_CHANGE_PASS:e.target.checked === false && false,
       CLIENT_PERMISSION:e.target.checked === false && false,
       CLIENT_CHAT:e.target.checked === false && false,
     });
  };
  const Manage_setting = (e) => {
    setCard_setting(e.target.checked === true ? true : false);

    form.setFieldsValue({
        //PAYMENT_METHOD
        PAYMENT_METHOD:e.target.checked === false && false,
        PAYMENT_METHOD_ADD:e.target.checked === false && false,
        PAYMENT_METHOD_EDIT:e.target.checked === false && false,
        PAYMENT_METHOD_DELETE:e.target.checked === false && false,

        //EXPENCES
        EXPENCES:e.target.checked === false && false,
        EXPENCES_ADD:e.target.checked === false && false,
        EXPENCES_EDIT:e.target.checked === false && false,
        EXPENCES_DELETE:e.target.checked === false && false,
        
        //CONFIG_SMS
        CONFIG_SMS:e.target.checked === false && false,
        CONFIG_SMS_EDIT:e.target.checked === false && false,
        CONFIG_SMS_STATUS:e.target.checked === false && false,
        
        //CONFIG_NOTIFICATION
        CONFIG_NOTIFICATION:e.target.checked === false && false,
        CONFIG_NOTIFICATION_EDIT:e.target.checked === false && false,
        CONFIG_NOTIFICATION_STATUS:e.target.checked === false && false,
  
      });





  };
  const Manage_payment_method = (e) => {
    setCard_payment_method(e.target.checked === true ? true : false);

    form.setFieldsValue({
      PAYMENT_METHOD_ADD:e.target.checked === false && false,
      PAYMENT_METHOD_EDIT:e.target.checked === false && false,
      PAYMENT_METHOD_DELETE:e.target.checked === false && false,
    })



  };
  const Manage_expenses = (e) => {
    setCard_expenses(e.target.checked === true ? true : false);

    form.setFieldsValue({
      EXPENCES_ADD:e.target.checked === false && false,
        EXPENCES_EDIT:e.target.checked === false && false,
        EXPENCES_DELETE:e.target.checked === false && false,
        
    })

  };
  const Manage_config_sms = (e) => {
    setCard_config_sms(e.target.checked === true ? true : false);

    form.setFieldsValue({
      CONFIG_SMS_EDIT:e.target.checked === false && false,
      CONFIG_SMS_STATUS:e.target.checked === false && false,
        
    })


  };
  const Manage_config_notification = (e) => {
    setCard_config_notification(e.target.checked === true ? true : false);

    form.setFieldsValue({
      CONFIG_NOTIFICATION_EDIT:e.target.checked === false && false,
      CONFIG_NOTIFICATION_STATUS:e.target.checked === false && false,
    })

  };
  const Manage_company = (e) => {
    setCard_company(e.target.checked === true ? true : false);
    form.setFieldsValue({
      COMPANY_ADD:e.target.checked === false && false,
      COMPANY_EDIT:e.target.checked === false && false,
      COMPANY_VIEW:e.target.checked === false && false,
      COMPANY_DELETE:e.target.checked === false && false,
    })

  };
  const Manage_company_group = (e) => {
    setCard_company_group(e.target.checked === true ? true : false);
    form.setFieldsValue({
      COMPANY_GROUP_ADD:e.target.checked === false && false,
      COMPANY_GROUP_EDIT:e.target.checked === false && false,
      COMPANY_GROUP_VIEW:e.target.checked === false && false,
      COMPANY_GROUP_DELETE:e.target.checked === false && false,
      
    })
  };
  const Manage_client_manual_payment = (e) => {
    setCard_client_manual_payment(e.target.checked === true ? true : false);
    form.setFieldsValue({
      CLIENT_MANUAL_PAYMENT_VIEW:e.target.checked === false && false,
    })
  };
  const Manage_department = (e) => {
    setCard_department(e.target.checked === true ? true : false);
    form.setFieldsValue({
      DEPARTMENT_ADD:e.target.checked === false && false,
      DEPARTMENT_EDIT:e.target.checked === false && false,
      DEPARTMENT_VIEW:e.target.checked === false && false,
      DEPARTMENT_DELETE:e.target.checked === false && false,
    })
  };
  const Manage_task = (e) => {
    setCard_task(e.target.checked === true ? true : false);
    form.setFieldsValue({
      TASK_ADD:e.target.checked === false && false,
      TASK_EDIT:e.target.checked === false && false,
      TASK_VIEW:e.target.checked === false && false,
      TASK_DELETE:e.target.checked === false && false,
      TASK_CLOSE:e.target.checked === false && false,
    })
  };
  const Manage_notification = (e) => {
    setCard_notification(e.target.checked === true ? true : false);
    form.setFieldsValue({
      NOTIFICATION_SEND_SMS:e.target.checked === false && false,
      NOTIFICATION_SEND_EMAIL:e.target.checked === false && false,
      NOTIFICATION_SEND_DAILY:e.target.checked === false && false,
    })
  };
  const Manage_file_manger = (e) => {
    setCard_file_manager(e.target.checked === true ? true : false);
    form.setFieldsValue({
      FILE_MANAGER_ADD:e.target.checked === false && false,
      FILE_MANAGER_EDIT:e.target.checked === false && false,
      FILE_MANAGER_DISPATCH:e.target.checked === false && false,
      FILE_MANAGER_DIPATCHED:e.target.checked === false && false,
    })
  };
  const Manage_location = (e) => {
    setCard_manage_location(e.target.checked === true ? true : false);
    form.setFieldsValue({
      MANAGE_LOCATION_ADD:e.target.checked === false && false,
      MANAGE_LOCATION_EDIT:e.target.checked === false && false,
      MANAGE_LOCATION_VIEW:e.target.checked === false && false,
      MANAGE_LOCATION_DELETE:e.target.checked === false && false,
      MANAGE_LOCATION_DEFAULT:e.target.checked === false && false,
    })
    

  };
  const Manage_receipt = (e) => {
    setCard_manage_receipt(e.target.checked === true ? true : false);
    form.setFieldsValue({
      RECEIPT_ADD:e.target.checked === false && false,
      RECEIPT_EDIT:e.target.checked === false && false,
    })

  };
  const Manage_invoice = (e) => {
    setCard_invoice(e.target.checked === true ? true : false);
    form.setFieldsValue({
      INVOICE_ADD:e.target.checked === false && false,
      INVOICE_EDIT:e.target.checked === false && false,
      INVOICE_VIEW:e.target.checked === false && false,
      INVOICE_MESSAGE:e.target.checked === false && false,
      INVOICE_PAYMENT:e.target.checked === false && false,
    })
  };
  const Manage_custom_invoice = (e) => {
    setCard_custom_invoice(e.target.checked === true ? true : false);
    form.setFieldsValue({
      CUSTOM_INVOICE_ADD:e.target.checked === false && false,
      CUSTOM_INVOICE_EDIT:e.target.checked === false && false,
      CUSTOM_INVOICE_DELETE:e.target.checked === false && false,
    })
  };
  const Manage_vault_manager = (e) => {
    setCard_vault_manager(e.target.checked === true ? true : false);
    form.setFieldsValue({
      VAULT_MANAGER_ADD:e.target.checked === false && false,
      VAULT_MANAGER_EDIT:e.target.checked === false && false,
      VAULT_MANAGER_DELETE:e.target.checked === false && false,
      VAULT_MANAGER_SHOW_PASSWORD:e.target.checked === false && false,
    })
  };
  const Manage_activity_log = (e) => {
    setCard_activity_log(e.target.checked === true ? true : false);
    form.setFieldsValue({
      ACTIVITY_LOG_VIEW:e.target.checked === false && false,
    })
  };
  const Manage_client_password = (e) => {
    setCard_client_password(e.target.checked === true ? true : false);
    form.setFieldsValue({
      CLIENT_PASSWORD_ADD:e.target.checked === false && false,
      CLIENT_PASSWORD_EDIT:e.target.checked === false && false,
      CLIENT_PASSWORD_DELETE:e.target.checked === false && false,
    })
  };
  const Manage_appointment = (e) => {
    setCard_appointment(e.target.checked === true ? true : false);
    form.setFieldsValue({
      APPOINTMENT_ADD:e.target.checked === false && false,
      APPOINTMENT_EDIT:e.target.checked === false && false,
      APPOINTMENT_ACCEPT_REJECT:e.target.checked === false && false,
      APPOINTMENT_DELETE:e.target.checked === false && false,
      APPOINTMENT_CHAT:e.target.checked === false && false,
    })
  };
  const Manage_employee_leave = (e) => {
    setCard_employee_leave(e.target.checked === true ? true : false);
    form.setFieldsValue({
      EMPLOYEE_LEAVE_VIEW:e.target.checked === false && false,
    })
  };
  const Manage_admin_leave = (e) => {
    setCard_admin_leave(e.target.checked === true ? true : false);
    form.setFieldsValue({
      ADMIN_LEAVE_ADD:e.target.checked === false && false,
      ADMIN_LEAVE_EDIT:e.target.checked === false && false,
      ADMIN_LEAVE_DELETE:e.target.checked === false && false,
    })
  };
  const Manage_holiday = (e) => {
    setCard_holiday(e.target.checked === true ? true : false);
    form.setFieldsValue({
      HOLIDAY_ADD:e.target.checked === false && false,
      HOLIDAY_EDIT:e.target.checked === false && false,
      HOLIDAY_DELETE:e.target.checked === false && false,
    })
  };
  const Manage_client_login = (e) => {
    setCard_client_login(e.target.checked === true ? true : false);
    form.setFieldsValue({
      CLIENT_LOGIN_VIEW:e.target.checked === false && false,
    })
  };
  const Manage_employee_login = (e) => {
    setCard_employee_login(e.target.checked === true ? true : false);
    form.setFieldsValue({
      EMPLOYEE_LOGIN_VIEW:e.target.checked === false && false,
    })
  };
  const Manage_reports = (e) => {
    setCard_reports(e.target.checked === true ? true : false);
    form.setFieldsValue({
      PERFORMANCE_REPORT:e.target.checked === false && false,
      PERFORMANCE_REPORT_VIEW:e.target.checked === false && false,

      //DUE_REPORTS
      DUE_REPORTS:e.target.checked === false && false,
      DUE_REPORTS_VIEW:e.target.checked === false && false,

      //ATTENDENCE_LOG
      ATTENDENCE_LOG:e.target.checked === false && false,
      ATTENDENCE_LOG_ADD:e.target.checked === false && false,
      ATTENDENCE_LOG_EDIT:e.target.checked === false && false,
      ATTENDENCE_LOG_DELETE:e.target.checked === false && false,
      
      //ATTENDENCE_REPORT
      ATTENDENCE_REPORT:e.target.checked === false && false,
      ATTENDENCE_REPORT_VIEW:e.target.checked === false && false,
      
      //GST_REPORT
      GST_REPORT:e.target.checked === false && false,
      GST_REPORT_VIEW:e.target.checked === false && false,

    })
  };
  const Manage_performance_reports = (e) => {
    setCard_performance_reports(e.target.checked === true ? true : false);
    form.setFieldsValue({
      PERFORMANCE_REPORT_VIEW:e.target.checked === false && false,
    })
  };
  const Manage_due = (e) => {
    setCard_due(e.target.checked === true ? true : false);
    form.setFieldsValue({
      DUE_REPORTS_VIEW:e.target.checked === false && false,
    })
  };
  const Manage_attendence_log = (e) => {
    setCard_attendence_log(e.target.checked === true ? true : false);
    form.setFieldsValue({
      ATTENDENCE_LOG_ADD:e.target.checked === false && false,
      ATTENDENCE_LOG_EDIT:e.target.checked === false && false,
      ATTENDENCE_LOG_DELETE:e.target.checked === false && false,
    })
  };
  const Manage_attendence_report = (e) => {
    setCard_attendence_report(e.target.checked === true ? true : false);
    form.setFieldsValue({
      ATTENDENCE_REPORT_VIEW:e.target.checked === false && false,
    })
  };
  const Manage_gst = (e) => {
    setCard_gst(e.target.checked === true ? true : false);
    form.setFieldsValue({
      GST_REPORT_VIEW:e.target.checked === false && false,

    })
  };



const GetUsersByID = async() => {
  let ApiData = {
    "type":1,
    id: dataID,
  };
  let response = await ApiSnippets("/GetUsers", ApiData);
  // console.log(response.data[0].permission);
  let setIt = response.data[0].permission;
  // setPermissions(setIt);
  
  setCard_client(setIt.includes('CLIENT') === true ? true : false);
  setCard_employee(setIt.includes('EMPLOYEE') === true ? true : false)
  setCard_setting(setIt.includes('SETTING') === true ? true : false)
  setCard_payment_method(setIt.includes('PAYMENT_METHOD') === true ? true : false)
  setCard_expenses(setIt.includes('EXPENCES') === true ? true : false)
  setCard_config_sms(setIt.includes('CONFIG_SMS') === true ? true : false)
  setCard_config_notification(setIt.includes('CONFIG_NOTIFICATION') === true ? true : false)
  setCard_company(setIt.includes('COMPANY') === true ? true : false)
  setCard_company_group(setIt.includes('COMPANY_GROUP') === true ? true : false)
  setCard_client_manual_payment(setIt.includes('CLIENT_MANUAL_PAYMENT') === true ? true : false)
  setCard_department(setIt.includes('DEPARTMENT') === true ? true : false)
  setCard_task(setIt.includes('TASK') === true ? true : false)
  setCard_notification(setIt.includes('NOTIFICATION') === true ? true : false)
  setCard_file_manager(setIt.includes('FILE_MANAGER') === true ? true : false)
  setCard_manage_location(setIt.includes('MANAGE_LOCATION') === true ? true : false)
  setCard_manage_receipt(setIt.includes('RECEIPT') === true ? true : false)
  setCard_invoice(setIt.includes('INVOICE') === true ? true : false)
  setCard_custom_invoice(setIt.includes('CUSTOM_INVOICE') === true ? true : false)
  setCard_vault_manager(setIt.includes('VAULT_MANAGER') === true ? true : false)
  setCard_activity_log(setIt.includes('ACTIVITY_LOG') === true ? true : false)
  setCard_client_password(setIt.includes('CLIENT_PASSWORD') === true ? true : false)
  setCard_appointment(setIt.includes('APPOINTMENT') === true ? true : false)
  setCard_employee_leave(setIt.includes('EMPLOYEE_LEAVE') === true ? true : false)
  setCard_admin_leave(setIt.includes('ADMIN_LEAVE') === true ? true : false)
  setCard_holiday(setIt.includes('HOLIDAY') === true ? true : false)
  setCard_client_login(setIt.includes('CLIENT_LOGIN') === true ? true : false)
  setCard_employee_login(setIt.includes('EMPLOYEE_LOGIN') === true ? true : false)
  setCard_reports(setIt.includes('REPORTS') === true ? true : false)
  setCard_performance_reports(setIt.includes('PERFORMANCE_REPORT') === true ? true : false)
  setCard_due(setIt.includes('DUE_REPORTS') === true ? true : false)
  setCard_attendence_log(setIt.includes('ATTENDENCE_LOG') === true ? true : false)
  setCard_attendence_report(setIt.includes('ATTENDENCE_REPORT') === true ? true : false)
  setCard_gst(setIt.includes('GST_REPORT') === true ? true : false)

// console.log(setIt.includes('CLIENT_ADD'))
  form.setFieldsValue({
      // EMPLOYEE
      EMPLOYEE:setIt.includes('EMPLOYEE') === true ? true : false,
      EMPLOYEE_ADD:setIt.includes('EMPLOYEE_ADD') === true ? true : false,
      EMPLOYEE_EDIT:setIt.includes('EMPLOYEE_EDIT') === true ? true : false,
      EMPLOYEE_VIEW:setIt.includes('EMPLOYEE_VIEW') === true ? true : false,
      EMPLOYEE_DELETE:setIt.includes('EMPLOYEE_DELETE') === true ? true : false,
      EMPLOYEE_CHANGE_PASS:setIt.includes('CLIENT_CHANGE_PASS') === true ? true : false,
      EMPLOYEE_PERMISSION:setIt.includes('EMPLOYEE_PERMISSION') === true ? true : false,
      EMPLOYEE_CHAT:setIt.includes('EMPLOYEE_CHAT') === true ? true : false,

      // CLIENT
      CLIENT:setIt.includes('CLIENT') === true ? true : false,
      CLIENT_ADD:setIt.includes('CLIENT_ADD') === true ? true : false,
      CLIENT_EDIT:setIt.includes('CLIENT_EDIT') === true ? true : false,
      CLIENT_VIEW:setIt.includes('CLIENT_VIEW') === true ? true : false,
      CLIENT_DELETE:setIt.includes('CLIENT_DELETE') === true ? true : false,
      CLIENT_CHANGE_PASS:setIt.includes('CLIENT_CHANGE_PASS') === true ? true : false,
      CLIENT_PERMISSION:setIt.includes('CLIENT_PERMISSION') === true ? true : false,
      CLIENT_CHAT:setIt.includes('CLIENT_CHAT') === true ? true : false,

      //SETTINGS
      SETTING:setIt.includes('SETTING') === true ? true : false,
      PAYMENT_METHOD:setIt.includes('PAYMENT_METHOD') === true ? true : false,
      PAYMENT_METHOD_ADD:setIt.includes('PAYMENT_METHOD_ADD') === true ? true : false,
      PAYMENT_METHOD_EDIT:setIt.includes('PAYMENT_METHOD_EDIT') === true ? true : false,
      PAYMENT_METHOD_DELETE:setIt.includes('PAYMENT_METHOD_DELETE') === true ? true : false,

      //EXPENCES
      EXPENCES:setIt.includes('EXPENCES') === true ? true : false,
      EXPENCES_ADD:setIt.includes('EXPENCES_ADD') === true ? true : false,
      EXPENCES_EDIT:setIt.includes('EXPENCES_EDIT') === true ? true : false,
      EXPENCES_DELETE:setIt.includes('EXPENCES_DELETE') === true ? true : false,
      
      //CONFIG_SMS
      CONFIG_SMS:setIt.includes('CONFIG_SMS') === true ? true : false,
      CONFIG_SMS_EDIT:setIt.includes('CONFIG_SMS_EDIT') === true ? true : false,
      CONFIG_SMS_STATUS:setIt.includes('CONFIG_SMS_STATUS') === true ? true : false,
      
      //CONFIG_NOTIFICATION
      CONFIG_NOTIFICATION:setIt.includes('CONFIG_NOTIFICATION') === true ? true : false,
      CONFIG_NOTIFICATION_EDIT:setIt.includes('CONFIG_NOTIFICATION_EDIT') === true ? true : false,
      CONFIG_NOTIFICATION_STATUS:setIt.includes('CONFIG_NOTIFICATION_STATUS') === true ? true : false,

      //COMPANY
      COMPANY:setIt.includes('COMPANY') === true ? true : false,
      COMPANY_ADD:setIt.includes('COMPANY_ADD') === true ? true : false,
      COMPANY_EDIT:setIt.includes('COMPANY_EDIT') === true ? true : false,
      COMPANY_VIEW:setIt.includes('COMPANY_VIEW') === true ? true : false,
      COMPANY_DELETE:setIt.includes('COMPANY_DELETE') === true ? true : false,
      
      //COMPANY_GROUP
      COMPANY_GROUP:setIt.includes('COMPANY_GROUP') === true ? true : false,
      COMPANY_GROUP_ADD:setIt.includes('COMPANY_GROUP_ADD') === true ? true : false,
      COMPANY_GROUP_EDIT:setIt.includes('COMPANY_GROUP_EDIT') === true ? true : false,
      COMPANY_GROUP_VIEW:setIt.includes('COMPANY_GROUP_VIEW') === true ? true : false,
      COMPANY_GROUP_DELETE:setIt.includes('COMPANY_GROUP_DELETE') === true ? true : false,
      
      //CLIENT_MANUAL_PAYMENT
      CLIENT_MANUAL_PAYMENT:setIt.includes('CLIENT_MANUAL_PAYMENT') === true ? true : false,
      CLIENT_MANUAL_PAYMENT_VIEW:setIt.includes('CLIENT_MANUAL_PAYMENT_VIEW') === true ? true : false,

      //DEPARTMENT
      DEPARTMENT:setIt.includes('DEPARTMENT') === true ? true : false,
      DEPARTMENT_ADD:setIt.includes('DEPARTMENT_ADD') === true ? true : false,
      DEPARTMENT_EDIT:setIt.includes('DEPARTMENT_EDIT') === true ? true : false,
      DEPARTMENT_VIEW:setIt.includes('DEPARTMENT_VIEW') === true ? true : false,
      DEPARTMENT_DELETE:setIt.includes('DEPARTMENT_DELETE') === true ? true : false,
      
      //TASK
      TASK:setIt.includes('TASK') === true ? true : false,
      TASK_ADD:setIt.includes('TASK_ADD') === true ? true : false,
      TASK_EDIT:setIt.includes('TASK_EDIT') === true ? true : false,
      TASK_VIEW:setIt.includes('TASK_VIEW') === true ? true : false,
      TASK_DELETE:setIt.includes('TASK_DELETE') === true ? true : false,
      TASK_CLOSE:setIt.includes('TASK_CLOSE') === true ? true : false,
      
      //NOTIFICATION
      NOTIFICATION:setIt.includes('NOTIFICATION') === true ? true : false,
      NOTIFICATION_SEND_SMS:setIt.includes('NOTIFICATION_SEND_SMS') === true ? true : false,
      NOTIFICATION_SEND_EMAIL:setIt.includes('NOTIFICATION_SEND_EMAIL') === true ? true : false,
      NOTIFICATION_SEND_DAILY:setIt.includes('NOTIFICATION_SEND_DAILY') === true ? true : false,

      //FILE_MANAGER
      FILE_MANAGER:setIt.includes('FILE_MANAGER') === true ? true : false,
      FILE_MANAGER_ADD:setIt.includes('FILE_MANAGER_ADD') === true ? true : false,
      FILE_MANAGER_EDIT:setIt.includes('FILE_MANAGER_EDIT') === true ? true : false,
      FILE_MANAGER_DISPATCH:setIt.includes('FILE_MANAGER_DISPATCH') === true ? true : false,
      FILE_MANAGER_DIPATCHED:setIt.includes('FILE_MANAGER_DIPATCHED') === true ? true : false,
      
      //MANAGE_LOCATION
      MANAGE_LOCATION:setIt.includes('MANAGE_LOCATION') === true ? true : false,
      MANAGE_LOCATION_ADD:setIt.includes('MANAGE_LOCATION_ADD') === true ? true : false,
      MANAGE_LOCATION_EDIT:setIt.includes('MANAGE_LOCATION_EDIT') === true ? true : false,
      MANAGE_LOCATION_VIEW:setIt.includes('MANAGE_LOCATION_VIEW') === true ? true : false,
      MANAGE_LOCATION_DELETE:setIt.includes('MANAGE_LOCATION_DELETE') === true ? true : false,
      MANAGE_LOCATION_DEFAULT:setIt.includes('MANAGE_LOCATION_DEFAULT') === true ? true : false,
      
      //RECEIPT
      RECEIPT:setIt.includes('RECEIPT') === true ? true : false,
      RECEIPT_ADD:setIt.includes('RECEIPT_ADD') === true ? true : false,
      RECEIPT_EDIT:setIt.includes('RECEIPT_EDIT') === true ? true : false,

      //INVOICE
      INVOICE:setIt.includes('INVOICE') === true ? true : false,
      INVOICE_ADD:setIt.includes('INVOICE_ADD') === true ? true : false,
      INVOICE_EDIT:setIt.includes('INVOICE_EDIT') === true ? true : false,
      INVOICE_VIEW:setIt.includes('INVOICE_VIEW') === true ? true : false,
      INVOICE_MESSAGE:setIt.includes('INVOICE_MESSAGE') === true ? true : false,
      INVOICE_PAYMENT:setIt.includes('INVOICE_PAYMENT') === true ? true : false,
      
      //CUSTOM_INVOICE
      CUSTOM_INVOICE:setIt.includes('CUSTOM_INVOICE') === true ? true : false,
      CUSTOM_INVOICE_ADD:setIt.includes('CUSTOM_INVOICE_ADD') === true ? true : false,
      CUSTOM_INVOICE_EDIT:setIt.includes('CUSTOM_INVOICE_EDIT') === true ? true : false,
      CUSTOM_INVOICE_DELETE:setIt.includes('CUSTOM_INVOICE_DELETE') === true ? true : false,
      
      //VAULT_MANAGER
      VAULT_MANAGER:setIt.includes('VAULT_MANAGER') === true ? true : false,
      VAULT_MANAGER_ADD:setIt.includes('VAULT_MANAGER_ADD') === true ? true : false,
      VAULT_MANAGER_EDIT:setIt.includes('VAULT_MANAGER_EDIT') === true ? true : false,
      VAULT_MANAGER_DELETE:setIt.includes('VAULT_MANAGER_DELETE') === true ? true : false,
      VAULT_MANAGER_SHOW_PASSWORD:setIt.includes('VAULT_MANAGER_SHOW_PASSWORD') === true ? true : false,

      //ACTIVITY_LOG
      ACTIVITY_LOG:setIt.includes('ACTIVITY_LOG') === true ? true : false,
      ACTIVITY_LOG_VIEW:setIt.includes('ACTIVITY_LOG_VIEW') === true ? true : false,

      //CLIENT_PASSWORD
      CLIENT_PASSWORD:setIt.includes('CLIENT_PASSWORD') === true ? true : false,
      CLIENT_PASSWORD_ADD:setIt.includes('CLIENT_PASSWORD_ADD') === true ? true : false,
      CLIENT_PASSWORD_EDIT:setIt.includes('CLIENT_PASSWORD_EDIT') === true ? true : false,
      CLIENT_PASSWORD_DELETE:setIt.includes('CLIENT_PASSWORD_DELETE') === true ? true : false,
      
      //APPOINTMENT
      APPOINTMENT:setIt.includes('APPOINTMENT') === true ? true : false,
      APPOINTMENT_ADD:setIt.includes('APPOINTMENT_ADD') === true ? true : false,
      APPOINTMENT_EDIT:setIt.includes('APPOINTMENT_EDIT') === true ? true : false,
      APPOINTMENT_ACCEPT_REJECT:setIt.includes('APPOINTMENT_ACCEPT_REJECT') === true ? true : false,
      APPOINTMENT_DELETE:setIt.includes('APPOINTMENT_DELETE') === true ? true : false,
      APPOINTMENT_CHAT:setIt.includes('APPOINTMENT_CHAT') === true ? true : false,

      //EMPLOYEE_LEAVE
      EMPLOYEE_LEAVE:setIt.includes('EMPLOYEE_LEAVE') === true ? true : false,
      EMPLOYEE_LEAVE_VIEW:setIt.includes('EMPLOYEE_LEAVE_VIEW') === true ? true : false,

      //ADMIN_LEAVE
      ADMIN_LEAVE:setIt.includes('ADMIN_LEAVE') === true ? true : false,
      ADMIN_LEAVE_ADD:setIt.includes('ADMIN_LEAVE_ADD') === true ? true : false,
      ADMIN_LEAVE_EDIT:setIt.includes('ADMIN_LEAVE_EDIT') === true ? true : false,
      ADMIN_LEAVE_DELETE:setIt.includes('ADMIN_LEAVE_DELETE') === true ? true : false,
      
      //HOLIDAY
      HOLIDAY:setIt.includes('HOLIDAY') === true ? true : false,
      HOLIDAY_ADD:setIt.includes('HOLIDAY_ADD') === true ? true : false,
      HOLIDAY_EDIT:setIt.includes('HOLIDAY_EDIT') === true ? true : false,
      HOLIDAY_DELETE:setIt.includes('HOLIDAY_DELETE') === true ? true : false,

      //CLIENT_LOGIN
      CLIENT_LOGIN:setIt.includes('CLIENT_LOGIN') === true ? true : false,
      CLIENT_LOGIN_VIEW:setIt.includes('CLIENT_LOGIN_VIEW') === true ? true : false,
      
      //EMPLOYEE_LOGIN
      EMPLOYEE_LOGIN:setIt.includes('EMPLOYEE_LOGIN') === true ? true : false,
      EMPLOYEE_LOGIN_VIEW:setIt.includes('EMPLOYEE_LOGIN_VIEW') === true ? true : false,
      
      //REPORTS
      REPORTS:setIt.includes('REPORTS') === true ? true : false,

      //PERFORMANCE_REPORT
      PERFORMANCE_REPORT:setIt.includes('PERFORMANCE_REPORT') === true ? true : false,
      PERFORMANCE_REPORT_VIEW:setIt.includes('PERFORMANCE_REPORT_VIEW') === true ? true : false,

      //DUE_REPORTS
      DUE_REPORTS:setIt.includes('DUE_REPORTS') === true ? true : false,
      DUE_REPORTS_VIEW:setIt.includes('DUE_REPORTS_VIEW') === true ? true : false,

      //ATTENDENCE_LOG
      ATTENDENCE_LOG:setIt.includes('ATTENDENCE_LOG') === true ? true : false,
      ATTENDENCE_LOG_ADD:setIt.includes('ATTENDENCE_LOG_ADD') === true ? true : false,
      ATTENDENCE_LOG_EDIT:setIt.includes('ATTENDENCE_LOG_EDIT') === true ? true : false,
      ATTENDENCE_LOG_DELETE:setIt.includes('ATTENDENCE_LOG_DELETE') === true ? true : false,
      
      //ATTENDENCE_REPORT
      ATTENDENCE_REPORT:setIt.includes('ATTENDENCE_REPORT') === true ? true : false,
      ATTENDENCE_REPORT_VIEW:setIt.includes('ATTENDENCE_REPORT_VIEW') === true ? true : false,
      
      //GST_REPORT
      GST_REPORT:setIt.includes('GST_REPORT') === true ? true : false,
      GST_REPORT_VIEW:setIt.includes('GST_REPORT_VIEW') === true ? true : false,

    })
}


useEffect(() => {
  GetUsersByID();
}, [])



  // console.log(dataID);
  // handlechangepermission
  const handleChangePermission = async (value, e) => {
    console.log(value);
    let obj_len = Object.keys(value).length;
    // console.log(obj_len);
    // console.log(asfdsa);
    var result = Object.keys(value).map((key) => [key,value[key]]);
    let all_permissions =[];
    for (let i = 0; i < obj_len; i++) {
      // console.log(result[i][1]);

      if (result[i][1] !== undefined && result[i][1] !== false ) {
        // console.log(result[i][0]);
        all_permissions.push(result[i][0]);
      }
    }
    let asd = Object.keys(all_permissions).map(function(k){return all_permissions[k]}).join(",");
    console.log(asd);

    setLoading(true);

    let ApiData = {
      id: dataID,
      "permission":asd
    };
    // console.log(ApiData);

    let response = await await ApiSnippets("/ChangePermission", ApiData);

    if (response.status === true) {
      successMsg(response.message);
      setTimeout(() => {
        // form.resetFields();
        // navigate("/app/dashboards/employees");
      }, 500);
    } else {
      errorMsg(response.message);
    }

    setLoading(false);
  };


  const HanldeOnChangeEmployee = (checkedValues) => {
    console.log("checked = ", checkedValues);
    console.log("object");
  };
  return (
    <>
      <Form layout="vertical" form={form} onFinish={handleChangePermission}>
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
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="EMPLOYEE" label=""  valuePropName="checked" style={{ alignItems: "center" }}>
                          <Checkbox name="EMPLOYEE" onChange={Manage_employee}>Employee</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_employee === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EMPLOYEE_ADD" label="" valuePropName="checked">
                                <Checkbox name="EMPLOYEE_ADD" >Add</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EMPLOYEE_EDIT" label=""  valuePropName="checked">
                                <Checkbox name="EMPLOYEE_EDIT" >Edit</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EMPLOYEE_VIEW" label=""  valuePropName="checked">
                                <Checkbox name="EMPLOYEE_VIEW" >View</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EMPLOYEE_DELETE" label=""  valuePropName="checked">
                                <Checkbox name="EMPLOYEE_DELETE" >Delete</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EMPLOYEE_CHANGE_PASS" label=""  valuePropName="checked">
                                <Checkbox name="EMPLOYEE_CHANGE_PASS" >Change Pass</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EMPLOYEE_PERMISSION" label=""  valuePropName="checked">
                                <Checkbox name="EMPLOYEE_PERMISSION" > Permission </Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EMPLOYEE_CHAT" label=""  valuePropName="checked">
                                  <Checkbox name="EMPLOYEE_CHAT">Chat</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>

                    {/* =================================================== CARD 2 ================================================== */}
                    
                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="CLIENT" label="" valuePropName="checked"  style={{ alignItems: "center" }}>
                          <Checkbox name="CLIENT" onChange={Manage_client}>Client</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_client === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="CLIENT_ADD" label=""  valuePropName="checked">
                                <Checkbox name="CLIENT_ADD" >Add</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="CLIENT_EDIT" label=""  valuePropName="checked">
                                <Checkbox name="CLIENT_EDIT" >Edit</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="CLIENT_VIEW" label=""  valuePropName="checked">
                                <Checkbox name="CLIENT_VIEW" >View</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="CLIENT_DELETE" label=""  valuePropName="checked">
                                <Checkbox name="CLIENT_DELETE" >Delete</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="CLIENT_CHANGE_PASS" label=""  valuePropName="checked">
                                <Checkbox name="CLIENT_CHANGE_PASS" >Change Pass</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="CLIENT_PERMISSION" label=""  valuePropName="checked">
                                <Checkbox name="CLIENT_PERMISSION" > Permission </Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="CLIENT_CHAT" label=""  valuePropName="checked">
                                <Checkbox name="CLIENT_CHAT" >Chat</Checkbox>
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
                        {/* <Form.Item name="EXPENCES" label=""  style={{ alignItems: "center" }}>
                          <Checkbox name="EXPENCES" onChange={Manage_expenses}>Expences</Checkbox>
                        </Form.Item> */}
                        <Divider orientation="left" type="horizontal" orientationMargin="0" style={{ margin:0 }}>
                        <Form.Item name="SETTING" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                          <Checkbox name="SETTING" onChange={Manage_setting}>Setting</Checkbox>
                        </Form.Item>
                        </Divider>
                        {card_setting === true && (
                          <>
                          <Card>
                          <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="PAYMENT_METHOD" label=""  valuePropName="checked">
                                <Checkbox name="PAYMENT_METHOD" onChange={Manage_payment_method}>Payment Method</Checkbox>
                              </Form.Item>
                            </Col>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {
                            card_payment_method && true && (
                              <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="PAYMENT_METHOD_ADD" label=""  valuePropName="checked">
                                <Checkbox name="PAYMENT_METHOD_ADD" >Add</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="PAYMENT_METHOD_EDIT" label=""  valuePropName="checked">
                                <Checkbox name="PAYMENT_METHOD_EDIT" >Edit</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="PAYMENT_METHOD_DELETE" label=""  valuePropName="checked">
                                <Checkbox name="PAYMENT_METHOD_DELETE" >Delete</Checkbox>
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
                                <Form.Item name="EXPENCES" label=""  valuePropName="checked">
                                  <Checkbox name="EXPENCES"  onChange={Manage_expenses}>Expences</Checkbox>
                                </Form.Item>
                              </Col>
                              <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                              {
                            card_expenses && true && (
                              <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EXPENCES_ADD" label=""  valuePropName="checked">
                                  <Checkbox name="EXPENCES_ADD" >Add</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EXPENCES_EDIT" label=""  valuePropName="checked">
                                <Checkbox name="EXPENCES_EDIT" >Edit</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EXPENCES_DELETE" label=""  valuePropName="checked">
                                <Checkbox name="EXPENCES_DELETE" >Delete</Checkbox>
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
                                <Form.Item name="CONFIG_SMS" label=""  valuePropName="checked">
                                  <Checkbox name="CONFIG_SMS"  onChange={Manage_config_sms} >Config SMS</Checkbox>
                                </Form.Item>
                              </Col>
                              <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                              {
                                card_config_sms && true && (
                                <>
                                  <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                    <Form.Item name="CONFIG_SMS_EDIT" label=""  valuePropName="checked">
                                      <Checkbox name="CONFIG_SMS_EDIT" >Edit</Checkbox>
                                    </Form.Item>
                                  </Col>
                                  <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                    <Form.Item name="CONFIG_SMS_STATUS" label=""  valuePropName="checked">
                                      <Checkbox name="CONFIG_SMS_STATUS" >Status</Checkbox>
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
                              <Form.Item name="CONFIG_NOTIFICATION" label=""  valuePropName="checked">
                                <Checkbox name="CONFIG_NOTIFICATION"  onChange={Manage_config_notification}>Config Notification</Checkbox>
                              </Form.Item>
                            </Col>
                            <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                            {
                                card_config_notification && true && (
                                <>
                                  <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                    <Form.Item name="CONFIG_NOTIFICATION_EDIT" label=""  valuePropName="checked">
                                      <Checkbox name="CONFIG_NOTIFICATION_EDIT" >Edit</Checkbox>
                                    </Form.Item>
                                  </Col>
                                  <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                    <Form.Item name="CONFIG_NOTIFICATION_STATUS" label=""  valuePropName="checked">
                                      <Checkbox name="CONFIG_NOTIFICATION_STATUS" >Status</Checkbox>
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
                        <Form.Item name="COMPANY" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                          <Checkbox name="COMPANY" onChange={Manage_company}>Company</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_company === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="COMPANY_ADD" label=""  valuePropName="checked">
                                  <Checkbox name="COMPANY_ADD" >Add</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="COMPANY_EDIT" label=""  valuePropName="checked">
                                  <Checkbox name="COMPANY_EDIT" >Edit</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="COMPANY_VIEW" label=""  valuePropName="checked">
                                  <Checkbox name="COMPANY_VIEW" >View</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="COMPANY_DELETE" label=""  valuePropName="checked">
                                  <Checkbox name="COMPANY_DELETE">Delete</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 5 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="COMPANY_GROUP" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                          <Checkbox name="COMPANY_GROUP" onChange={Manage_company_group}>Company Group</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_company_group === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="COMPANY_GROUP_ADD" label=""  valuePropName="checked">
                                  <Checkbox name="COMPANY_GROUP_ADD"  >Add</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="COMPANY_GROUP_EDIT" label=""  valuePropName="checked">
                                  <Checkbox name="COMPANY_GROUP_EDIT"  >Edit</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="COMPANY_GROUP_VIEW" label=""  valuePropName="checked">
                                  <Checkbox name="COMPANY_GROUP_VIEW"  >View</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="COMPANY_GROUP_DELETE" label=""  valuePropName="checked">
                                  <Checkbox name="COMPANY_GROUP_DELETE"  >Delete</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 6 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="CLIENT_MANUAL_PAYMENT" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                          <Checkbox name="CLIENT_MANUAL_PAYMENT"  onChange={Manage_client_manual_payment}>Client Manual Payment</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_client_manual_payment === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="CLIENT_MANUAL_PAYMENT_VIEW" label=""  valuePropName="checked">
                                  <Checkbox name="CLIENT_MANUAL_PAYMENT_VIEW"  >View</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 7 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="DEPARTMENT" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                          <Checkbox name="DEPARTMENT"  onChange={Manage_department}>Department</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_department === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="DEPARTMENT_ADD" label=""  valuePropName="checked">
                                  <Checkbox name="DEPARTMENT_ADD"  >Add</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="DEPARTMENT_EDIT" label=""  valuePropName="checked">
                                  <Checkbox name="DEPARTMENT_EDIT"  >Edit</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="DEPARTMENT_VIEW" label=""  valuePropName="checked">
                                  <Checkbox name="DEPARTMENT_VIEW"  >View</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="DEPARTMENT_DELETE" label=""  valuePropName="checked">
                                  <Checkbox name="DEPARTMENT_DELETE" >Delete</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 8 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="TASK" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                          <Checkbox name="TASK"  onChange={Manage_task}>Task</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_task === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="TASK_ADD" label=""  valuePropName="checked">
                                  <Checkbox name="TASK_ADD" >Add</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="TASK_EDIT" label=""  valuePropName="checked">
                                  <Checkbox name="TASK_EDIT" >Edit</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="TASK_VIEW" label=""  valuePropName="checked">
                                  <Checkbox name="TASK_VIEW" >View</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="TASK_DELETE" label=""  valuePropName="checked">
                                  <Checkbox name="TASK_DELETE" >Delete</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="TASK_CLOSE" label=""  valuePropName="checked">
                                  <Checkbox name="TASK_CLOSE" >Close</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 9 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="NOTIFICATION" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                          <Checkbox name="NOTIFICATION"  onChange={Manage_notification}>Notification</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_notification === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="NOTIFICATION_SEND_SMS" label=""  valuePropName="checked">
                                  <Checkbox name="NOTIFICATION_SEND_SMS" >Send SMS</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="NOTIFICATION_SEND_EMAIL" label=""  valuePropName="checked">
                                  <Checkbox name="NOTIFICATION_SEND_EMAIL" >Send Email</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="NOTIFICATION_SEND_DAILY" label=""  valuePropName="checked">
                                  <Checkbox name="NOTIFICATION_SEND_DAILY" >Send Daily</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 10 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="FILE_MANAGER" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                          <Checkbox name="FILE_MANAGER"  onChange={Manage_file_manger}>File Manager</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_file_manager === true && (
                          <>
                          <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="FILE_MANAGER_ADD" label=""  valuePropName="checked">
                                  <Checkbox name="FILE_MANAGER_ADD" >Add</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="FILE_MANAGER_EDIT" label=""  valuePropName="checked">
                                  <Checkbox name="FILE_MANAGER_EDIT" >Edit</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="FILE_MANAGER_DISPATCH" label=""  valuePropName="checked">
                                  <Checkbox name="FILE_MANAGER_DISPATCH" >Dispatch</Checkbox>
                              </Form.Item>
                            </Col>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="FILE_MANAGER_DIPATCHED" label=""  valuePropName="checked">
                                  <Checkbox name="FILE_MANAGER_DIPATCHED" >Dipatched</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 11 ================================================== */}
                      <Card style={{ width: "100%" }}>
                        <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                          <Form.Item name="MANAGE_LOCATION" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                            <Checkbox name="MANAGE_LOCATION"  onChange={Manage_location}>Manage Location</Checkbox>
                          </Form.Item>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {card_manage_location === true && (
                            <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="MANAGE_LOCATION_ADD" label=""  valuePropName="checked">
                                    <Checkbox name="MANAGE_LOCATION_ADD" >Add</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="MANAGE_LOCATION_EDIT" label=""  valuePropName="checked">
                                    <Checkbox name="MANAGE_LOCATION_EDIT" >Edit</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="MANAGE_LOCATION_DELETE" label=""  valuePropName="checked">
                                    <Checkbox name="MANAGE_LOCATION_DELETE" >Delete</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="MANAGE_LOCATION_DEFAULT" label=""  valuePropName="checked">
                                    <Checkbox name="MANAGE_LOCATION_DEFAULT" >Default</Checkbox>
                                </Form.Item>
                              </Col>
                            </>
                          )}
                        </Row>
                      </Card>
                    {/* =================================================== CARD 12 ================================================== */}
                    <Card style={{ width: "100%" }}>
                        <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                          <Form.Item name="RECEIPT" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                            <Checkbox name="RECEIPT"  onChange={Manage_receipt}>Receipt</Checkbox>
                          </Form.Item>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {card_manage_receipt === true && (
                            <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="RECEIPT_ADD" label=""  valuePropName="checked">
                                    <Checkbox name="RECEIPT_ADD" >Add</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="RECEIPT_EDIT" label=""  valuePropName="checked">
                                    <Checkbox name="RECEIPT_EDIT" >Edit</Checkbox>
                                </Form.Item>
                              </Col>
                             </>
                          )}
                        </Row>
                      </Card>
                    {/* =================================================== CARD 13 ================================================== */}
                    <Card style={{ width: "100%" }}>
                        <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                          <Form.Item name="INVOICE" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                            <Checkbox name="INVOICE"  onChange={Manage_invoice}>Invoice</Checkbox>
                          </Form.Item>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {card_invoice === true && (
                            <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="INVOICE_ADD" label=""  valuePropName="checked">
                                    <Checkbox name="INVOICE_ADD" >Add</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="INVOICE_EDIT" label=""  valuePropName="checked">
                                    <Checkbox name="INVOICE_EDIT" >Edit</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="INVOICE_MESSAGE" label=""  valuePropName="checked">
                                    <Checkbox name="INVOICE_MESSAGE" >Message</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="INVOICE_VIEW" label=""  valuePropName="checked">
                                    <Checkbox name="INVOICE_VIEW" >View</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="INVOICE_PAYMENT" label=""  valuePropName="checked">
                                    <Checkbox name="INVOICE_PAYMENT" >Payment</Checkbox>
                                </Form.Item>
                              </Col>
                            </>
                          )}
                        </Row>
                      </Card>
                    {/* =================================================== CARD 14 ================================================== */}
                    <Card style={{ width: "100%" }}>
                        <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                          <Form.Item name="CUSTOM_INVOICE" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                            <Checkbox name="CUSTOM_INVOICE"  onChange={Manage_custom_invoice}>Custom Invoice</Checkbox>
                          </Form.Item>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {card_custom_invoice === true && (
                            <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="CUSTOM_INVOICE_ADD" label=""  valuePropName="checked">
                                    <Checkbox name="CUSTOM_INVOICE_ADD" >Add</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="CUSTOM_INVOICE_EDIT" label=""  valuePropName="checked">
                                    <Checkbox name="CUSTOM_INVOICE_EDIT" >Edit</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="CUSTOM_INVOICE_DELETE" label=""  valuePropName="checked">
                                    <Checkbox name="CUSTOM_INVOICE_DELETE" >Delete</Checkbox>
                                </Form.Item>
                              </Col>
                            </>
                          )}
                        </Row>
                      </Card>
                    {/* =================================================== CARD 15 ================================================== */}
                    <Card style={{ width: "100%" }}>
                        <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                          <Form.Item name="VAULT_MANAGER" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                            <Checkbox name="VAULT_MANAGER"  onChange={Manage_vault_manager}>Vault Manager</Checkbox>
                          </Form.Item>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {card_vault_manager === true && (
                            <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="VAULT_MANAGER_ADD" label=""  valuePropName="checked">
                                    <Checkbox name="VAULT_MANAGER_ADD" >Add</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="VAULT_MANAGER_EDIT" label=""  valuePropName="checked">
                                    <Checkbox name="VAULT_MANAGER_EDIT" >Edit</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="VAULT_MANAGER_DELETE" label=""  valuePropName="checked">
                                    <Checkbox name="VAULT_MANAGER_DELETE" >Delete</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="VAULT_MANAGER_SHOW_PASSWORD" label=""  valuePropName="checked">
                                    <Checkbox name="VAULT_MANAGER_SHOW_PASSWORD" >Show Password</Checkbox>
                                </Form.Item>
                              </Col>
                            </>
                          )}
                        </Row>
                      </Card>
                    {/* =================================================== CARD 16 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="ACTIVITY_LOG" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                          <Checkbox name="ACTIVITY_LOG"  onChange={Manage_activity_log}>Activity Log</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_activity_log === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="ACTIVITY_LOG_VIEW" label=""  valuePropName="checked">
                                  <Checkbox name="ACTIVITY_LOG_VIEW" >View</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 17 ================================================== */}
                    <Card style={{ width: "100%" }}>
                        <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                          <Form.Item name="CLIENT_PASSWORD" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                            <Checkbox name="CLIENT_PASSWORD"  onChange={Manage_client_password}>Client Password</Checkbox>
                          </Form.Item>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {card_client_password === true && (
                            <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="CLIENT_PASSWORD_ADD" label=""  valuePropName="checked">
                                    <Checkbox name="CLIENT_PASSWORD_ADD" >Add</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="CLIENT_PASSWORD_EDIT" label=""  valuePropName="checked">
                                    <Checkbox name="CLIENT_PASSWORD_EDIT" >Edit</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="CLIENT_PASSWORD_DELETE" label=""  valuePropName="checked">
                                    <Checkbox name="CLIENT_PASSWORD_DELETE" >Delete</Checkbox>
                                </Form.Item>
                              </Col>
                            </>
                          )}
                        </Row>
                      </Card>
                    {/* =================================================== CARD 18 ================================================== */}
                    <Card style={{ width: "100%" }}>
                        <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                          <Form.Item name="APPOINTMENT" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                            <Checkbox name="APPOINTMENT"  onChange={Manage_appointment}>Appointment</Checkbox>
                          </Form.Item>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {card_appointment === true && (
                            <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="APPOINTMENT_ADD" label=""  valuePropName="checked">
                                    <Checkbox name="APPOINTMENT_ADD" >Add</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="APPOINTMENT_EDIT" label=""  valuePropName="checked">
                                    <Checkbox name="APPOINTMENT_EDIT" >Edit</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="APPOINTMENT_ACCEPT_REJECT" label=""  valuePropName="checked">
                                    <Checkbox name="APPOINTMENT_ACCEPT_REJECT"  style={{textWrap: "nowrap"}}>Accept & Reject</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="APPOINTMENT_DELETE" label=""  valuePropName="checked">
                                    <Checkbox name="APPOINTMENT_DELETE" >Delete</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="APPOINTMENT_CHAT" label=""  valuePropName="checked">
                                    <Checkbox name="APPOINTMENT_CHAT" >Chat</Checkbox>
                                </Form.Item>
                              </Col>
                            </>
                          )}
                        </Row>
                      </Card>
                    {/* =================================================== CARD 19 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="EMPLOYEE_LEAVE" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                          <Checkbox name="EMPLOYEE_LEAVE"  onChange={Manage_employee_leave}>Employee Leave</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_employee_leave === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EMPLOYEE_LEAVE_VIEW" label=""  valuePropName="checked">
                                  <Checkbox name="EMPLOYEE_LEAVE_VIEW" >View</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 20 ================================================== */}
                    <Card style={{ width: "100%" }}>
                        <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                          <Form.Item name="ADMIN_LEAVE" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                            <Checkbox name="ADMIN_LEAVE"  onChange={Manage_admin_leave}>Admin Leave</Checkbox>
                          </Form.Item>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {card_admin_leave === true && (
                            <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="ADMIN_LEAVE_ADD" label=""  valuePropName="checked">
                                    <Checkbox name="ADMIN_LEAVE_ADD" >Add</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="ADMIN_LEAVE_EDIT" label=""  valuePropName="checked">
                                    <Checkbox name="ADMIN_LEAVE_EDIT" >Edit</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="ADMIN_LEAVE_DELETE" label=""  valuePropName="checked">
                                    <Checkbox name="ADMIN_LEAVE_DELETE" >Delete</Checkbox>
                                </Form.Item>
                              </Col>
                            </>
                          )}
                        </Row>
                      </Card>
                    {/* =================================================== CARD 21 ================================================== */}
                    <Card style={{ width: "100%" }}>
                        <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                          <Form.Item name="HOLIDAY" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                            <Checkbox name="HOLIDAY"  onChange={Manage_holiday}>Holiday</Checkbox>
                          </Form.Item>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {card_holiday === true && (
                            <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="HOLIDAY_ADD" label=""  valuePropName="checked">
                                    <Checkbox name="HOLIDAY_ADD" >Add</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="HOLIDAY_EDIT" label=""  valuePropName="checked">
                                    <Checkbox name="HOLIDAY_EDIT" >Edit</Checkbox>
                                </Form.Item>
                              </Col>
                              <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Form.Item name="HOLIDAY_DELETE" label=""  valuePropName="checked">
                                    <Checkbox name="HOLIDAY_DELETE" >Delete</Checkbox>
                                </Form.Item>
                              </Col>
                            </>
                          )}
                        </Row>
                      </Card>
                    {/* =================================================== CARD 22 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="CLIENT_LOGIN" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                          <Checkbox name="CLIENT_LOGIN" onChange={Manage_client_login}>Client Login</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_client_login === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="CLIENT_LOGIN_VIEW" label=""  valuePropName="checked">
                                  {/* <Checkbox name="CLIENT_LOGIN_VIEW">View</Checkbox> */}
                                  <Checkbox name="CLIENT_LOGIN_VIEW" >View</Checkbox>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Card>
                    {/* =================================================== CARD 23 ================================================== */}
                    <Card style={{ width: "100%" }}>
                      <Row gutter={8} justify="start" style={{ height: "auto", alignItems:"center" }}>
                        <Form.Item name="EMPLOYEE_LOGIN" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                          <Checkbox name="EMPLOYEE_LOGIN"  onChange={Manage_employee_login}>Employee Login</Checkbox>
                        </Form.Item>
                        <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                        {card_employee_login === true && (
                          <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="EMPLOYEE_LOGIN_VIEW" label=""  valuePropName="checked">
                                  <Checkbox name="EMPLOYEE_LOGIN_VIEW" >View</Checkbox>
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
                        {/* <Form.Item name="EXPENCES" label=""  style={{ alignItems: "center" }}>
                          <Checkbox name="EXPENCES"  onChange={Manage_expenses}>Expences</Checkbox>
                        </Form.Item> */}
                        <Divider orientation="left" type="horizontal" orientationMargin="0" style={{ margin:0 }}>
                        <Form.Item name="REPORTS" label=""  style={{ alignItems: "center" }} valuePropName="checked">
                          <Checkbox name="REPORTS" onChange={Manage_reports}>Reports</Checkbox>
                        </Form.Item>
                        </Divider>
                        {card_reports === true && (
                          <>
                          <Card>
                          <Row gutter={16} justify="start" style={{ height: "auto", alignItems:"center" }}>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="PERFORMANCE_REPORT" label=""  valuePropName="checked">
                                  <Checkbox name="PERFORMANCE_REPORT" onChange={Manage_performance_reports}>Performance Report</Checkbox>
                              </Form.Item>
                            </Col>
                          <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                          {
                            card_performance_reports && true && (
                              <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="PERFORMANCE_REPORT_VIEW" label=""  valuePropName="checked">
                                  <Checkbox name="PERFORMANCE_REPORT_VIEW">View</Checkbox>
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
                                <Form.Item name="DUE_REPORTS" label=""  valuePropName="checked">
                                    <Checkbox name="DUE_REPORTS" onChange={Manage_due}>Due</Checkbox>
                                </Form.Item>
                              </Col>
                              <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                              {
                                card_due && true && (
                              <>
                            <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                              <Form.Item name="DUE_REPORTS_VIEW" label=""  valuePropName="checked">
                                  <Checkbox name="DUE_REPORTS_VIEW" >View</Checkbox>
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
                                <Form.Item name="ATTENDENCE_LOG" label=""  valuePropName="checked">
                                    <Checkbox name="ATTENDENCE_LOG" onChange={Manage_attendence_log} >Attendence Log</Checkbox>
                                </Form.Item>
                              </Col>
                              <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                              {
                                card_attendence_log && true && (
                                <>
                                  <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                    <Form.Item name="ATTENDENCE_LOG_ADD" label=""  valuePropName="checked">
                                        <Checkbox name="ATTENDENCE_LOG_ADD">Add</Checkbox>
                                    </Form.Item>
                                  </Col>
                                  <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                    <Form.Item name="ATTENDENCE_LOG_EDIT" label=""  valuePropName="checked">
                                        <Checkbox name="ATTENDENCE_LOG_EDIT">Edit</Checkbox>
                                    </Form.Item>
                                  </Col>
                                  <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                    <Form.Item name="ATTENDENCE_LOG_DELETE" label=""  valuePropName="checked">
                                        <Checkbox name="ATTENDENCE_LOG_DELETE">Delete</Checkbox>
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
                              <Form.Item name="ATTENDENCE_REPORT" label=""  valuePropName="checked">
                                  <Checkbox name="ATTENDENCE_REPORT" onChange={Manage_attendence_report}>Attendence Report</Checkbox>
                              </Form.Item>
                            </Col>
                            <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                            {
                              card_attendence_report && true && (
                                <>
                                  <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                    <Form.Item name="ATTENDENCE_REPORT_VIEW" label=""  valuePropName="checked">
                                        <Checkbox name="ATTENDENCE_REPORT_VIEW">View</Checkbox>
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
                              <Form.Item name="GST_REPORT" label=""  valuePropName="checked">
                                  <Checkbox name="GST_REPORT" checked={false} onChange={Manage_gst}>GST Report</Checkbox>
                              </Form.Item>
                            </Col>
                            <Divider orientation="left" type="vertical" style={{ height: "2.9rem", width: "1rem" }}></Divider>
                            {
                              card_gst && true && (
                                <>
                                  <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                                    <Form.Item name="GST_REPORT_VIEW" label=""  valuePropName="checked">
                                        <Checkbox name="GST_REPORT_VIEW" >View</Checkbox>
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