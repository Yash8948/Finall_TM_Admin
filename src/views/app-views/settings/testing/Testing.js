import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Input, Row, Col, Card, Collapse } from 'antd';
import { SearchOutlined, RightOutlined } from '@ant-design/icons';
import { faqCategories, faqList } from './TestingData';
import StatisticWidget from "../../../../components/shared-components/StatisticWidget";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import PropTypes from "prop-types";
import ApiSnippets from 'constants/ApiSnippet';
import { Table } from "ant-table-extensions";
const { Panel } = Collapse;

const Today_TaskColumn = [
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
    width: "10%",
  },
  {
    title: "Client Name",
    dataIndex: "client",
    sorter: (a, b) => a.id - b.id,
    width: "20%",
  },
  {
    title: "Message",
    dataIndex: "message",
    filterSearch: true,
    onFilter: (value, record) => record.address.startsWith(value),
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Date",
    dataIndex: "on_date",
    // render: (on_date) => new Date(on_date * 1000).toLocaleDateString("en-GB"),
    width: "20%",
  },
  {
    title: "Created On",
    dataIndex: "created_on",
  },
];
const Pending_TaskColumn = [
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
    width: "10%",
  },
  {
    title: "Task Name",
    dataIndex: "title",
    sorter: (a, b) => a.id - b.id,
    width: "20%",
  },
  {
    title: "Ticket ID",
    dataIndex: "ticket_id",
    filterSearch: true,
    onFilter: (value, record) => record.address.startsWith(value),
  },
  {
    title: "Client Name",
    dataIndex: "client_name",
  },
  {
    title: "Employee Name",
    dataIndex: "employee_name",
  },
  {
    title: "Dead Line Date",
    dataIndex: "cdeadline_date",
    // render: (on_date) => new Date(on_date * 1000).toLocaleDateString("en-GB"),
    width: "20%",
  },
  {
    title: "Status",
    dataIndex: "",
  },
  {
    title: "Action",
    dataIndex: "",
  },
];
const overDue_TaskColumn = [
  {
    title: "SrNo",
    dataIndex: "srno",
    defaultSortOrder: "ascend",
    // sorter:(a, b) => a.id - b.id,
    // render: (id, record, index) => {
    //   ++index;
    //   return index;
    // },
    width: "10%",
  },
  {
    title: "Task Name",
    dataIndex: "elm.title",
    sorter: (a, b) => a.id - b.id,
    width: "20%",
  },
  {
    title: "Ticket ID",
    dataIndex: "ticket_id",
    filterSearch: true,
    onFilter: (value, record) => record.address.startsWith(value),
  },
  {
    title: "Client Name",
    dataIndex: "client_name",
  },
  {
    title: "Employee Name",
    dataIndex: "employee_name",
  },
  {
    title: "Dead Line Date",
    dataIndex: "cdeadline_date",
    // render: (on_date) => new Date(on_date * 1000).toLocaleDateString("en-GB"),
    width: "20%",
  },
  {
    title: "Status",
    dataIndex: "cstatus",
  },
  {
    title: "Action",
    dataIndex: "",
  },
];



