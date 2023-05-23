import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Button, Avatar, Dropdown, Table, Menu, Tag } from 'antd';
import StatisticWidget from 'components/shared-components/StatisticWidget';
import ChartWidget from 'components/shared-components/ChartWidget';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import GoalWidget from 'components/shared-components/GoalWidget';
import Card from 'components/shared-components/Card';
import Flex from 'components/shared-components/Flex';
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
import { forEach, forEachRight, forIn } from "lodash";
import ColumnGroup from "antd/es/table/ColumnGroup";


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
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
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

export const DefaultDashboard = () => {
  const [visitorChartData] = useState(VisitorChartData);
  // const [annualStatisticData] = useState(AnnualStatisticData);
  const [activeMembersData] = useState(ActiveMembersData);
  const [newMembersData] = useState(NewMembersData)
  const [recentTransactionData] = useState(RecentTransactionData)
  const { direction } = useSelector(state => state.theme)
  const [items, setItems] = useState([])
// //api
// const fetchData = () => {
//   const token= localStorage.getItem(AUTH_TOKEN)
//   console.log(token);
//   const axios = require('axios');

// let config = {
//   method: 'post',
//   // maxBodyLength: Infinity,
//   url: 'https://task.mysyva.net/backend/AdminDashboard',
//   headers: { 
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Headers': '*',
//     'Xtoken': token, 
//     // 'Cookie': 'ci_session=c781d491f918d88ff3bfaae9a0c14f87'
//   },
//   // data : JSON.stringify(data)
// };

// axios.request(config)
// .then((response) => {
//   // console.log(JSON.stringify(response.data));
//   console.log(response.data);

// })
// .catch((error) => {
//   console.log(error);
// });

// }
// useEffect(() => {
//   fetchData()
// }, [])


var cards = [];
useEffect(() => {
  const getAllData = async () => {
    var response = await ApiSnippets("/AdminDashboard", null);
    cards=response.data.cards
    // console.log("object");
    // console.log(cards);
    setItems(Object.keys(cards).map((key) => [key, cards[key]]))



    //  statisticWidgets = Object.keys(cards_title).map((key, index) => {
    //   let item = cards_title[key];
    //   console.log("Key:", key);
    //   console.log("Value:", item);
    
    //   return (
    //     <Col xs={24} sm={24} md={24} lg={24} xl={8} key={index}>
    //       <StatisticWidget
    //         title={item}
    //         // value={elm.value}
    //         // status={elm.status}
    //         // subtitle={elm.subtitle}
    //       />
    //     </Col>
    //   );
    // });
    
    // return (
    //   <div>
    //     {statisticWidgets}
    //   </div>
    // );
    




  }
  getAllData()
}, []);


  return (
    <>
      <Row gutter={4} >
        {/* <Col xs={24} sm={24} md={24} lg={18}> */}
          <Row gutter={16}>
            {
               items.map((item) => {
                const key = item[0];
                const value = String(item[1].length);

                {/* console.log("Key:", typeof key);
                console.log("Value:", typeof value); */}

                return (
                  <Col xs={24} sm={24} md={24} lg={24} xl={8} key={key}>
                    <StatisticWidget
                      title={key}
                      value={value}
                      // status={elm.status}
                      // subtitle={elm.subtitle}
                    />
                  </Col>
                );
              })
            } 
          </Row>
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
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={7}>
          <Card title="New Join Member" extra={<CardDropdown items={newJoinMemberOptions} />}>
            <div className="mt-3">
              {
                newMembersData.map((elm, i) => (
                  <div key={i} className={`d-flex align-items-center justify-content-between mb-4`}>
                    <AvatarStatus id={i} src={elm.img} name={elm.name} subTitle={elm.title} />
                    <div>
                      <Button icon={<UserAddOutlined />} type="default" size="small">Add</Button>
                    </div>
                  </div>
                ))
              }
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={17}>
          <Card title="Latest Transactions" extra={<CardDropdown items={latestTransactionOption} />}>
            <Table
              className="no-border-last"
              columns={tableColumns}
              dataSource={recentTransactionData}
              rowKey='id'
              style={{ overflow: 'auto'}}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}


export default DefaultDashboard;
