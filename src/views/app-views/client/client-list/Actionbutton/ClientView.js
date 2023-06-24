import React, { useState } from 'react'
import {
    Row,
    Col,
    Card,
    Button,
    Avatar,
    Dropdown,
    Menu,
    Tag,
    Select,
    Input,
    DatePicker,
    Divider,
    Form,
    Spin,
    Tabs,
    message,
    Tooltip,
    Table
} from 'antd';
import { Icon } from 'components/util-components/Icon'
import { useNavigate, useParams } from "react-router-dom";
import ApiSnippets from 'constants/ApiSnippet';

// import { employementList, interestedList, connectionList, groupList } from './profileData';
import {
    GlobalOutlined,
    MailOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    MessageOutlined,
    HomeOutlined,
    PhoneOutlined
} from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import { useEffect } from 'react';
import Profile from './thumb-1.jpg';
import dayjs from "dayjs";





const ClientView = (props) => {


    const [cLsearchvalue, setCLsearchvalue] = useState(null);
    const navigate = useNavigate();
    const avatarSize = 150;
    const { id } = useParams();
    const dataID = id.slice(1, id.length);
    const [viewData, setViewData] = useState([])
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const dateFormatList = ["DD/MM/YYYY"];
    const [tableData, setTableData] = useState([]);
    const [data, setData] = useState();
    const [loginData, setLoginData] = useState();
    const [ticketData, setTicketData] = useState();
    const [invoiceData, setInvoiceData] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 20,
        },
    });
    const [clientTableData, setClientTableData] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();


    const successMsg = (msg) => {
        // message.success(countObj.message);
        messageApi.success(msg);
    };
    const errorMsg = (msg) => {
        // message.success(countObj.message);
        messageApi.error(msg);
    };

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < dayjs().startOf("day");
    }


    const getClientById = async () => {
        console.log(dataID)
        let ApiData = {
            "id": dataID,
            // "type": 2
        };
        console.log(ApiData);
        let response = await ApiSnippets("/GetUsers", ApiData);
        // console.log(response.data);

        let ClientData = response.data[0];
        console.log(ClientData)
        setViewData(ClientData)
    }

    useEffect(() => {
        getClientById();
    }, []);



    const handleAddClient = async (value, id) => {
        // console.log(value);
        let ApiData = {
            "client": dataID,
            "message": value.message,
            "description": value.description,
            "date": value["date"].format("DD-MM-YYYY"), //Add your required date format here
            // date: value["date"].format("YYYY-MM-DD HH:mm:ss")  //Add your required date format here
        };
        console.log(ApiData)
        let response = await ApiSnippets("/AddClientLog", ApiData);
        let countObj = await response;

        if (countObj.status === true) {
            successMsg(countObj.message)
            setTimeout(() => {
                form.resetFields();
                fetchData();
            }, 500);
        } else {
            // message.error(countObj.message); 
            errorMsg(countObj.message)
        }

        setLoading(false);
    };

    const handleEditLog = (elm) => {
        console.log(elm);

        navigate(`/app/client/client_list/view/edit_client_log/:${elm}`)
    }
    const deleteLog = async (userID) => {
        // e.StopPropagation();
        console.log(userID);
        setLoading(false)
        let ApiData = {
            id: userID,
            "delete": "delete"
        };
        console.log(ApiData);
        let response = await ApiSnippets("/EditClientLog", ApiData);
        setLoading(false)
        fetchData();
        console.log(response);
    }
    const handleEditInvoice = (elm) => {
        console.log(elm);

        navigate(`/app/client/client_list/view/edit_client_invoice/:${elm}`)
    }
    const deleteInvoice = async (userID) => {
        console.log(userID);
        setLoading(true)
        let ApiData = {
            id: userID,
        };
        console.log(ApiData);
        let response = await ApiSnippets("/delete_client_password", ApiData);
        setLoading(false)
        fetchData();
        console.log(response);
    }
    const handleInvoiceView = (elm) => {
        console.log(elm);

        navigate(`/app/client/client_list/view/view_client_invoice/:${elm}`)
    }
    const logData = [
        // dataIndex: 'id',
        {
            key: "log1",
            title: "SrNo",
            dataIndex: "srno",
            defaultSortOrder: "ascend",
            // sorter:(a, b) => a.id - b.id,
            // render: (id, record, index) => {
            //   ++index;
            //   return index;
            // },
            width: "10%",
            align: "center",
        },
        {
            key: "log2",
            title: "Client Name",
            dataIndex: "client",
            sorter: (a, b) => a.id - b.id,
            width: "20%",
            align: "center",
        },
        {
            title: "Message",
            dataIndex: "message",
            filterSearch: true,
            onFilter: (value, record) => record.address.startsWith(value),
            width: "20%",
            align: "center",

        },
        {
            key: "log3",
            title: "Description",
            dataIndex: "description",
            width: "20%",
            align: "center",

        },
        {
            key: "log4",
            title: "Date",
            dataIndex: "on_date",
            // render: (on_date) => new Date(on_date * 1000).toLocaleDateString("en-GB"),
            width: "20%",
            align: "center",
        },
        {
            key: "log5",
            title: "Created On",
            dataIndex: "created_on",
            width: "20%",
            align: "center",

        },
        {
            key: "log6",
            title: "Actions",
            dataIndex: "action",
            width: "20%",
            align: "center",
            render: (_, elm) => (

                <div className="text-right d-flex justify-content-center">
                    <Tooltip title="Edit">
                        <Button className="mr-2" icon={<EditOutlined />}
                            onClick={() => handleEditLog(elm.id)}
                            size="small" />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button className="mr-2" icon={<DeleteOutlined />}
                            onClick={(e) => deleteLog(elm.id, e)}
                            size="small" />
                    </Tooltip>

                </div>

            )

        },
    ];
    const LoginData = [
        // dataIndex: 'id',
        {
            key: "login1",
            title: "SrNo",
            dataIndex: "srno",
            defaultSortOrder: "ascend",
            // sorter:(a, b) => a.id - b.id,
            // render: (id, record, index) => {
            //   ++index;
            //   return index;
            // },
            width: "20%",
            align: "center",
        },
        {
            key: "login2",
            title: "Name",
            dataIndex: "user_name",
            sorter: (a, b) => a.id - b.id,
            width: "20%",
            align: "center",
        },
        {
            key: "login3",
            title: "Log In",
            dataIndex: "login_time",
            filterSearch: true,
            onFilter: (value, record) => record.address.startsWith(value),
            width: "20%",
            align: "center",

        },
        {
            key: "login4",
            title: "Log Out",
            dataIndex: "logout_time",
            width: "20%",
            align: "center",

        },
    ];
    const ticketsdata = [

        {
            key: "ticket1",
            title: "SrNo",
            dataIndex: "srno",
            defaultSortOrder: "ascend",
            // sorter:(a, b) => a.id - b.id,
            // render: (id, record, index) => {
            //   ++index;
            //   return index;
            // },
            width: "20%",
            align: "center",
        },
        {
            key: "ticket2",
            title: "Name",
            dataIndex: "title",
            sorter: (a, b) => a.id - b.id,
            width: "20%",
            align: "center",
        },
        {
            key: "ticket3",
            title: "Starting Date",
            dataIndex: "starting_date",
            // render: (on_date) => new Date(on_date * 1000).toLocaleDateString("en-GB"),
            width: "20%",
            align: "center",
        },
        {
            key: "ticket4",
            title: "Description",
            dataIndex: "description",
            width: "20%",
            align: "center",

        },
        {
            key: "ticket5",
            title: "Amount",
            dataIndex: "amount",
            width: "20%",
            align: "center",

        },
        {
            key: "ticket6",
            title: "status",
            dataIndex: "status",
            width: "20%",
            align: "center",
            render: (_, record) => {
                const activeData = record.status; // Assuming `record.active` contains the active value for the current record
                // console.log(activeData)
                if (activeData === '0') {
                    return <Tag color="red">unassigned</Tag>;
                }
                else if (activeData === '1') {
                    return <Tag color="blue">Inactive</Tag>;
                }
                else if (activeData === '2') {
                    return <Tag color="yellow">In Progress</Tag>;
                }
                else if (activeData === '3') {
                    return <Tag color="red">query Raised</Tag>;
                }
                else if (activeData === '4') {
                    return <Tag color="blue">completed</Tag>;
                }
                else if (activeData === '5') {
                    return <Tag color="green">completed & reviewed</Tag>;
                }
                else if (activeData === '6') {
                    return <Tag color="yellow">InvoiceRaised</Tag>;
                }
                else if (activeData === '7') {
                    return <Tag color="green">Paid</Tag>;
                }
            }

        },
    ];
    const invoicedata = [
        
        {
            key: "invoice1",
            title: "SrNo",
            dataIndex: "srno",
            defaultSortOrder: "ascend",
            // sorter:(a, b) => a.id - b.id,
            // render: (id, record, index) => {
            //   ++index;
            //   return index;
            // },
            width: "20%",
            align: "center",
        },
        {
            key: "invoice2",
            title: "Invoice Number",
            dataIndex: "invoice_no",
            filterSearch: true,
            onFilter: (value, record) => record.address.startsWith(value),
            width: "20%",
            align: "center",
            render: (text) => `Invoice No. ${text}`

        },
        {
            key: "invoice3",
            title: "Client Name",
            dataIndex: "company",
            sorter: (a, b) => a.id - b.id,
            width: "20%",
            align: "center",
        },
        {
            key: "invoice4",
            title: "Amount",
            dataIndex: "total",
            // render: (on_date) => new Date(on_date * 1000).toLocaleDateString("en-GB"),
            width: "20%",
            align: "center",
        },
        {
            key: "invoice5",
            title: "Details",
            dataIndex: "other_details",
            width: "20%",
            align: "center",

        },
        {
            key: "invoice6",
            title: "Actions",
            dataIndex: "action",
            width: "20%",
            align: "center",
            render: (_, elm) => {
                const invoicePaymentData = elm.payment_id;
                const customData = elm.custom_invoice;
                console.log(invoicePaymentData)
                console.log(customData)
                if (invoicePaymentData == 1) {
                    return (

                        <div className="text-right d-flex justify-content-center">
                            <Tooltip title="view">
                                <Button className="mr-2" icon={<EyeOutlined />}
                                    onClick={() => handleInvoiceView(elm.id)}
                                    size="small" />
                            </Tooltip>
                            {/* <Tooltip title="Message">
                                <Button className="mr-2" icon={<MessageOutlined />}
                                    // onClick={() => handleMessage(elm.id)} 
                                    size="small" />
                            </Tooltip> */}
                        </div>
                    );
                }
                if (invoicePaymentData == 0 && customData == 1) {
                    return (

                        <div className="text-right d-flex justify-content-center">
                            <Tooltip title="view">
                                <Button className="mr-2" icon={<EyeOutlined />}
                                    onClick={() => handleInvoiceView(elm.id)}
                                    size="small" />
                            </Tooltip>
                            <Tooltip title="Edit">
                                <Button className="mr-2" icon={<EditOutlined />}
                                    onClick={() => handleEditInvoice(elm.id)}
                                    size="small" />
                            </Tooltip>
                            <Tooltip title="Message">
                                <Button className="mr-2" icon={<MessageOutlined />}
                                    // onClick={() => handleMessage(elm.id)} 
                                    size="small" />
                            </Tooltip>
                        </div>
                    );
                }
                else if (invoicePaymentData == 0) {
                    return (
                        <div className="text-right d-flex justify-content-center">
                            <Tooltip title="view">
                                <Button className="mr-2" icon={<EyeOutlined />}
                                    onClick={() => handleInvoiceView(elm.id)}
                                    size="small" />
                            </Tooltip>
                            <Tooltip title="Message">
                                <Button className="mr-2" icon={<MessageOutlined />}
                                    // onClick={() => handleMessage(elm.id)} 
                                    size="small" />
                            </Tooltip>
                        </div>
                    )
                }


            }


        },
    ];
    const fetchData = async (value) => {
        var offset = 0;

        // setLoading(true);
        if (tableParams.pagination.current > 1) {
            offset =
                (tableParams.pagination.current - 1) * tableParams.pagination.pageSize;
        }
        let ApiData = {
            "id": dataID,
            limit: tableParams.pagination.pageSize,
            offset: offset,
        };
        console.log(ApiData);
        let response = await ApiSnippets("/ClientLogData", ApiData);
        let countObj = await response.data;
        for (let i = 0; i < countObj.length; i++) {
            // limit * currentpage - (limit -1)
            let current_page = tableParams.pagination.current;
            let page_limit = tableParams.pagination.pageSize;
            countObj[i].srno = page_limit * current_page - (page_limit - i - 1); // srno added to response thank you jigi
            countObj[i].on_date = new Date(
                countObj[i].on_date * 1000
            ).toLocaleDateString("en-GB");
        }
        // console.log(countObj);
        setClientTableData(countObj);
        // console.log(srno_array);
        // console.log(response.count);
        setData(response.data);
        console.log(data);
        // setData(PclientLogData);
        setLoading(false);
        setTableParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                total: response.count,
                // total: 100,
                // 200 is mock data, you should read it from server
                // total: data.totalCount,
            },
        });
    };

    useEffect(() => {
        fetchData();
    }, []);
    const loginfetchData = async (value) => {
        var offset = 0;

        setLoading(true);
        if (tableParams.pagination.current > 1) {
            offset =
                (tableParams.pagination.current - 1) * tableParams.pagination.pageSize;
        }
        let ApiData = {
            "id": dataID,
            limit: tableParams.pagination.pageSize,
            offset: offset,
        };
        console.log(ApiData);
        let response = await ApiSnippets("/ClientLoginData", ApiData);
        let countObj = await response.data;
        for (let i = 0; i < countObj.length; i++) {
            // limit * currentpage - (limit -1)
            let current_page = tableParams.pagination.current;
            let page_limit = tableParams.pagination.pageSize;
            countObj[i].srno = page_limit * current_page - (page_limit - i - 1); // srno added to response thank you jigi
            countObj[i].on_date = new Date(
                countObj[i].on_date * 1000
            ).toLocaleDateString("en-GB");
            countObj[i].logout_time = dayjs(countObj[i].logout_time * 1000).format("h:mm:ss A");
        }
        // console.log(countObj);
        setClientTableData(countObj);
        // console.log(srno_array);
        // console.log(response.count);
        setLoginData(response.data);
        console.log(loginData);
        // setData(PclientLogData);
        setLoading(false);
        setTableParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                total: response.count,
                // total: 100,
                // 200 is mock data, you should read it from server
                // total: data.totalCount,
            },
        });
    };
    useEffect(() => {
        loginfetchData();
    }, []);
    const ticketfetchData = async (value) => {
        var offset = 0;

        setLoading(true);
        if (tableParams.pagination.current > 1) {
            offset =
                (tableParams.pagination.current - 1) * tableParams.pagination.pageSize;
        }
        let ApiData = {
            "id": dataID,
            limit: tableParams.pagination.pageSize,
            offset: offset,
        };
        console.log(ApiData);
        let response = await ApiSnippets("/LoadClientTicketDetail", ApiData);
        let countObj = await response.data;
        let activeData = []; // Array to store the active values

        for (let i = 0; i < countObj.length; i++) {
            let active = countObj[i].status;
            activeData.push(active); // Push the active value into the array
        }
        console.log(activeData)
        for (let i = 0; i < countObj.length; i++) {
            // limit * currentpage - (limit -1)
            let current_page = tableParams.pagination.current;
            let page_limit = tableParams.pagination.pageSize;
            countObj[i].srno = page_limit * current_page - (page_limit - i - 1); // srno added to response thank you jigi
            countObj[i].on_date = new Date(
                countObj[i].on_date * 1000
            ).toLocaleDateString("en-GB");
        }
        // console.log(countObj);
        setClientTableData(countObj);
        // console.log(srno_array);
        // console.log(response.count);
        setTicketData(response.data);
        console.log(ticketData);
        // setData(PclientLogData);
        setLoading(false);
        setTableParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                total: response.count,
                // total: 100,
                // 200 is mock data, you should read it from server
                // total: data.totalCount,
            },
        });
    };
    useEffect(() => {
        ticketfetchData();
    }, []);
    const invoicefetchData = async (value) => {
        var offset = 0;

        setLoading(true);
        if (tableParams.pagination.current > 1) {
            offset =
                (tableParams.pagination.current - 1) * tableParams.pagination.pageSize;
        }
        let ApiData = {
            "id": dataID,
            limit: tableParams.pagination.pageSize,
            offset: offset,
        };
        console.log(ApiData);
        let response = await ApiSnippets("/LoadInvoiceList", ApiData);
        let countObj = await response.data;

        let invoicePaymentData = []; // Array to store the active values
        let customData = []; // Array to store the active values

        for (let i = 0; i < countObj.length; i++) {
            let paymentData = countObj[i].payment_id;
            invoicePaymentData.push(paymentData); // Push the active value into the array
        }
        for (let i = 0; i < countObj.length; i++) {
            let customInvoice = countObj[i].custom_invoice;
            customData.push(customInvoice); // Push the active value into the array
        }
        console.log(invoicePaymentData)
        for (let i = 0; i < countObj.length; i++) {
            // limit * currentpage - (limit -1)
            let current_page = tableParams.pagination.current;
            let page_limit = tableParams.pagination.pageSize;
            countObj[i].srno = page_limit * current_page - (page_limit - i - 1); // srno added to response thank you jigi
            countObj[i].on_date = new Date(
                countObj[i].on_date * 1000
            ).toLocaleDateString("en-GB");
        }
        // console.log(countObj);
        setClientTableData(countObj);
        // console.log(srno_array);
        // console.log(response.count);
        setInvoiceData(response.data);
        console.log(invoiceData);
        // setData(PclientLogData);
        setLoading(false);
        setTableParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                total: response.count,
                // total: 100,
                // 200 is mock data, you should read it from server
                // total: data.totalCount,
            },
        });
    };

    useEffect(() => {
        invoicefetchData();
    }, []);
    const BasicTabs = () => (
        <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Log Details" key="1">
                <Table
                    columns={logData}
                    dataSource={data}
                    style={{ overflow: "auto" }}
                    loading={loading}

                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Login Details" key="2">
                <Table
                    columns={LoginData}
                    dataSource={loginData}
                    style={{ overflow: "auto" }}

                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Ticket Details" key="3">
                <Table
                    columns={ticketsdata}
                    dataSource={ticketData}
                    style={{ overflow: "auto" }}

                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Invoice Details" key="4">
                <Table
                    columns={invoicedata}
                    dataSource={invoiceData}
                    style={{ overflow: "auto" }}



                />
            </Tabs.TabPane>
        </Tabs>
    );
    return (
        <div>
            <PageHeaderAlt background="/img/others/img-12.jpg" cssClass="bg-primary" overlap>
                <div className="container text-center">
                    <div className="py-5 my-md-5">
                    </div>
                </div>
            </PageHeaderAlt>
            <Card>
                <Row justify="center">
                    <Col sm={24} md={23}>
                        <div className="d-md-flex">
                            <div className="rounded p-2 bg-white shadow-sm mx-auto" style={{ 'marginTop': '-3.5rem', 'maxWidth': `${props.avatarSize + 12}px` }}>
                                <Avatar shape="square" size={avatarSize} src={Profile} />
                            </div>
                            <div className="ml-md-4 w-100">
                                <Flex alignItems="center" mobileFlex={false} className="mb-3 text-md-left text-center">
                                    <h2 className="mb-0 mt-md-0 mt-2">{viewData.username}</h2>
                                </Flex>
                                <Row gutter="16">
                                    <Col sm={24} md={8}>
                                        <h4 className="mt-0 mr-3 text-muted text-md-left text-center">
                                            {viewData.first_name}   {viewData.last_name}
                                        </h4>
                                    </Col>
                                    <Col xs={24} sm={24} md={8}>
                                        <Row className="mb-2">
                                            <Col xs={12} sm={12} md={9}>
                                                <Icon type={MailOutlined} className="text-primary font-size-md" />
                                                <span className="text-muted ml-2">Email:</span>
                                            </Col>
                                            <Col xs={12} sm={12} md={15}>
                                                <span className="font-weight-semibold">{viewData.email}</span>
                                            </Col>
                                        </Row>

                                    </Col>
                                    <Col xs={24} sm={24} md={8}>
                                        <Row>
                                            <Col xs={12} sm={12} md={9}>
                                                <Icon type={PhoneOutlined} className="text-primary font-size-md" />
                                                <span className="text-muted ml-2">Phone:</span>
                                            </Col>
                                            <Col xs={12} sm={12} md={15}>
                                                <span className="font-weight-semibold">{viewData.contact_number}</span>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>

            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={7}>
                    <Card
                        title="Add Log"
                    // extra={<CardDropdown items={newJoinMemberOptions} />}
                    >
                        <div className="mt-3">
                            <Spin spinning={loading} >
                                <Form layout="vertical"
                                    // onFinish={handleAddClient}
                                    form={form}
                                    onFinish={handleAddClient}>
                                    <div style={{ marginBottom: 16 }}>
                                        <Form.Item label="User : " name="message" rules={[{ required: true, message: 'Please input your message!' }]}>
                                            <Input placeholder="Enter Message" />
                                        </Form.Item>
                                    </div>
                                    <div style={{ marginBottom: 16 }}>
                                        <Form.Item label="Description : " name="description" rules={[{ required: true, message: 'Please input your description!' }]}>
                                            <TextArea rows={4} placeholder="Enter Description" />
                                        </Form.Item>
                                    </div>
                                    <div style={{ marginBottom: 16 }}>
                                        <Form.Item label="Date : " name="date" rules={[{ required: true, message: 'Please input your date!' }]}  >
                                            <DatePicker
                                                // defaultValue={dayjs()}
                                                format={dateFormatList}
                                                disabledDate={disabledDate}
                                                // onChange={handleDatePicker}
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div style={{ marginBottom: 16 }}>
                                        <Form.Item>
                                            {contextHolder}
                                            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </Form>
                            </Spin>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={24} lg={17}>
                    <Card>
                        <div className="mt-1">
                            <BasicTabs />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ClientView
