import React, { useState, useEffect } from "react";
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
import ApiSnippets from "../../../../../constants/ApiSnippet";



const BirthdayTableColumns = [
  {
    title: "SrNo",
    dataIndex: "srno",
    defaultSortOrder: "ascend",
    // sorter:(a, b) => a.id - b.id,
    width: "20%",
  },
  // {
  //   title: "User",
  //   dataIndex: "user_name",
  //   sorter: (a, b) => a.id - b.id,
  //   width: "20%",
  // },
  {
    title: "Name",
    dataIndex: "user_name",
    sorter: (a, b) => a.id - b.id,
    width: "20%",
  },
  {
    title: "Birth Date",
    dataIndex: "meta_value",
    // render: (date) => new Date(on_date * 1000).toLocaleDateString("en-GB"),
    width: "20%",
  },
];

export const BirthdayList = () => {
  //table birthday list
  const [birthdayListSearchValue, setBirthdayListSearchValue] = useState(null);
  const [BirthdayListData, setBirthdayListData] = useState();
  const [loading, setLoading] = useState(false);
  const [birthdayTableParams, setBirthdayTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  //birthday list table api
  const fetchBirthdayTableData = async (value = null) => {
    var offset = 0;

    setLoading(true);
    if (birthdayTableParams.pagination.current > 1) {
      offset =
        (birthdayTableParams.pagination.current - 1) * birthdayTableParams.pagination.pageSize;
    }
    let ApiData = {
      type: 1,
      limit: birthdayTableParams.pagination.pageSize,
      offset: offset,
      search: value ? value : "",
    };
    // console.log(ApiData);
    let response = await ApiSnippets("/AdminDashboard");
    let countObjBirthday = await response.data.birthday_list;
    console.log("countObjBirthday");
    console.log(countObjBirthday);
    // console.log(countObj)
    for (let i = 0; i < countObjBirthday.length; i++) {
      // limit * currentpage - (limit -1)
      let current_page = birthdayTableParams.pagination.current;
      let page_limit = birthdayTableParams.pagination.pageSize;
      countObjBirthday[i].srno =
        page_limit * current_page - (page_limit - i - 1); // srno added to response thank you jigi
      countObjBirthday[i].meta_value = new Date(
        countObjBirthday[i].meta_value * 1000
      ).toLocaleDateString("en-GB");
    }
    // console.log(countObj);
    // setClientTableData(countObj);
    // console.log(srno_array);
    // console.log(response.count);
    setBirthdayListData(countObjBirthday);
    // setBirthdayListData(PclientLogData);
    setLoading(false);
    setBirthdayTableParams({
      ...birthdayTableParams,
      pagination: {
        ...birthdayTableParams.pagination,
        total: response.data.birthday_list.length,
        // total: 100,
        // 200 is mock data, you should read it from server
        // total: data.totalCount,
      },
    });
  };



  useEffect(() => {
    let value = birthdayListSearchValue;
    fetchBirthdayTableData(value);
    // console.log(JSON.stringify(birthdayTableParams));
  }, [JSON.stringify(birthdayTableParams)]);
  const handleBirthdayTableChange = (pagination, sorter) => {
    setBirthdayTableParams({
      pagination,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== birthdayTableParams.pagination?.pageSize) {
      setBirthdayListData([]);
    }
  };

  const hanldeSearch_birthdayList = (value, event) => {
    setBirthdayListSearchValue(value);
    const fetchDataOnSearch = async (value) => {
      var offset = 0;
      setLoading(true);
      if (birthdayTableParams.pagination.current > 1) {
        offset =
          (birthdayTableParams.pagination.current - 1) *
          birthdayTableParams.pagination.pageSize;
      }
      let ApiData = {
        limit: birthdayTableParams.pagination.pageSize,
        offset: offset,
        search: value,
      };
      let response = await ApiSnippets("/AdminDashboard", ApiData);
      let countObjBirthdaySr = await response.data.birthday_list;
      for (let i = 0; i < countObjBirthdaySr.length; i++) {
        // limit * currentpage - (limit -1)
        let current_page = birthdayTableParams.pagination.current;
        let page_limit = birthdayTableParams.pagination.pageSize;
        countObjBirthdaySr[i].srno =
          page_limit * current_page - (page_limit - i - 1); // srno added to response thank you jigi
        countObjBirthdaySr[i].meta_value = new Date(
          countObjBirthdaySr[i].meta_value * 1000
        ).toLocaleDateString("en-GB");
      }
      // console.log(countObj);
      // setClientTableData(countObj);
      // console.log(srno_array);
      // console.log(response.count);
      setBirthdayListData(countObjBirthdaySr);
      console.log(BirthdayListData);
      setLoading(false);
      setBirthdayTableParams({
        ...birthdayTableParams,
        pagination: {
          ...birthdayTableParams.pagination,
          total: response.data.birthday_list.length,
          // total: 1000,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
      console.log(response.count);
    };
    fetchDataOnSearch(value);
  };

  return (
    <>
      {/* table birthday lists starts*/}
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card title="Birthday List">
           {/* <Input.Search allowClear className="__searchbox" onSearch={hanldeSearch_birthdayList} style={{width:"100%"}}/> */}
              <Table
                columns={BirthdayTableColumns}
                rowKey={(record) => record.id} // id
                dataSource={BirthdayListData}
                pagination={birthdayTableParams.pagination}
                loading={loading}
                onChange={handleBirthdayTableChange}
                exportableProps={{
                  showColumnPicker: true,
                  fileName: "Birthday_List",
                }}
                style={{ overflow: "auto" }}
              />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default BirthdayList;
