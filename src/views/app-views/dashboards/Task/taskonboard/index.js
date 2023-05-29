import { Table } from 'antd';
import qs from 'qs';
import { useEffect, useState } from 'react';
import ApiSnippets from '../../../../../constants/ApiSnippet'





const columns = [
  {
    
    title: 'Sr no',
    dataIndex: 'ticket_id',
    // sorter: true,
    render: (id, record, index) => { ++index; return index; },
    width: '10%',
  },
  {
    title: 'Task Name',
    dataIndex: 'title',
    width: '10%',
    sorter:(a, b) => a.id - b.id,

  },
  {
    title: 'Tickit Id',
    dataIndex: "unique_id",
    width: '10%',
  },
  {
    title: 'Client Name',
    dataIndex: 'client_name',
    width: '10%',
    sorter:(a, b) => a.id - b.id,

  },
  {
    title: 'Employee Name',
    dataIndex: '',
    width: '10%',
  },
  {
    title: 'Department',
    dataIndex: 'department_name',
    width: '10%',
  },
  {
    title: 'Dadeline Date',
    dataIndex: 'deadline_date',
    width: '10%',
  },
  {
    title: 'Closing Date',
    dataIndex: 'starting_date',
    width: '10%',
  },
  {
    title: 'Status',
    dataIndex: 'statusname',
    width: '10%',
  },
  {
    title: 'Action',
    dataIndex: '',
    width: '10%',
  },
];
const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
const TaskOnBoard = () => {
  const [clientTableData, setClientTableData] = useState(null)
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
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
  //           // 100 is mock data, you should read it from server
  //           // total: data.totalCount,
  //         },
  //       });
  //     });
  // };
  const fetchData = async () => {  
    console.log("working")
    var offset = 0;
    setLoading(true);
    if(tableParams.pagination.current > 1){
      offset = (tableParams.pagination.current - 1 ) * tableParams.pagination.pageSize;
    }
      let ApiData = {
          "limit": tableParams.pagination.pageSize,
          "offset": offset,
          "search":"",

        }
          let response = await ApiSnippets("/LoadTask", ApiData);
          let countObj = await response.data;
          setClientTableData(countObj);
          setData(response.data)
          setLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: response.count,
              // 200 is mock data, you should read it from server
              // total: data.totalCount,
            },
          });
  }
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
  return (
    <Table
      columns={columns}
      // rowKey={(record) => record.login.uuid}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default TaskOnBoard;