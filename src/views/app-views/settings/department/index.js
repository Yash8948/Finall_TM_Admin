import React, { useState } from 'react'
import { Card, Table, Select, Input, Button, Form, Modal } from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import utils from 'utils'

const { Option } = Select




const ProductList = () => {

  const [list, setList] = useState(ProductListData)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const handleDepart = () => {
    setIsModalOpen(false);
  }
  const addProduct = () => {
    showModal()
  }



  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: "20%",
    },
    {
      title: 'Product',
      dataIndex: 'name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
      width: "20%"
    },



    {
      title: 'Action',
      width: "20%",
      dataIndex: 'actions',


    }
  ];

  // const rowSelection = {
  // 	onChange: (key, rows) => {
  // 		setSelectedRows(rows)
  // 		setSelectedRowKeys(key)
  // 	}
  // };

  // const onSearch = e => {
  // 	const value = e.currentTarget.value
  // 	const searchArray = e.currentTarget.value? list : ProductListData
  // 	const data = utils.wildCardSearch(searchArray, value)
  // 	setList(data)
  // 	setSelectedRowKeys([])
  // }

  const handleShowCategory = value => {
    if (value !== 'All') {
      const key = 'category'
      const data = utils.filterArray(ProductListData, key, value)
      setList(data)
    } else {
      setList(ProductListData)
    }
  }
  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="end" className='mb-2' mobileFlex={false}>

          <div>
            <Button onClick={addProduct} type="primary" icon={<PlusCircleOutlined />} block>Add Department</Button>
          </div>
        </Flex>
        <div className="table-responsive">
          <Table
            columns={tableColumns}

          />
        </div>
      </Card>
      {/* <Modal title="Add New Department" open={isModalOpen}>
        <Form layout="inline" name="add-depart-ref" >
          <Form.Item name="depart_title" label="Department Name">
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleDepart}>Add</Button>
          </Form.Item>
        </Form>
      </Modal>
         */}
      <Modal
        title="Add Department"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText={"Add"}
      > <Form layout="inline" name="add-depart-ref"
        style={{
          alignItems: "center",
          justifyContent: "left",
          margin: "20px",
          left: "0",
          padding: "10px"
        }} >
          <Form.Item name="depart_title" label="Department Name">
            <Input autoComplete="off" />
          </Form.Item>

        </Form></Modal>
    </>
  )
}

export default ProductList