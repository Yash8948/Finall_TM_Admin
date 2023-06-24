import { Button, Checkbox, Form, Input, Modal, Radio } from 'antd';
import { useState } from 'react';
const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Close Ticket"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
    style={{

      textAlignLast: 'center'
  
    }}
  //   footer={
  //   <div style={{ textAlignLast: 'center' }}>
  //     <Button>Cancel</Button>
  //     <Button type="primary">Submit</Button>
  //   </div>
  // }
      width="250px"

      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          // modifier: 'public',
        }}
        style={{
          justifyContent: 'center'
        }}
      >
        <Form.Item name="send_email" className="mb-0" valuePropName="checked">
            <Checkbox  value="send_email">send_email</Checkbox>
        </Form.Item>
        <Form.Item name="send_sms" className="collection-create-form_last-form-item" valuePropName="checked">
            <Checkbox value="send_sms">send_sms</Checkbox>
        </Form.Item> 
      </Form>
    </Modal>
  );
};
const Testing = () => {
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };
  const hanldeModal = (elm) => {
    setOpen(true);
    console.log(elm);
  }
  return (
    <div>
      <Button
        type="primary"
        onClick={
          (elm) => {
        //   setOpen(true);
        hanldeModal(elm)
        }
        }
      >
        New Collection
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};
export default Testing;