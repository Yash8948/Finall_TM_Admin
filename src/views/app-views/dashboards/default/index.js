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
import { useReactToPrint } from "react-to-print";

import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

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
} from "./DefaultDashboardData";
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
import ApiSnippets from "../../../../constants/ApiSnippet";
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
  const exportBtnRef = useRef();
  const [tLsearchalue, setTLsearchalue] = useState(null);
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
  // const fetchDataold = () => {
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
  const fetchData = async (value) => {
    var offset = 0;
    
    setLoading(true);
    if (tableParams.pagination.current > 1) {
      offset =
        (tableParams.pagination.current - 1) * tableParams.pagination.pageSize;
    }
    let ApiData = {
      limit: tableParams.pagination.pageSize,
      offset: offset,
      search: value && value,
    };
    console.log(value);
    let response = await ApiSnippets("/ClientLogData_Dashboard", ApiData);
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

  const reactToPrintContent = useCallback(() => {
    return componentRefPrint.current;
  }, [componentRefPrint.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "AwesomeFileName",
  });
  //pdf
  const exportPDFWithMethod = () => {
    let element = document.querySelector(".k-grid") || document.body;
    savePDF(element, {
      paperSize: "A4",
    });
  };
  const exportPDFWithComponent = () => {
    if (componentRefPrint.current) {
      componentRefPrint.current.save();
    }
  };
  //export csv
  const handleExport = () => {
    console.log(exportBtnRef.current);
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
        <Flex alignItems="center" gap={SPACER[2]} onClick={handlePrint}>
          <PrinterOutlined />
          <span className="ml-2">Print</span>
        </Flex>
      ),
    },
    {
      key: "Export",
      label: (
        <Flex alignItems="center" gap={SPACER[2]} onClick={handleExport}>
          <FileExcelOutlined />
          <span className="ml-2">Export</span>
        </Flex>
      ),
    },
    {
      key: "pdf",
      label: (
        <Flex alignItems="center" gap={SPACER[2]} onClick={exportPDFWithMethod}>
          <FileExcelOutlined />
          <span className="ml-2">PDFmethod</span>
        </Flex>
      ),
    },
    {
      key: "pdf",
      label: (
        <Flex
          alignItems="center"
          gap={SPACER[2]}
          onClick={exportPDFWithComponent}
        >
          <FileExcelOutlined />
          <span className="ml-2">PDFcomponent</span>
        </Flex>
      ),
    },
  ];

  useEffect(() => {
    let value = tLsearchalue;
    fetchData(value);
    console.log("in useeffect");
    console.log(tLsearchalue);
    console.log(JSON.stringify(tableParams));
  }, [JSON.stringify(tableParams)]);
  // console.log("bare useeffect");
  // console.log(JSON.stringify(tableParams));
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
    console.log(`selected ${value}`);
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

  useEffect(() => {
    const getAllData = async () => {
      let response = await ApiSnippets("/AdminDashboard", null);
      let countObj = await response.data;
      setCardCounts(countObj);
      let onlyClientData = await response.data.client;
      setClientName(onlyClientData);
    };

    getAllData();
  }, []);
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
        key: "odd",
        text: "Select Odd Row",
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
        key: "even",
        text: "Select Even Row",
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
  const [form] = Form.useForm();
  const handleAddClient = async (value, id) => {
    // console.log(value);
    let ApiData = {
      client: value.client,
      message: value.message,
      description: value.description,
      date: value["date"].format("DD-MM-YYYY"), //Add your required date format here
      // date: value["date"].format("YYYY-MM-DD HH:mm:ss")  //Add your required date format here
    };
    let response = await ApiSnippets("/AddClientLog", ApiData);
    // let countObj = await response;
    fetchData();
    console.log(ApiData);
    setLoading(true);
    setTimeout(() => {
      form.resetFields();
    }, 500);
    setLoading(false);
  };

  const hanldeSearch_tasklist = (value, event) => {
    setTLsearchalue(value);
    const fetchDataOnSearch = async (value) => {
      var offset = 0;
      setLoading(true);
      if (tableParams.pagination.current > 1) {
        offset =
          (tableParams.pagination.current - 1) *
          tableParams.pagination.pageSize;
      }
      let ApiData = {
        limit: tableParams.pagination.pageSize,
        offset: offset,
        search: value,
      };
      let response = await ApiSnippets("/ClientLogData_Dashboard", ApiData);
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
    fetchDataOnSearch(value);
    // console.log(typeofvalue);
  };

  // console.log(cardCounts.client);
  return (
    <>
      <Row gutter={4}>
        {/* <Col xs={24} sm={24} md={24} lg={18}> */}
        {/* uncomment */}
        {/* <Row gutter={16}>
          { cardCounts && (
            <>
          <Col xs={24} sm={24} md={24} lg={24} xl={6} >
          <StatisticWidget
            title="Today Task's"
            value={cardCounts.tasks_count === null ? '0' : String(cardCounts.count.tasks_count)}
            // status={elm.status}
            // subtitle={elm.subtitle}
           
          />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={6}>
          <StatisticWidget
            
            title="Pending Task's"
            value={cardCounts.count.pending_count === null ? '0' : String(cardCounts.count.pending_count)}
          />
          </Col> 
          <Col xs={24} sm={24} md={24} lg={24} xl={6}>
          <StatisticWidget
            
            title="Overdue Task"
            value={cardCounts.count.total_overdue_task_count === null ? '0' : String(cardCounts.count.total_overdue_task_count)}
          />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={6}>
          <StatisticWidget
            
            title="Tax Payable"
            value={cardCounts.count.tax_payable_count === null ? '0' : String(cardCounts.count.tax_payable_count)}
          />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={6}>
          <StatisticWidget
            title="Query Raised"
            value={cardCounts.count.total_query_raised_count === null ? '0' : String(cardCounts.count.total_query_raised_count)}
          />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={6}>
          <StatisticWidget
            title="On Board"
            value={cardCounts.count.total_on_board_count === null ? '0' : String(cardCounts.count.total_on_board_count)}
          />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={6}>

          <StatisticWidget
            title="Un Assigned"
             value={cardCounts.count.unassigned_task_count === null ? '0' : String(cardCounts.count.unassigned_task_count)}
          />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={6}>
          <StatisticWidget
            title="Un Paid Task"
             value={cardCounts.count.unpaid_task_board_count === null ? '0' : String(cardCounts.count.unpaid_task_board_count)}
          />
          </Col>
          </>
)}
          </Row> */}
      </Row>

      {/* table task lists starts*/}
      {/* uncomment */}
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card
            title="Task List"
            extra={
              <>
                {/* <div className="example"> */}
                <Input.Search
                  allowClear
                  className="mx-3"
                  onSearch={hanldeSearch_tasklist}
                />
                {/* </div> */}
                <CardDropdown items={latestTransactionOption} />
              </>
            }
          >
            <div ref={componentRefPrint}>
              <PDFExport ref={componentRefPrint} paperSize="A4">
                {/* <Document>
          <Page size="A4" style={styles.page}>
          <View style={styles.section}> */}
                <Table
                  //  rowSelection={rowSelection}
                  columns={columns}
                  rowKey={(record) => record.id} // id
                  dataSource={data}
                  pagination={tableParams.pagination}
                  loading={loading}
                  onChange={handleTableChange}
                  // searchable={{fuzzySearch:true}}
                  // exportable={}
                  exportableProps={{
                    showColumnPicker: true,
                    fileName: "Task_List",
                  }}
                  // searchableProps={{ fuzzySearch: true }}
                  style={{ overflow: "auto" }}
                />
              </PDFExport>
              {/* </View>
          </Page>
          </Document> */}
            </div>
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
          {/* uncomment */}
          {/* <Card
            title="Add Log"
            extra={<CardDropdown items={newJoinMemberOptions} />}
          >
            <div className="mt-3">
            <Spin spinning={loading} >
              <Form layout="vertical" onFinish={handleAddClient} form={form} >
                <div style={{ marginBottom: 16 }}>
                
                <Form.Item label="Client : " name="client" rules={[{ required: true, message: 'Please select your client!' }]}>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Select a Client"
                    optionFilterProp="children"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {clientName &&
                      clientName.map((item, index) => (
                        <Option key={index} id={item.ID} value={item.ID}>
                          {item.username}
                        </Option>
                      ))}
                  </Select>
                  </Form.Item>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <Form.Item label="User : " name="message" rules={[{ required: true, message: 'Please input your message!' }]}>
                    <Input placeholder="Enter Message" />
                  </Form.Item>
                </div>
                <div style={{ marginBottom: 16 }}>
                <Form.Item label="Description : "  name="description" rules={[{ required: true, message: 'Please input your description!' }]}>
                  <TextArea rows={4} placeholder="Enter Description" />
                </Form.Item>
                </div>
                <div style={{ marginBottom: 16 }}>
                <Form.Item label="Date : " name="date" rules={[{ required: true, message: 'Please input your date!' }]}  >
                  <DatePicker
                    // defaultValue={dayjs()}
                    format={dateFormatList}
                    disabledDate={disabledDate}
                    onChange={handleDatePicker}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                </div>
                <div style={{ marginBottom: 16 }}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                    Submit
                  </Button>
                </Form.Item>
                </div>
              </Form>
              </Spin>
            </div>
          </Card> */}
        </Col>
        {/* uncommet */}
        {/* <Col xs={24} sm={24} md={24} lg={17}>
          <Card
            title="Client Log Data"
            extra={
              <div style={{ width: "100%" }}>
                <Select
                  className="mx-2"
                  showSearch={true}
                  style={{ width: "70%" }}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  allowClear={true}
                >
                  {clientName &&
                    clientName.map((item, index) => (
                      <Option key={index} value={String(item.username)}>
                        {item.username}
                      </Option>
                    ))}
                </Select>
                <CardDropdown items={latestTransactionOption} />
              </div>
            }
          >
            <Input.Search
              placeholder="Search Here..."
              className="my-2"
              onChange={(e) => {
                const currValue = e.target.value;
                setValue(currValue);
                const filteredData = data.filter((entry) =>
                  entry.name.includes(currValue)
                );
                setData(filteredData);
              }}
            />
            <Table
              rowSelection={rowSelection}
              columns={columns}
              rowKey={(record) => record.id}
              dataSource={data}
              pagination={tableParams.pagination}
              loading={loading}
              onChange={handleTableChange}
              searchable={{fuzzySearch:true}}
              exportableProps={{ showColumnPicker: true, fileName:"client_log"}}
              searchableProps={{ fuzzySearch: true }}
              style={{ overflow: "auto" }}
            />
          </Card>
        </Col> */}
      </Row>
      {/* <Table
              className="no-border-last"
              columns={tableColumns}
              dataSource={recentTransactionData}
              rowKey='id'
              style={{ overflow: 'auto'}}
              pagination={false}
            /> */}
      {/* table birthday lists starts*/}
      {/* uncomment */}
      {/* <Row gutter={16}>
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
          </Row> */}
      {/* table birthday lists ends*/}
      {/* table holiday lists starts*/}
      {/* uncomment */}
      {/* <Row gutter={16}>
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
          </Row> */}
      {/* table birthday lists ends*/}
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
