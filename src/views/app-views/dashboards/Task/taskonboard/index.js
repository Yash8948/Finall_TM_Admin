import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Row,
  Col,
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
  Tooltip,
  Modal,
  Checkbox,
} from "antd";
import dayjs from "dayjs";
// import moment from "moment";
// import { useReactToPrint } from "react-to-print";

import { EyeOutlined, DeleteOutlined, CloseCircleOutlined, DownloadOutlined, EditOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import { MdPassword } from "react-icons/md";
import StatisticWidget from "components/shared-components/StatisticWidget";
import ChartWidget from "components/shared-components/ChartWidget";
import AvatarStatus from "components/shared-components/AvatarStatus";
import GoalWidget from "components/shared-components/GoalWidget";
import Card from "components/shared-components/Card";
import BoardCards from "components/shared-components/BoardCards";
import Flex from "components/shared-components/Flex";
//datatable imports
// import { Table } from 'antd';
import { Table } from "ant-table-extensions";

import qs from "qs";

import {
  VisitorChartData,
  AnnualStatisticData,
  ActiveMembersData,
  NewMembersData,
  RecentTransactionData,
} from "../../default/DefaultDashboardData";
import ApexChart from "react-apexcharts";
import { apexLineChartDefaultOption, COLOR_2 } from "constants/ChartConstant";
import { SPACER } from "constants/ThemeConstant";
import {
  UserAddOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  PlusOutlined,
  EllipsisOutlined,
  StopOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import utils from "utils";
import { useSelector } from "react-redux";
import { AUTH_TOKEN } from "constants/AuthConstant";
import { admin_Dashboard } from "services/AllDataService";
// import { Admin_Dashboard } from '../../../../services/AllDataService'
import ApiSnippets from "../../../../../constants/ApiSnippet";
import { result } from "lodash";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { TextArea } = Input;
const dateFormatList = ["DD/MM/YYYY"];

const MembersChart = (props) => <ApexChart {...props} />;

const memberChartOption = {
  ...apexLineChartDefaultOption,
  ...{
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors: [COLOR_2],
  },
};



const newJoinMemberOptions = [
  {
    key: "Add all",
    label: (
      <Flex alignItems="center" gap={SPACER[2]}>
        <PlusOutlined />
        <span className="ml-2">Add all</span>
      </Flex>
    ),
  },
  {
    key: "Disable all",
    label: (
      <Flex alignItems="center" gap={SPACER[2]}>
        <StopOutlined />
        <span className="ml-2">Disable all</span>
      </Flex>
    ),
  },
];

const CardDropdown = ({ items }) => {
  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}
    >
      <a
        href="/#"
        className="text-gray font-size-lg"
        onClick={(e) => e.preventDefault()}
      >
        <EllipsisOutlined />
      </a>
    </Dropdown>
  );
};

// const tableColumns = [
//   {
//     title: 'Sr.No',
//     dataIndex: 'srno',
//     key: 'srno',
//     // render: (text, record) => (
//     //   <div className="d-flex align-items-center">
//     //     <Avatar size={30} className="font-size-sm" style={{ backgroundColor: record.avatarColor }}>
//     //       {utils.getNameInitial(text)}
//     //     </Avatar>
//     //     <span className="ml-2">{text}</span>
//     //   </div>
//     // ),
//   },
//   {
//     title: 'Client Name',
//     dataIndex: 'Client_Name',
//     key: 'Client_Namedate',
//   },
//   {
//     title: 'Message',
//     dataIndex: 'Message',
//     key: 'Message',
//   },
//   {
//     title: () => <div className="text-right">Status</div>,
//     key: 'status',
//     // render: (_, record) => (
//       // <div className="text-right">
//       //   <Tag className="mr-0" color={record.status === 'Approved' ? 'cyan' : record.status === 'Pending' ? 'blue' : 'volcano'}>{record.status}</Tag>
//       // </div>
//     // ),
//   },
// ];

// TABLE task list



