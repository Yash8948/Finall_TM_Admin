import React from "react";
import { DownloadOutlined } from '@ant-design/icons';

import { Button, Card, Divider, Radio, Space, Table, message } from 'antd';

// import { Button, Radio } from 'antd';
// import { DownloadOutlined } from '@ant-design/icons';
import "./table.css"
import { useNavigate } from "react-router-dom";
const TaskReports = () => {
    const Navigate = useNavigate(); 
    const go = () => {
        Navigate("/")
    }
  return (
    <Card>
    <div className="App">
      <Table border='2'>
        <thead>
            <th>srno</th>
            <th>user name</th>
            <th>first name</th>
            <th>last name</th>
            <th>Email id</th>
            <th>status</th>
            <th>action</th>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>yash07</td>
                <td>yash</td>
                <td>soni</td>
                <td>a@a.com</td>
                <td>active</td>
                <td>
                    <Button.Group outerCount='5' >
                        <Button size='small' type='primary' onClick={go}>edit</Button>
                        <Button size='small' type='primary' onClick={() => message.warning('delete')}>delete</Button>
                        <Button size='small' type='primary' onClick={() => message.success('edit')}>edit</Button>
                        <Button size='small' type='primary' onClick={() => message.warning('delete')}>delete</Button>
                    </Button.Group>
                </td>
            </tr>
        </tbody>
  
      </Table>
      
    </div>
    
    <div>
    
    </div>
    </Card>
  );
};

export default TaskReports;