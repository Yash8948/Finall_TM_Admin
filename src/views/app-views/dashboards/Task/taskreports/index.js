import React,{useState} from "react";
import { DownloadOutlined, EditOutlined, MessageOutlined } from "@ant-design/icons";
import ProductListData from "../../../../../assets/data/dummytaskman.json"
import { Button, Card, Divider, Radio, Space, Table, message,Menu, Tooltip } from "antd";

// import { Button, Radio } from 'antd';
// import { DownloadOutlined } from '@ant-design/icons';
import "./table.css";
import { useNavigate } from "react-router-dom";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { MdPassword } from "react-icons/md";
const TaskReports = () => {
	const [list, setList] = useState(ProductListData)
	const [userID, setUserID] = useState()
  const Navigate = useNavigate();
  
  const go = () => {
    Navigate("/");
  };

  const viewDetails = row => {
		Navigate(`/app/apps/ecommerce/edit-product/${row.id}`)
	}
  

	const deleteUser = (userId) => {
		
		console.log(userId);

		message.success({ content: `Deleted user ${userId}`, duration: 2 });
	}



  const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		
		{
			title: 'user_name',
			dataIndex: 'user_name',
		},
		{
			title: 'first_name',
			dataIndex: 'first_name',
		},
		{
			title: 'last_name',
			dataIndex: 'last_name',
		},
		{
			title: 'email',
			dataIndex: 'email',
		},
		{
			title: 'status',
			dataIndex: 'status',
		},
		{
			title: 'action',
			dataIndex: '',
      render: (_, elm) => (
				
          <div className="text-right d-flex justify-content-center">
						<Tooltip title="Edit">
							<Button success type="primary" className="mr-2" icon={<EditOutlined />}  size="small"/>
						</Tooltip>
						<Tooltip title="Delete">
							<Button danger className="mr-2" icon={<DeleteOutlined />} onClick={()=> deleteUser(elm.id)} size="small"/>
						</Tooltip>
						<Tooltip title="Reset Password">
							<Button danger className="mr-2" icon={<MdPassword />} onClick={()=> {deleteUser(elm.id)}} size="small"/>
						</Tooltip>
						<Tooltip title="View">
							<Button danger className="mr-2" icon={<EyeOutlined />} onClick={()=> {this.deleteUser(elm.id)}} size="small"/>
						</Tooltip>
						<Tooltip title="Message">
							<Button danger className="mr-2" icon={<MessageOutlined />} onClick={()=> {this.deleteUser(elm.id)}} size="small"/>
						</Tooltip>
					</div>
				
			)
		}
	];


  return (
    <Card bodyStyle={{'padding': '0px'}} >
      <div className="">
      <Table 
					columns={tableColumns} 
					dataSource={list} 
					rowKey='id' 
				/>
      </div>
    </Card>
  );
};

export default TaskReports;
{/* <Button.Group outerCount='5' >
    <Button size='small' type='primary' onClick={go}>edit</Button>
    <Button size='small' type='primary' onClick={() => message.warning('delete')}>delete</Button>
    <Button size='small' type='primary' onClick={() => message.success('edit')}>edit</Button>
    <Button size='small' type='primary' onClick={() => message.warning('delete')}>delete</Button>
</Button.Group> */}