// const columns = [
//   // dataIndex: 'id', 
//   {
//     title: "SrNo",
//     dataIndex: "srno",
//     defaultSortOrder: "ascend",
//     // sorter:(a, b) => a.id - b.id,
//     // render: (id, record, index) => {
//     //   ++index;
//     //   return index;
//     // },
//     width: "5%",
//   },
//   {
//     title: "id testing",
//     dataIndex: "ticket_id",
//     sorter: (a, b) => a.id - b.id,
//     width: "5%",
//   },
//   {
//     title: "Task Name",
//     dataIndex: "title",
//     sorter: (a, b) => a.id - b.id,
//     width: "15%",
//   },
//   {
//     title: "Ticket Id",
//     dataIndex: "unique_id",
//     width: "15%",
//     // filterSearch: true,
//     // onFilter: (value, record) => record.address.startsWith(value),
//   },
//   {
//     title: "Client Name",
//     dataIndex: "client_name",
//     width: "15%",
//   },
//   {
//     title: "Employee Name",
//     dataIndex: "",
//     // render: (on_date) => new Date(on_date * 1000).toLocaleDateString("en-GB"),
//     width: "1%",
//   },
//   {
//     title: "Department ",
//     dataIndex: "department_name",
//     width: "15%",
//   },
//   {
//     title: "Starting Date",
//     dataIndex: "starting_date",
//     render: (starting_date) => {
//       const parts = starting_date.split('-');
//       const day = parts[2];
//       const month = parts[1];
//       const year = parts[0];
//       return `${day}-${month}-${year}`;
//     },
//     width: "15%",
//   },
//   {
//     title: "Closing Date",
//     dataIndex: "deadline_date",
//     // render: (on_date) => new Date(on_date * 1000).toLocaleDateString("en-GB"),
//     render: (deadline_date) => {
//       const parts = deadline_date.split('-');
//       const day = parts[2];
//       const month = parts[1];
//       const year = parts[0];
//       return `${day}-${month}-${year}`;
//     },
//     width: "15%",
//   },
//   {
//     title: "Status",
//     dataIndex: "statusname",
//     render: active => (
// 			<Tag className ="text-capitalize" color={active === 'Un-assigned'? 'red' : 'cyan'}>{active === 'Un-assigned' ? 'Un-assigned' : 'open'}</Tag>
// 		),
//     width: "15%",
//   },
//   {
//     title: "Action",
//     render: (elm) => (
//                 <div className="text-right d-flex ">
//                 <Button.Group>
//                   <Tooltip title="View">
//                     <Button type="primary" className='mx-0' icon={<EyeOutlined />} size="small" style={{boxShadow:"none"}}/>
//                   </Tooltip>
//                   <Tooltip title="Edit">
//                     <Button style={{backgroundColor:"#38b94e", color:"white"}} className="mx-0" icon={<EditOutlined />} onClick={() => editEmployee(elm)} size="small"/>
//                   </Tooltip>
//                   <Tooltip title="Delete">
//                     <Button danger type='primary' className='mx-0' icon={<DeleteOutlined />} onClick={()=> deleteUser(elm.ticket_id)} size="small" style={{boxShadow:"none"}}/>
//                   </Tooltip>
//                   <Tooltip title="Close Ticket">
//                     <Button type="primary" className='mx-0' icon={<CloseCircleOutlined />} 
//                     // onClick={()=> deleteUser(elm.ticket_id)}
//                     onClick={showModal}
//                      size="small" style={{boxShadow:"none"}}/>
//                   </Tooltip>
//                   {/* <Tooltip title="Reset Password">
//                     <Button style={{backgroundColor:"#38b94e", color:"white"}} className='mx-0' icon={<MdPassword />} onClick={()=> resetPassword(elm.ID)} size="small"/>
//                   </Tooltip> */}
//                   {/* <Tooltip title="Permission">
//                     <Button className='mx-0' icon={<SettingOutlined />} onClick={()=> permission(elm.ID)} size="small"/>
//                   </Tooltip> */}
//                   {/* <Tooltip title="Message">
//                     <Button style={{backgroundColor:"blue", color:"white"}} className='mx-0' icon={<MessageOutlined />} onClick={()=> messageUser(elm.ID)} size="small"/>
//                   </Tooltip> */}
//                   </Button.Group>
//                 </div>
//               ),
//     width: "20%",
//   },
// ];


