import React, { useState, useEffect } from "react";
import { Row, Col, Button, Avatar, Dropdown, Table, Menu, Tag, Select, Input, DatePicker, Divider  } from 'antd';
import dayjs from 'dayjs';

import StatisticWidget from 'components/shared-components/StatisticWidget';
import ChartWidget from 'components/shared-components/ChartWidget';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import GoalWidget from 'components/shared-components/GoalWidget';
import Card from 'components/shared-components/Card';
import Flex from 'components/shared-components/Flex';
//datatable imports
// import { Table } from 'antd';
import qs from 'qs';

import {
  VisitorChartData,
  AnnualStatisticData,
  ActiveMembersData,
  NewMembersData,
  RecentTransactionData
} from './DefaultDashboardData';
import ApexChart from 'react-apexcharts';
import { apexLineChartDefaultOption, COLOR_2 } from 'constants/ChartConstant';
import { SPACER } from 'constants/ThemeConstant'
import {
  UserAddOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  PlusOutlined,
  EllipsisOutlined,
  StopOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import utils from 'utils';
import { useSelector } from 'react-redux';
import { AUTH_TOKEN } from "constants/AuthConstant";
import { admin_Dashboard } from "services/AllDataService";
// import { Admin_Dashboard } from '../../../../services/AllDataService'
import ApiSnippets from '../../../../constants/ApiSnippet'

const { Option } = Select;
const { TextArea } = Input;
const dateFormatList = ['DD/MM/YYYY'];



const MembersChart = props => (
  <ApexChart {...props} />
)

const memberChartOption = {
  ...apexLineChartDefaultOption,
  ...{
    chart: {
      sparkline: {
        enabled: true,
      }
    },
    colors: [COLOR_2],
  }
}

const latestTransactionOption = [
  {
    key: 'Refresh',
    label: (
      <Flex alignItems="center" gap={SPACER[2]}>
        <ReloadOutlined />
        <span className="ml-2">Refresh</span>
      </Flex>
    ),
  },
  {
    key: 'Print',
    label: (
      <Flex alignItems="center" gap={SPACER[2]}>
        <PrinterOutlined />
        <span className="ml-2">Print</span>
      </Flex>
    ),
  },
  {
    key: 'Export',
    label: (
      <Flex alignItems="center" gap={SPACER[2]}>
        <FileExcelOutlined />
        <span className="ml-2">Export</span>
      </Flex>
    ),
  },
]

const newJoinMemberOptions = [
  {
    key: 'Add all',
    label: (
      <Flex alignItems="center" gap={SPACER[2]}>
        <PlusOutlined />
        <span className="ml-2">Add all</span>
      </Flex>
    ),
  },
  {
    key: 'Disable all',
    label: (
      <Flex alignItems="center" gap={SPACER[2]}>
        <StopOutlined />
        <span className="ml-2">Disable all</span>
      </Flex>
    ),
  },
]

const CardDropdown = ({ items }) => {

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight" arrow={{pointAtCenter: true,}}>
      <a href="/#" className="text-gray font-size-lg" onClick={e => e.preventDefault()}>
        <EllipsisOutlined />
      </a>
    </Dropdown>
  )
}

const tableColumns = [
  {
    title: 'Customer',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <div className="d-flex align-items-center">
        <Avatar size={30} className="font-size-sm" style={{ backgroundColor: record.avatarColor }}>
          {utils.getNameInitial(text)}
        </Avatar>
        <span className="ml-2">{text}</span>
      </div>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: () => <div className="text-right">Status</div>,
    key: 'status',
    render: (_, record) => (
      <div className="text-right">
        <Tag className="mr-0" color={record.status === 'Approved' ? 'cyan' : record.status === 'Pending' ? 'blue' : 'volcano'}>{record.status}</Tag>
      </div>
    ),
  },
];


