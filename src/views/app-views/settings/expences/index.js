import React, { useState, useEffect } from 'react'
import { Card, Table, Select, Input, Button, Form, Modal, message, Radio, Row, Col } from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import ApiSnippets from 'constants/ApiSnippet';
import utils from 'utils'
import { useNavigate } from "react-router-dom";

const { Option } = Select




const Expences = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const successMsg = (msg) => {

    messageApi.success(msg);
  };
  const errorMsg = (msg) => {

    messageApi.error(msg);
  };

  const showModal = () => {
    setOpen(true);
  };
  const [form] = Form.useForm();

  const handleaddExpenece = async (values) => {

    let ApiData = {
      "name": String(values.expence),
      "type": values.type
    };

    console.log(ApiData)

    setLoading(true);
    // Make API request using values.departname
    const response = await ApiSnippets('/AddExpences', ApiData);
    let expenceData = await response;


    if (expenceData.status === true) {
      successMsg(expenceData.message)
      setTimeout(() => {
        // form.resetFields();
      }, 500);

      handleCancel();

    } else {

      errorMsg(expenceData.message)
    }

    setLoading(false);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const handleDepart = () => {
    setIsModalOpen(false);
  }
  const addexpence = () => {
    showModal()
  }



  const tableColumns = [
    {
      title: 'Sr No',
      dataIndex: 'srno',
      width: "20%",
    },
    {
      title: 'Department Name',
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

  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="end" className='mb-2' mobileFlex={false}>

          <div>
            <Button onClick={addexpence} type="primary" icon={<PlusCircleOutlined />} block>Add New Expence</Button>
          </div>
        </Flex>
        <div className="table-responsive">
          <Table
            columns={tableColumns}

          />
        </div>
      </Card>
      {contextHolder}
      <Modal
        title="Add New Expence"
        open={open}
        onOk={form.submit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText={"Add"}
        width={700}
      > <Form layout="vertical" name="add-depart-ref"
        form={form}
        onFinish={handleaddExpenece}
        style={{
          alignItems: "center",
          justifyContent: "left",
          margin: "20px",
          left: "0",
          padding: "10px",

        }} >

          <Row gutter={16} justify="start">
            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item name="expence" label="Name" rules={[{ required: true, message: 'Please enter the expence name' }]} >
                <Input placeholder="expence" name="addpaymentMethod" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item
                label="Type "
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Please select your any one !",
                  },
                ]}
              >
                <Radio.Group initialValues="" buttonStyle="solid">
                  <Radio.Button name="deductable" value="1">Deductable</Radio.Button>
                  <Radio.Button name="chargeable" value="0">Chargeable</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal >
    </>
  )
}

export default Expences