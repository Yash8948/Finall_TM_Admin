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

const HolidayTableColumns = [
  {
    title: "SrNo",
    dataIndex: "srno",
    defaultSortOrder: "ascend",
    // sorter:(a, b) => a.id - b.id,
    width: "20%",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.id - b.id,
    width: "20%",
  },
  {
    title: "Description",
    dataIndex: "description",
    sorter: (a, b) => a.id - b.id,
    width: "20%",
  },
  {
    title: "Date",
    dataIndex: "date",
    // render: (date) => new Date(on_date * 1000).toLocaleDateString("en-GB"),
    width: "20%",
  },
];

export const HolidayList = () => {
  //table holiday list
  const [holidayListSearchValue, setHolidayListSearchValue] = useState(null);
  const [holidayListData, setHolidayListData] = useState();
  const [loading, setLoading] = useState(false);
  const [holidayTableParams, setHolidayTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  //holiday list table api
  const fetchHolidayTableData = async (value = null) => {
    var offset = 0;

    setLoading(true);
    if (holidayTableParams.pagination.current > 1) {
      offset =
        (holidayTableParams.pagination.current - 1) * holidayTableParams.pagination.pageSize;
    }
    let ApiData = {
      type: 1,
      limit: holidayTableParams.pagination.pageSize,
      offset: offset,
      search: value ? value : "",
    };
    // console.log(ApiData);
    let response = await ApiSnippets("/Holiday", ApiData);
    let countObjHoliday = await response.data;
    console.log("object");
    console.log(countObjHoliday);
    // console.log(countObj)
    for (let i = 0; i < countObjHoliday.length; i++) {
      // limit * currentpage - (limit -1)
      let current_page = holidayTableParams.pagination.current;
      let page_limit = holidayTableParams.pagination.pageSize;
      countObjHoliday[i].srno =
        page_limit * current_page - (page_limit - i - 1); // srno added to response thank you jigi
      countObjHoliday[i].date = new Date(
        countObjHoliday[i].date * 1000
      ).toLocaleDateString("en-GB");
    }
    // console.log(countObj);
    // setClientTableData(countObj);
    // console.log(srno_array);
    // console.log(response.count);
    setHolidayListData(countObjHoliday);
    // setHolidayListData(PclientLogData);
    setLoading(false);
    setHolidayTableParams({
      ...holidayTableParams,
      pagination: {
        ...holidayTableParams.pagination,
        total: response.count,
        // total: 100,
        // 200 is mock data, you should read it from server
        // total: data.totalCount,
      },
    });
  };



  useEffect(() => {
    let value = holidayListSearchValue;
    fetchHolidayTableData(value);
    // console.log(JSON.stringify(holidayTableParams));
  }, [JSON.stringify(holidayTableParams)]);
  const handleHolidayTableChange = (pagination, sorter) => {
    setHolidayTableParams({
      pagination,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== holidayTableParams.pagination?.pageSize) {
      setHolidayListData([]);
    }
  };

  const hanldeSearch_holidayList = (value, event) => {
    setHolidayListSearchValue(value);
    const fetchDataOnSearch = async (value) => {
      var offset = 0;
      setLoading(true);
      if (holidayTableParams.pagination.current > 1) {
        offset =
          (holidayTableParams.pagination.current - 1) *
          holidayTableParams.pagination.pageSize;
      }
      let ApiData = {
        limit: holidayTableParams.pagination.pageSize,
        offset: offset,
        search: value,
      };
      let response = await ApiSnippets("/Holiday", ApiData);
      let countObjHolidaySr = await response.data;
      for (let i = 0; i < countObjHolidaySr.length; i++) {
        // limit * currentpage - (limit -1)
        let current_page = holidayTableParams.pagination.current;
        let page_limit = holidayTableParams.pagination.pageSize;
        countObjHolidaySr[i].srno =
          page_limit * current_page - (page_limit - i - 1); // srno added to response thank you jigi
        countObjHolidaySr[i].on_date = new Date(
          countObjHolidaySr[i].on_date * 1000
        ).toLocaleDateString("en-GB");
      }
      // console.log(countObj);
      // setClientTableData(countObj);
      // console.log(srno_array);
      // console.log(response.count);
      setHolidayListData(countObjHolidaySr);
      console.log(holidayListData);
      setLoading(false);
      setHolidayTableParams({
        ...holidayTableParams,
        pagination: {
          ...holidayTableParams.pagination,
          total: response.count,
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
      {/* table holiday lists starts*/}
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card title="Holiday List">
           {/* <Input.Search allowClear className="__searchbox" onSearch={hanldeSearch_holidayList} style={{width:"100%"}}/> */}
              <Table
                columns={HolidayTableColumns}
                rowKey={(record) => record.id} // id
                dataSource={holidayListData}
                pagination={holidayTableParams.pagination}
                loading={loading}
                onChange={handleHolidayTableChange}
                exportableProps={{
                  showColumnPicker: true,
                  fileName: "holiday_List",
                }}
                style={{ overflow: "auto" }}
              />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default HolidayList;
