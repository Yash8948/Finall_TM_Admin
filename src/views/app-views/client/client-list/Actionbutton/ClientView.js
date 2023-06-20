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
    Table
} from 'antd';
import { Icon } from 'components/util-components/Icon'
import { useNavigate, useParams } from "react-router-dom";
import ApiSnippets from 'constants/ApiSnippet';

// import { employementList, interestedList, connectionList, groupList } from './profileData';
import {
    GlobalOutlined,
    MailOutlined,
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
    }, [])



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
    const logData = [
        // dataIndex: 'id',
        {
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
            title: "Description",
            dataIndex: "description",
            width: "20%",
            align: "center",

        },
        {
            title: "Date",
            dataIndex: "on_date",
            // render: (on_date) => new Date(on_date * 1000).toLocaleDateString("en-GB"),
            width: "20%",
            align: "center",
        },
        {
            title: "Created On",
            dataIndex: "created_on",
            width: "20%",
            align: "center",

        },
        {
            title: "Actions",
            dataIndex: "action",
            width: "20%",
            align: "center",

        },
    ];
    const LoginData = [
        // dataIndex: 'id',
        {
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
            title: "Name",
            dataIndex: "user_name",
            sorter: (a, b) => a.id - b.id,
            width: "20%",
            align: "center",
        },
        {
            title: "Log In",
            dataIndex: "login_time",
            filterSearch: true,
            onFilter: (value, record) => record.address.startsWith(value),
            width: "20%",
            align: "center",

        },
        {
            title: "Log Out",
            dataIndex: "logout_time",
            width: "20%",
            align: "center",

        },
    ];
    const ticketsdata = [
        // dataIndex: 'id',
        {
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
            title: "Name",
            dataIndex: "title",
            sorter: (a, b) => a.id - b.id,
            width: "20%",
            align: "center",
        },
        {
            title: "Starting Date",
            dataIndex: "starting_date",
            // render: (on_date) => new Date(on_date * 1000).toLocaleDateString("en-GB"),
            width: "20%",
            align: "center",
        },
        {
            title: "Description",
            dataIndex: "description",
            width: "20%",
            align: "center",

        },
        {
            title: "Amount",
            dataIndex: "amount",
            width: "20%",
            align: "center",

        },
        {
            title: "status",
            dataIndex: "status",
            width: "20%",
            align: "center",

        },
    ];
    const invoicedata = [
        // dataIndex: 'id',
        {
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
            title: "Invoice Number",
            dataIndex: "invoice_no",
            filterSearch: true,
            onFilter: (value, record) => record.address.startsWith(value),
            width: "20%",
            align: "center",

        },
        {
            title: "Client Name",
            dataIndex: "company",
            sorter: (a, b) => a.id - b.id,
            width: "20%",
            align: "center",
        },
        {
            title: "Amount",
            dataIndex: "total",
            // render: (on_date) => new Date(on_date * 1000).toLocaleDateString("en-GB"),
            width: "20%",
            align: "center",
        },
        {
            title: "Details",
            dataIndex: "other_details",
            width: "20%",
            align: "center",

        },
        {
            title: "Actions",
            dataIndex: "action",
            width: "20%",
            align: "center",

        },
    ];
    const fetchData = async (value) => {
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
    }, [])
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
    }, [])
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
    }, [])
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
    }, [])
    const BasicTabs = () => (
        <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Log Details" key="1">
                <Table
                    columns={logData}
                    dataSource={data}
                    style={{ overflow: "auto" }}

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
                                        {/* <Row className="mb-2">
                                            <Col xs={12} sm={12} md={9}>
                                                <Icon type={GlobalOutlined} className="text-primary font-size-md" />
                                                <span className="text-muted ml-2">Website:</span>
                                            </Col>
                                            <Col xs={12} sm={12} md={15}>
                                                <span className="font-weight-semibold">ellarbae.io</span>
                                            </Col>
                                        </Row> */}
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