const Testing = ({ title, value, status, subtitle, prefix }) => {
  const [loading, setLoading] = useState(false);
  const [cards_data, setCards_data] = useState(false);
  const [cardsDataOnly, setCardsDataOnly] = useState([
    {
      key: "today_tasks",
      title: "Today Task's",
      value: "",
    },
    {
      key: "pending_tasks",
      title: "Pending Task's",
      value: "",
    },
    {
      key: "overdue_tasks",
      title: "Overdue Task",
      value: "",
    },
    {
      key: "tax_payable_tasks",
      title: "Tax Payable",
      value: "",
    },
    {
      key: "query_raised_tasks",
      title: "Query Raised",
      value: "",
    },
    {
      key: "on_board_tasks",
      title: "On Board",
      value: "",
    },
    {
      key: "un_assigned_tasks",
      title: "Un Assigned",
      value: "",
    },
    {
      key: "un_paid_tasks",
      title: "Un Paid Task",
      value: "",
    },
  ])
    const [curaentCategory, setCuraentCategory] = useState({
      curentCategory:'today_tasks'
    })
    const { curentCategory } = curaentCategory;

    
    

    useEffect( () => {
      // const GetCardsData = async () => {
      //   let response = await ApiSnippets("/AdminDashboard");
      //   var countObjData = await response.data.count;
      //   setCards_data(countObjData);
      //   console.log(countObjData);
      // };
      // GetCardsData();


      let myHeaders = new Headers();
      myHeaders.append("Xtoken", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImFkbWluIiwidG9rZW4iOiIkMmEkMTIkM3BoOGprdXJEb3QucmplMzVlUVBqT0suUkU4TnBzZ1Jyd2RvY0Z5VS5OUFdEXC9ydWtCWHgyIn0.qfaBZmPzzDEdiGEkI5OC_eUiXKF39W0Rhrsl4qVVfU4");

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      fetch("https://task.mysyva.net/backend/AdminDashboard", requestOptions)
        .then(response => response.json())
        .then(result => setCardsDataOnly([
            {
              // key: "today_tasks",
              key: "today_tasks",
              title: "Today Task's",
              value: `${result.data.count.tasks_count}`,
              columnName:{Today_TaskColumn},
              alldata:[{
                columnName:{Today_TaskColumn},
                data:result.data.card_data.tasks
              }]

            },
            {
              // key: "pending_tasks",
              key: "pending_tasks",
              title: "Pending Task's",
              value: `${result.data.count.pending_count}`,
              columnName:{Pending_TaskColumn},
              data:result.data.card_data.pending
            },
            {
              key: "overdue_tasks",
              title: "Overdue Task",
              value: `${result.data.count.total_overdue_task_count}`,
              columnName:{overDue_TaskColumn},
              data:result.data.card_data.total_overdue_task
            },
            {
              key: "tax_payable_tasks",
              title: "Tax Payable",
              value: `${result.data.count.tax_payable_count}`,
              columnName:{},
              data:result.data.card_data.tax_payable  
            },
            {
              key: "query_raised_tasks",
              title: "Query Raised",
              value: `${result.data.count.total_query_raised_count}`,
              columnName:{},
              data:result.data.card_data.total_query_raised  
            },
            {
              key: "on_board_tasks",
              title: "On Board",
              value: `${result.data.count.total_on_board_count}`,
              columnName:{},
              data:result.data.card_data.total_on_board
            },
            {
              key: "un_assigned_tasks",
              title: "Un Assigned",
              value: `${result.data.count.unassigned_task_count}`,
              columnName:{},
              data:result.data.card_data.unassigned_task
            },
            {
              key: "un_paid_tasks",
              title: "Un Paid Task",
              value: `${result.data.count.unpaid_task_board_count}`,
              columnName:{},
              data:result.data.card_data.unpaid_task_board
            },
          ])
        )
        .then(response => setCards_data(true))
        .catch(error => console.log('error', error));

      }, [])
      
      
      
      
      
      console.log("object");
      // console.log(cardsDataOnly[0].alldata[0].columnName);
      // console.log(cardsDataOnly[0].alldata[0].data);
      // console.log(cardsDataOnly[0].alldata[0].columnName);

// console.log(cardsDataOnly[1].data);
// // console.log(cardsDataOnly[4]);
// console.log(faqList);
    
  return (
    <>
    {/* <PageHeaderAlt className="bg-primary" overlap>
      <div className="container text-center">
        <div className="py-lg-4">
          <h1 className="text-white display-4">Search for Solution</h1>
          <Row type="flex" justify="center">
            <Col xs={24} sm={24} md={12}>
              <p className="text-white w-75 text-center mt-2 mb-4 mx-auto">
                Look at these words. Are they small words? And he referred to my words - if they're small, something else must be small..
              </p>
            </Col>
          </Row>
          <Row type="flex" justify="center" className="mb-5">
            <Col xs={24} sm={24} md={12}>
              <Input placeholder="Search" prefix={<SearchOutlined type="search" />}/>
            </Col>
          </Row>
        </div>
      </div>
    </PageHeaderAlt> */}
    <div className="container my-4" >
      <Row gutter={16}>
        {cardsDataOnly.map((elm,index) => (
          <Col xs={24} sm={24} md={6} key={index}>
          <Card hoverable  onClick={() => {setCuraentCategory({curentCategory: elm.key})}}>
          {/* <Card hoverable  onClick={() => console.log(elm.key)}> */}
            {/* {title && <h4 className="mb-0">{title}</h4>} */}
            <h4 className="mb-0">{cardsDataOnly[index].title}</h4>
            <div  className={`${prefix? 'd-flex': ''} ${title ? 'mt-3':''}`}>
              {prefix ? <div className="mr-2">{prefix}</div> : null}
              <div>
                <div className="d-flex align-items-center">
                  {/* <h1 className="mb-0 font-weight-bold">{value}</h1> */}
                  <h1 className="mb-0 font-weight-bold">{cardsDataOnly[index].value}</h1>
                  {
                    status ? 
                    <span className={`font-size-md font-weight-bold ml-3 ${status !== 0 && status > 0 ? 'text-success' : 'text-danger'}`} >
                      {status}
                      {status !== 0 && status > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    </span> 
                    : 
                    null
                  }
                </div>
                {subtitle && <div className="text-gray-light mt-1">{subtitle}</div>}
              </div>
            </div>
          </Card>
            {/* <Card hoverable 
              onClick={() => {setCuraentCategory({curentCategory: elm.key})}}>
              <div className="text-center">
                <img className="img-fluid" src={elm.image} alt={elm.title} />
                <h3 className="mt-4">{elm.title}</h3>
              </div>
            </Card> */}
          </Col>
        ))}
      </Row>
      <Card className="mt-4">
        {/* <Collapse 
          accordion 
          defaultActiveKey={'faq-1-1'} 
          bordered={false}
          expandIcon={({ isActive }) => <RightOutlined className="text-primary" type="right" rotate={isActive ? 90 : 0} />}
        >
          {faqList.filter( elm => elm.id === curentCategory)[0].data.map( elm => (
            <Panel header={elm.title} key={elm.key}>
              <p>{elm.desc}</p>
            </Panel>
          ))}
        </Collapse> */}
        
          {/* <p key={index}>{elm.data.title}</p> */}
        {cards_data && cardsDataOnly.filter( elm => elm.key === curentCategory)[0].alldata.map( (elm,index) => (
          <Table
            key={index}
            // rowSelection={rowSelection}
            // columns={elm[0].columnName}
            // rowKey={(record) => record.id} // id
            // dataSource={elm[0].data}
            // pagination={tableParams.pagination}
            loading={loading}
            // onChange={handleTableChange}
            // searchable={{fuzzySearch:true}}
            // exportable={}
            exportableProps={{
              showColumnPicker: true,
              fileName: "Task_List",
            }}
            // searchableProps={{ fuzzySearch: true }}
            style={{ overflow: "auto" }}
          />
        ))}



        
            


      </Card>
    </div>
  </>
  )
}





Testing.propTypes = {
  title: PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.element
]),
value: PropTypes.string,
subtitle: PropTypes.string,
status: PropTypes.number,
prefix: PropTypes.element
};

Testing.defaultProps = {
  title: 'Default Title',
  value: '$2,454',
  subtitle: '',
  status: 0,
  prefix: null
};

export default Testing;

