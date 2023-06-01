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
} from "antd";
import dayjs from "dayjs";
// import moment from "moment";
import { useReactToPrint } from "react-to-print";


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
    width: "20%",
  },
  {
    title: "Task Name",
    dataIndex: "title",
    sorter: (a, b) => a.id - b.id,
    width: "20%",
  },
  {
    title: "Ticket Id",
    dataIndex: "unique_id",
    width: "20%",
    // filterSearch: true,
    // onFilter: (value, record) => record.address.startsWith(value),
  },
  {
    title: "Client Name",
    dataIndex: "client_name",
    width: "20%",
  },
  {
    title: "Employee Name",
    dataIndex: "",
    // render: (on_date) => new Date(on_date * 1000).toLocaleDateString("en-GB"),
    width: "20%",
  },
  {
    title: "Department ",
    dataIndex: "department_name",
    width: "20%",
  },
  {
    title: "Starting Date",
    dataIndex: "starting_date",
    // render: (on_date) => new Date(on_date * 1000).toLocaleDateString("en-GB"),
    width: "20%",
  },
  {
    title: "Closing Date",
    dataIndex: "deadline_date",
    // render: (on_date) => new Date(on_date * 1000).toLocaleDateString("en-GB"),
    width: "20%",
  },
  {
    title: "Status",
    dataIndex: "statusname",
    width: "20%",
  },
  {
    title: "Action",
    dataIndex: "",
     width: "20%",
  },
];
const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});



export const DefaultDashboard = () => {
  const [visitorChartData] = useState(VisitorChartData);
  // const [annualStatisticData] = useState(AnnualStatisticData);
  const [activeMembersData] = useState(ActiveMembersData);
  const [newMembersData] = useState(NewMembersData);
  const [recentTransactionData] = useState(RecentTransactionData);
  const { direction } = useSelector((state) => state.theme);
  const [cardCounts, setCardCounts] = useState(null);
  const [clientTableData, setClientTableData] = useState(null);
  const [clientName, setClientName] = useState(null);
  const componentRefPrint = useRef(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  //table task list
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [value, setValue] = useState("");
  // const fetchData = () => {
  //   setLoading(true);
  //   fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
  //     .then((res) => res.json())
  //     .then(({ results }) => {
  //       setData(results);
  //       setLoading(false);
  //       setTableParams({
  //         ...tableParams,
  //         pagination: {
  //           ...tableParams.pagination,
  //           total: 100,
  //           // 200 is mock data, you should read it from server
  //           // total: data.totalCount,
  //         },
  //       });
  //     });
  //     console.log(data);
  // };
  //client log table api
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
    // 



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


  const reactToPrintContent = useCallback(() => {
    return componentRefPrint.current;
  }, [componentRefPrint.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "AwesomeFileName",

  });



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
        <Flex alignItems="center" gap={SPACER[2]} onClick={handlePrint}>
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


      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card title="Task On Board">
            <div ref={componentRefPrint}>

              <Table
                //  rowSelection={rowSelection}
                columns={columns}
                rowKey={(record) => record.id}// id
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                // searchable={{fuzzySearch:true}}
                // exportableProps={{ showColumnPicker: true, fileName: "Task_List" }}
                // searchableProps={{ fuzzySearch: true }}
                style={{ overflow: 'auto' }}
              />
            </div>
          </Card>
        </Col>
      </Row>
     
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