const deleteUser = async (userID) => {
  console.log(userID);
  // setLoading(true)
  // let ApiData = {
  //   id:userID,
  // };
  // // console.log(ApiData);
  // let response = await ApiSnippets("/Delete_Employee", ApiData);
  // setLoading(false)
  // fetchData();
  // console.log(response);
}
const editEmployee = async (userID) => {
  console.log(userID);
  // setLoading(true)
  // let ApiData = {
  //   id:userID,
  // };
  // // console.log(ApiData);
  // let response = await ApiSnippets("/Delete_Employee", ApiData);
  // setLoading(false)
  // fetchData();
  // console.log(response);
}

const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Close Ticket"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      style={{
        textAlignLast: 'center'
      }}
      width="250px"
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          // modifier: 'public',
        }}
        style={{
          justifyContent: 'center'
        }}
      >
        <Form.Item name="send_email" className="mb-0" valuePropName="checked">
            <Checkbox  value="send_email">send_email</Checkbox>
        </Form.Item>
        <Form.Item name="send_sms" className="collection-create-form_last-form-item" valuePropName="checked">
            <Checkbox value="send_sms">send_sms</Checkbox>
        </Form.Item> 
      </Form>
    </Modal>
  );
};

export const DefaultDashboard = () => {
  
	const navigate = useNavigate();
  const [visitorChartData] = useState(VisitorChartData);
  // const [annualStatisticData] = useState(AnnualStatisticData);
  const [activeMembersData] = useState(ActiveMembersData);
  const [newMembersData] = useState(NewMembersData);
  const [recentTransactionData] = useState(RecentTransactionData);
  const { direction } = useSelector((state) => state.theme);
  const [cardCounts, setCardCounts] = useState(null);
  const [clientTableData, setClientTableData] = useState(null);
  const [clientName, setClientName] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [ticketID, setTicketID] = useState(null)

  //table task list
  const [data, setData] = useState();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  
  const handleAddNew = () => {
    navigate('/app/dashboards/task/taskadd') 
    
  }

  const onCreate =async (values) => {
    // setLoading(true)
    // values.push({ ticketID: ticketID });
    console.log('Received values of form: ', values);
    
		// let ApiData = {  
		// 	id:userID,
		// };
		// let response = await ApiSnippets("/Delete_Employee", ApiData);
		// fetchData();
    // setLoading(false)
    setOpen(false);
  };
  const hanldeModal = (elm) => {
    setOpen(true);
    console.log(elm);
  }





  const showModal = (elm) => {
    // console.log(elm);
    setTicketID(elm)
    // set this to set
    setOpen(true);
  };
  // const handleOk = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     setOpen(false);
  //   }, 3000);
  // };
  // const handleCancel = () => {
  //   setOpen(false);
  // };

  const columns = [
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
      width: "5%",
    },
    {
      title: "id testing",
      dataIndex: "ticket_id",
      sorter: (a, b) => a.id - b.id,
      width: "5%",
    },
    {
      title: "Task Name",
      dataIndex: "title",
      sorter: (a, b) => a.id - b.id,
      width: "15%",
    },
    {
      title: "Ticket Id",
      dataIndex: "unique_id",
      width: "15%",
      // filterSearch: true,
      // onFilter: (value, record) => record.address.startsWith(value),
    },
    {
      title: "Client Name",
      dataIndex: "client_name",
      width: "15%",
    },
    {
      title: "Employee Name",
      dataIndex: "",
      // render: (on_date) => new Date(on_date * 1000).toLocaleDateString("en-GB"),
      width: "1%",
    },
    {
      title: "Department ",
      dataIndex: "department_name",
      width: "15%",
    },
    {
      title: "Starting Date",
      dataIndex: "starting_date",
      render: (starting_date) => {
        const parts = starting_date.split('-');
        const day = parts[2];
        const month = parts[1];
        const year = parts[0];
        return `${day}-${month}-${year}`;
      },
      width: "15%",
    },
    {
      title: "Closing Date",
      dataIndex: "deadline_date",
      // render: (on_date) => new Date(on_date * 1000).toLocaleDateString("en-GB"),
      render: (deadline_date) => {
        const parts = deadline_date.split('-');
        const day = parts[2];
        const month = parts[1];
        const year = parts[0];
        return `${day}-${month}-${year}`;
      },
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "statusname",
      render: active => (
        <>
          <Tag className="text-capitalize"  color={active === 'Un-assigned' ? 'red' : active === 'Open' ? 'geekblue' : active === 'Invoice Raised' ? 'cyan' : active === "Completed & Reviewed" ?'green': active === "Completed" ?'orange': active === "inprogress" ?'magenta': active === "query" ?'purple': "gold"}>
                                                  {active === 'Un-assigned' ? 'Un-assigned' : active === 'Open' ? 'assigned' : active === 'Invoice Raised' ? 'Invoice Raised': active === 'Completed' ? 'Completed': active === "inprogress" ?'inprogress': active === "query" ?'Query Raised' : active}
          </Tag>
        </>
      ),
      width: "15%",
    },
    {
      title: "Action",
      render: (elm) => (
                  <div className="text-right d-flex ">
                  <Button.Group>
                    <Tooltip title="View">
                      <Button type="primary" className='mx-0' icon={<EyeOutlined />} size="small" style={{boxShadow:"none"}}/>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <Button style={{backgroundColor:"#38b94e", color:"white"}} className="mx-0" icon={<EditOutlined />} onClick={() => editEmployee(elm)} size="small"/>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <Button danger type='primary' className='mx-0' icon={<DeleteOutlined />} onClick={()=> deleteUser(elm.ticket_id)} size="small" style={{boxShadow:"none"}}/>
                    </Tooltip>
                    <Tooltip title="Close Ticket">
                      <Button type="primary" className='mx-0' icon={<CloseCircleOutlined />      } 
                      // onClick={()=> deleteUser(elm.ticket_id)}
                      onClick={()=>showModal(elm.ticket_id)}
                       size="small" style={{boxShadow:"none"}}/>
                    </Tooltip>
                    {/* <Tooltip title="Reset Password">
                      <Button style={{backgroundColor:"#38b94e", color:"white"}} className='mx-0' icon={<MdPassword />} onClick={()=> resetPassword(elm.ID)} size="small"/>
                    </Tooltip> */}
                    {/* <Tooltip title="Permission">
                      <Button className='mx-0' icon={<SettingOutlined />} onClick={()=> permission(elm.ID)} size="small"/>
                    </Tooltip> */}
                    {/* <Tooltip title="Message">
                      <Button style={{backgroundColor:"blue", color:"white"}} className='mx-0' icon={<MessageOutlined />} onClick={()=> messageUser(elm.ID)} size="small"/>
                    </Tooltip> */}
                    </Button.Group>
                  </div>
                ),
      width: "20%",
    },
  ];



  // table api
  const fetchData = async () => {
    var offset = 0;
    setLoading(true);
    if (tableParams.pagination.current > 1) {
      offset =
        (tableParams.pagination.current - 1) * tableParams.pagination.pageSize;
    }
    let ApiData = {
      "limit": tableParams.pagination.pageSize,
      "offset": offset,
      "search": "",
    };
    // console.log(ApiData)
    let response = await ApiSnippets("/LoadTask", ApiData);
    let countObj = await response.data;
    for (let i = 0; i < countObj.length; i++) {
      // limit * currentpage - (limit -1)
      let current_page = tableParams.pagination.current;
      let page_limit = tableParams.pagination.pageSize;
      countObj[i].srno = page_limit * current_page - (page_limit - i - 1); // srno added to response thank you jigi
      countObj[i].on_date = new Date(countObj[i].on_date * 1000).toLocaleDateString("en-GB")
    }

    // console.log(countObj);

    setClientTableData(countObj);

    setData(response.data);
    // console.log(data);
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


  



  const latestTransactionOption = [
    {
      key: "Refresh",
      label: (
        <Flex alignItems="center" gap={SPACER[2]} onClick={fetchData}>
          <ReloadOutlined />
          <span className="ml-2">Refresh</span>
        </Flex>
      ),
    },
    {
      key: "Print",
      label: (
        <Flex alignItems="center" gap={SPACER[2]} >
          <PrinterOutlined />
          <span className="ml-2">Print</span>
        </Flex>
      ),
    },
    {
      key: "Export",
      label: (
        <Flex alignItems="center" gap={SPACER[2]}>
          <FileExcelOutlined />
          <span className="ml-2">Export</span>
        </Flex>
      ),
    },
  ];


  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination, sorter) => {
    setTableParams({
      pagination,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const { Option } = Select;

  function onChange(value) {
    // console.log(`selected ${value}`);
  }

  function onBlur() {
    // console.log("blur");
  }

  function onFocus() {
    // console.log("focus");
  }

  function onSearch(val) {
    // console.log("search:", val);
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < dayjs().startOf("day");
  }

  //task list table selected drop down


  return (
    <>
      {/* <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card title="Task On Board">
                <Table
                  columns={columns}
                  rowKey={(record) => record.ID} // id
                  dataSource={data}
                  pagination={tableParams.pagination}
                  loading={loading}
                  onChange={handleTableChange}
                  exportableProps={{
                    showColumnPicker: true,
                    fileName: "Task_onboard_List",
                  }}
                  style={{ overflow: "auto" }}
                />
          </Card>
        </Col>
      </Row> */}

{/* all new */}
<Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card
            title="Task List"

            
          >
          <Flex alignItems="center" className=" mb-3 __card" justifyContent="space-between" mobileFlex={false} >	
				{/* <Flex className="mb-1" mobileFlex={false}> */}
					<div className="mr-md-3 __div_search_box " style={{justifyContent:"start"}} >
						{/* <Input className='__searchbox' placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} /> */}

						{/* <Input.Search allowClear className="__searchbox" onSearch={hanldeSearch_tasklist} style={{width:"100%"}}/> */}
					</div>
					{/* <div className="mb-3">
						<Select 
							defaultValue="All" 
							className="w-100" 
							style={{ minWidth: 180 }} 
							onChange={handleShowCategory} 
							placeholder="Category"
						>
							<Option value="All">All</Option>
							{
								categories.map(elm => (
									<Option key={elm} value={elm}>{elm}</Option>
								))
							}
						</Select>
					</div> */}				
				{/* </Flex> */}
					<div style={{justifyContent:"end"}}>
						<Row gutter={24}  >
							<Col xs={24} sm={24} md={24} lg={24} xl={24} style={{paddingLeft:"0"}} >
								<Button onClick={handleAddNew} type="primary" className='__button mx-2' style={{whiteSpace:"normal"}} block >Add Task</Button>
							</Col>
							{/* <Col xs={24} sm={8} md={8} lg={8} xl={8} style={{paddingLeft:"0"}}>
								<Button onClick={handleManageGroup} type="primary" className='__button mx-2' block >Manage Group</Button>
							</Col>
							<Col xs={24} sm={8} md={8} lg={8} xl={8} style={{paddingLeft:"0"}}>
								<Button onClick={handleManageComments} type="primary" className='__button mx-2 p-1' block>Manage Comments</Button>
							</Col> */}
						</Row>
					</div>
			</Flex>
            {/* <div ref={componentRefPrint}> */}
              {/* <PDFExport ref={componentRefPrint} paperSize="A4"> */}
              <Table
                  columns={columns}
                  rowKey={(record) => record.ID} // id
                  dataSource={data}
                  pagination={tableParams.pagination}
                  loading={loading}
                  onChange={handleTableChange}
                  exportableProps={{
                    showColumnPicker: true,
                    fileName: "Task_onboard_List",
                  }}
                  style={{ overflow: "auto" }}
                />
              {/* </PDFExport> */}
              
            {/* </div> */}
          </Card>
        </Col>
      </Row>
     
{/* all new */}



      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default DefaultDashboard;

//----------------------------------------------------------------TASK CARDS DYNAMIC
// const [items, setItems] = useState([])
//PUT INDISE THE USEEFFECT HOOK
// setItems(Object.keys(response.data.cards).map((key) => [key, response.data.cards[key]]))
// {
//   items.map((item) => {
//    const key = item[0];
//    const value = String(item[1].length);

//    {/* console.log("Key:",typeof key);
//    console.log("Value:", typeof value); */}

//    return (
//      <Col xs={24} sm={24} md={24} lg={24} xl={6} key={key}>
//        <StatisticWidget
//          title={key}
//          value={value}
//          // status={elm.status}
//          // subtitle={elm.subtitle}
//        />
//      </Col>
//    );
//  })
// }
