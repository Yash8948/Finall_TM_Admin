import React, { useState, useEffect } from 'react'
import { Card, Table, Select, Input, Button, Form, Modal, message } from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import ApiSnippets from 'constants/ApiSnippet';
import { useNavigate } from "react-router-dom";
import utils from 'utils'

const { Option } = Select




const VaultM = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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
    const [form] = Form.useForm();

    const onFinish = async (values) => {

        let ApiData = {
            "title": String(values.departname)
        };

        console.log(ApiData)
        try {
            setLoading(true);
            // Make API request using values.departname
            const response = await ApiSnippets('/AddDepartment', ApiData);
            console.log(response);
            // Reset form fields

            // Close the modal

            if (!response.status) {
                message.error(response.message);
            }
            else {
                message.success(response.message)
            }
            form.resetFields();
            handleCancel();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const handleDepart = () => {
        setIsModalOpen(false);
    }
    const addNewVault = () => {
        navigate('/app/settings/addvaultmanger')
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
                        <Button onClick={addNewVault} type="primary" icon={<PlusCircleOutlined />} block>Add New Vault</Button>
                    </div>
                </Flex>
                <div className="table-responsive">
                    <Table
                        columns={tableColumns}

                    />
                </div>
            </Card>

            <Modal
                title="Add Department"
                open={open}
                onOk={form.submit}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText={"Add"}
            > <Form layout="inline" name="add-depart-ref"
                form={form}
                onFinish={onFinish}
                style={{
                    alignItems: "center",
                    justifyContent: "left",
                    margin: "20px",
                    left: "0",
                    padding: "10px",

                }} >
                    <Form.Item name="departname" label="Department Name" rules={[{ required: true, message: 'Please enter the department name' }]} >
                        <Input placeholder="Department Name" name="departname" />
                    </Form.Item>

                </Form>
            </Modal >
        </>
    )
}

export default VaultM