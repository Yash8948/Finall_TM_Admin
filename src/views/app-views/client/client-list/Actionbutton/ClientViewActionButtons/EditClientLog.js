import React, { useState } from 'react'
import {
    Row,
    Col,
    Card,
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
    Tabs,
    message,
    Tooltip,
    Table
} from 'antd';
import { Icon } from 'components/util-components/Icon'
import { useNavigate, useParams } from "react-router-dom";
import ApiSnippets from 'constants/ApiSnippet';

// import { employementList, interestedList, connectionList, groupList } from './profileData';
import {
    GlobalOutlined,
    MailOutlined,
    DeleteOutlined,
    EditOutlined,
    MessageOutlined,
    HomeOutlined,
    PhoneOutlined
} from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import { useEffect } from 'react';
import dayjs from "dayjs";

const EditClientLog = () => {

    const { id } = useParams();
    const viewDataId = id.slice(1, id.length);
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const [messageApi, contextHolder] = message.useMessage();
    const [viewData, setViewData] = useState([])
    const [loading, setLoading] = useState(false);
    const dateFormatList = ["DD/MM/YYYY"];

	const navigate = useNavigate();



    const successMsg = (msg) => {
        // message.success(countObj.message);
        messageApi.success(msg);
    };
    const errorMsg = (msg) => {
        // message.success(countObj.message);
        messageApi.error(msg);
    };

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < dayjs().startOf("day");
    }


    const getClientById = async () => {
        console.log(viewDataId)
        console.log(id)

        let ApiData = {
            "id": viewDataId,
            // "type": 2
        };
        console.log(ApiData);
        let response = await ApiSnippets("/EditClientLog", ApiData);
        // console.log(response.data);

        let ClientData = response.data;
        var onDate = new Date(ClientData.on_date * 1000).toLocaleDateString("en-GB")

        console.log(ClientData)
        form.setFieldsValue({
            "message": ClientData.message,
            "description": ClientData.description,
            "date": dayjs(onDate, 'DD-MM-YYYY'),

        }
        )
    }

    useEffect(() => {
        getClientById();
    }, []);



    const handleEditCLientLog = async (value, id) => {
        // console.log(value);
        let ApiData = {
            "id": viewDataId,
            "save":"save" ,
            "message": value.message,
            "description": value.description,
            "date": value["date"].format("DD-MM-YYYY")
            //Add your required date format here
            // date: value["date"].format("YYYY-MM-DD HH:mm:ss")  //Add your required date format here
        };
        console.log(ApiData)
        let response = await ApiSnippets("/EditClientLog", ApiData);
        let countObj = await response;

        if (countObj.status === true) {
            successMsg(countObj.message)
            setTimeout(() => {
                form.resetFields();
                navigate('/app/client/list');
            }, 500);
        } else {
            // message.error(countObj.message); 
            errorMsg(countObj.message)
        }

        setLoading(false);
    };



    return (
        <Card
            title="Edit Client Log"
        // extra={<CardDropdown items={newJoinMemberOptions} />}
        >
            <div className="mt-3">
                <Spin spinning={loading} >
                    <Form layout="vertical"
                        // onFinish={handleEditCLientLog}
                        form={form}
                        onFinish={handleEditCLientLog}>
                        <div style={{ marginBottom: 16 }}>
                            <Form.Item label="User : " name="message" rules={[{ required: true, message: 'Please input your message!' }]}>
                                <Input placeholder="Enter Message" />
                            </Form.Item>
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <Form.Item label="Description : " name="description" rules={[{ required: true, message: 'Please input your description!' }]}>
                                <TextArea rows={4} placeholder="Enter Description" />
                            </Form.Item>
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <Form.Item label="Date : " name="date" rules={[{ required: true, message: 'Please input your date!' }]}  >
                                <DatePicker
                                    // defaultValue={dayjs()}
                                    format={dateFormatList}
                                    disabledDate={disabledDate}
                                    // onChange={handleDatePicker}
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <Form.Item>
                                {contextHolder}
                                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Spin>
            </div>
        </Card>
    )
}

export default EditClientLog