// TABLE task list
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      {
        text: 'Male',
        value: 'male',
      },
      {
        text: 'Female',
        value: 'female',
      },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
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
  const [newMembersData] = useState(NewMembersData)
  const [recentTransactionData] = useState(RecentTransactionData)
  const { direction } = useSelector(state => state.theme)
  const [cardCounts, setCardCounts] = useState(null)
  //table task list
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const fetchData = () => {
    setLoading(true);
    fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const { Option } = Select;

  function onChange(value) {
    console.log(`selected ${value}`);
  }
  
  function onBlur() {
    console.log('blur');
  }
  
  function onFocus() {
    console.log('focus');
  }
  
  function onSearch(val) {
    console.log('search:', val);
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < dayjs().startOf('day');
  }
  
  










useEffect(() => {
  const getAllData = async () => {
    let response = await ApiSnippets("/AdminDashboard", null);
    let countObj = await response.data.count
    setCardCounts(countObj)
  }
  getAllData()
}, []);
const [selectedRowKeys, setSelectedRowKeys] = useState([]);
const onSelectChange = (newSelectedRowKeys) => {
  // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
  setSelectedRowKeys(newSelectedRowKeys);
};
//task list table selected drop down
const rowSelection = {
  selectedRowKeys,
  onChange: onSelectChange,
  selections: [
    Table.SELECTION_ALL,
    Table.SELECTION_INVERT,
    Table.SELECTION_NONE,
    {
      key: 'odd',
      text: 'Select Odd Row',
      onSelect: (changeableRowKeys) => {
        let newSelectedRowKeys = [];
        newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
          if (index % 2 !== 0) {
            return false;
          }
          return true;
        });
        setSelectedRowKeys(newSelectedRowKeys);
      },
    },
    {
      key: 'even',
      text: 'Select Even Row',
      onSelect: (changeableRowKeys) => {
        let newSelectedRowKeys = [];
        newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
          if (index % 2 !== 0) {
            return true;
          }
          return false;
        });
        setSelectedRowKeys(newSelectedRowKeys);
      },
    },
  ],
};



  return (
    <>
      <Row gutter={4} >
        {/* <Col xs={24} sm={24} md={24} lg={18}> */}
        
          <Row gutter={16}>
          { cardCounts && (
            <>
          <Col xs={24} sm={24} md={24} lg={24} xl={6} >
          <StatisticWidget

            onClick={() => console.log("working")}
            title="Today Task's"
            value={cardCounts.tasks_count === null ? '0' : String(cardCounts.tasks_count)}
            // status={elm.status}
            // subtitle={elm.subtitle}
           
          />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={6}>
          <StatisticWidget
            title="Pending Task's"
            value={cardCounts.pending_count === null ? '0' : String(cardCounts.pending_count)}
          />
          </Col> 
          <Col xs={24} sm={24} md={24} lg={24} xl={6}>
          <StatisticWidget
            title="Overdue Task"
              value={cardCounts.total_overdue_task_count === null ? '0' : String(cardCounts.total_overdue_task_count)}
          />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={6}>
          <StatisticWidget
            title="Tax Payable"
              value={cardCounts.tax_payable_count === null ? '0' : String(cardCounts.tax_payable_count)}
          />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={6}>
          <StatisticWidget
            title="Query Raised"
              value={cardCounts.total_query_raised_count === null ? '0' : String(cardCounts.total_query_raised_count)}
          />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={6}>
          <StatisticWidget
            title="On Board"
              value={cardCounts.total_on_board_count === null ? '0' : String(cardCounts.total_on_board_count)}
          />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={6}>
          <StatisticWidget
            title="Un Assigned"
             value={cardCounts.unassigned_task_count === null ? '0' : String(cardCounts.unassigned_task_count)}
          />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={6}>
          <StatisticWidget
            title="Un Paid Task"
             value={cardCounts.unpaid_task_board_count === null ? '0' : String(cardCounts.unpaid_task_board_count)}
          />
          </Col>
          </>
)}
          </Row>
          </Row>

          {/* table task lists starts*/}
          <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card title="Task List" extra={<CardDropdown items={latestTransactionOption} />}>

          <Table
           rowSelection={rowSelection}
            columns={columns}
            rowKey={(record) => record.login.uuid}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
            style={{ overflow: 'auto'}}
          />
          </Card>
          </Col>
          </Row>
          {/* table task lists ends*/}
          {/* <Row gutter={16}>
            <Col span={24}>
                <ChartWidget 
                  title="Unique Visitors" 
                  series={visitorChartData.series} 
                  xAxis={visitorChartData.categories} 
                  height={'400px'}
                  direction={direction}
                />
            </Col>
          </Row> */}
        {/* </Col> */}
        {/* <Col xs={24} sm={24} md={24} lg={6}>
          <GoalWidget
            title="Monthly Target"
            value={87}
            subtitle="You need abit more effort to hit monthly target"
            extra={<Button type="primary">Learn More</Button>}
          />
          <StatisticWidget 
            title={
              <MembersChart 
                options={memberChartOption}
                series={activeMembersData}
                height={145}
              />
            }
            value='17,329'
            status={3.7}
            subtitle="Active members"
          />
        </Col> */}
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={7}>
          <Card title="Add Log" extra={<CardDropdown items={newJoinMemberOptions} />}>
            <div className="mt-3">
            <div style={{ marginBottom: 16 }}>

            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <Input placeholder="Basic usage" />
            </div>
            <div style={{ marginBottom: 16 }}>
            <TextArea rows={4} />
            </div>
            <div style={{ marginBottom: 16 }}>
            <DatePicker defaultValue={dayjs('01/01/2015', dateFormatList[0])} format={dateFormatList} 
            disabledDate={disabledDate}
             style={{ width: '100%' }}/>
            </div>
            <div style={{ marginBottom: 16 }}>
            <Button type="primary" style={{ width: '100%' }}>Submit</Button>
            </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={17}>
          <Card title="Client Log Data" extra={
            <div style={{width:"100%"}}>
          <Select
              className="mx-2"
              // showSearch={true}
              // style={{ width: '70%',  }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear={true}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>   
            <CardDropdown items={latestTransactionOption} />
            </div>
          }>
            <Input.Search placeholder="Search Here..." className="my-2" />
           <Table
           rowSelection={rowSelection}
            columns={columns}
            rowKey={(record) => record.login.uuid}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
            style={{ overflow: 'auto'}}
          />
            {/* <Table
              className="no-border-last"
              columns={tableColumns}
              dataSource={recentTransactionData}
              rowKey='id'
              style={{ overflow: 'auto'}}
              pagination={false}
            /> */}
          </Card>
        </Col>
      </Row>
       {/* table birthday lists starts*/}
       <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card title="Birthday List" extra={<CardDropdown items={latestTransactionOption} />}>

          <Table
           rowSelection={rowSelection}
            columns={columns}
            // rowKey={(record) => record.login.uuid}
            dataSource={data}
            // pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
            style={{ overflow: 'auto'}}
          />
          </Card>
          
          </Col>
          </Row>
          {/* table birthday lists ends*/}
       {/* table holiday lists starts*/}
       <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card title="Holiday List" extra={<CardDropdown items={latestTransactionOption} />}>

          <Table
           rowSelection={rowSelection}
            columns={columns}
            // rowKey={(record) => record.login.uuid}
            dataSource={data}
            // pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
            style={{ overflow: 'auto'}}
          />
          </Card>
          
          </Col>
          </Row>
          {/* table birthday lists ends*/}
    </>
  )
}


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