import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Row,
  Col,
  Button,
  Avatar,
  Dropdown,
  Tag,
  Select,
  Input,
  DatePicker,
  Divider,
  Form,
  Spin,
} from "antd";
import { useReactToPrint } from "react-to-print";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import Card from "components/shared-components/Card";
import Flex from "components/shared-components/Flex";
//datatable imports
// import { Table } from 'antd';
import { Table } from "ant-table-extensions";
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

// import { Admin_Dashboard } from '../../../../services/AllDataService'
import ApiSnippets from "../../../../constants/ApiSnippet";



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
//     width: "20%",
//   },
//   {
//     title: "Client Name",
//     dataIndex: "client",
//     sorter: (a, b) => a.id - b.id,
//     width: "20%",
//   },
//   {
//     title: "Message",
//     dataIndex: "message",
//     filterSearch: true,
//     onFilter: (value, record) => record.address.startsWith(value),
//   },
//   {
//     title: "Description",
//     dataIndex: "description",
//   },
//   {
//     title: "Date",
//     dataIndex: "on_date",
//     // render: (on_date) => new Date(on_date * 1000).toLocaleDateString("en-GB"),
//     width: "20%",
//   },
//   {
//     title: "Created On",
//     dataIndex: "created_on",
//   },
// ];
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
    title: "User Name",
    dataIndex: "username",
    sorter: (a, b) => a.id - b.id,
    width: "20%",
  },
  {
    title: "First Name",
    dataIndex: "first_name",
    sorter: (a, b) => a.id - b.id,
    width: "20%",
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    sorter: (a, b) => a.id - b.id,
    width: "20%",
  },
  {
    title: "Email ID",
    dataIndex: "email",
    filterSearch: true,
  //   onFilter: (value, record) => record.address.startsWith(value),
  },
  {
    title: "Status",
    dataIndex: "active",
  },
  {
    title: "Action",
    dataIndex: "",
    // render: (on_date) => new Date(on_date * 1000).toLocaleDateString("en-GB"),
    width: "20%",
  },
  ];


export const SMSConfig = () => {
  const componentRefPrint = useRef(null);
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
 
  //client log table api
  const fetchData = async (value) => {
    var offset = 0;

    setLoading(true);
    if (tableParams.pagination.current > 1) {
      offset =
        (tableParams.pagination.current - 1) * tableParams.pagination.pageSize;
    }
    let ApiData = {
      type:1,
      limit: tableParams.pagination.pageSize,
      offset: offset,
      search: value ? value: "",
    };
    console.log(ApiData);
    let response = await ApiSnippets("/GetUsers", ApiData);
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
    // setClientTableData(countObj);
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
  
  //export csv
  const handleExport = () => {
    // console.log(exportBtnRef.current);
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
  ];

  useEffect(() => {
    let value = tLsearchalue;
    fetchData(value);
    // console.log("in useeffect");
    // console.log(tLsearchalue);
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
      // setClientTableData(countObj);
      // console.log(srno_array);
      // console.log(response.count);
      setData(response.data);
      console.log(data);
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
  };

  return (
    <>
      

      {/* table task lists starts*/}

      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card
            title="Task List"

            
          >
          <Flex alignItems="center" className=" mb-3 __card" justifyContent="space-between" mobileFlex={false} >	
				{/* <Flex className="mb-1" mobileFlex={false}> */}
					<div className="mr-md-3 __div_search_box " style={{justifyContent:"start"}} >
						{/* <Input className='__searchbox' placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} /> */}
						<Input.Search allowClear className="__searchbox" onSearch={hanldeSearch_tasklist} style={{width:"100%"}}/>
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
								<Button onClick="" type="primary" className='__button mx-2' style={{whiteSpace:"normal"}} block >Add New Employee</Button>
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
              <PDFExport ref={componentRefPrint} paperSize="A4">
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
              
            {/* </div> */}
          </Card>
        </Col>
      </Row>
     
    </>
  );
};

export default SMSConfig;
