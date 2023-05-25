import { Table } from 'antd';
import qs from 'qs';
import { useEffect, useState } from 'react';
const columns = [
  {
    
    title: 'Sr no',
    dataIndex: '',
    // sorter: true,
    // render: (name) => `${name.first} ${name.last}`,
    width: '10%',
  },
  {
    title: 'Task Name',
    dataIndex: '',
    width: '10%',
  },
  {
    title: 'Tickit Id',
    dataIndex: 'tickit id',
    width: '10%',
  },
  {
    title: 'Client Name',
    dataIndex: 'client name',
    width: '10%',
  },
  {
    title: 'Employee Name',
    dataIndex: '',
    width: '10%',
  },
  {
    title: 'Department',
    dataIndex: '',
    width: '10%',
  },
  {
    title: 'Dadeline Date',
    dataIndex: '',
    width: '10%',
  },
  {
    title: 'Closing Date',
    dataIndex: '',
    width: '10%',
  },
  {
    title: 'Status',
    dataIndex: '',
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
            total: 100,
            // 100 is mock data, you should read it from server
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
  return (
    <Table
      columns={columns}
      rowKey={(record) => record.login.uuid}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default TaskOnBoard;