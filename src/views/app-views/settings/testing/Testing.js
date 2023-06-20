import React, { Component,useState } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Input, Row, Col, Card, Collapse } from 'antd';
import { SearchOutlined, RightOutlined } from '@ant-design/icons';
import { faqCategories, faqList } from './TestingData';
import StatisticWidget from "../../../../components/shared-components/StatisticWidget";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import PropTypes from "prop-types";
const { Panel } = Collapse;



const Testing = ({ title, value, status, subtitle, prefix }) => {
  const [curaentCategory, setCuraentCategory] = useState({
    curentCategory:'faq-1'
  })
  const { curentCategory } = curaentCategory;
  return (
    <>
    {/* <PageHeaderAlt className="bg-primary" overlap>
      <div className="container text-center">
        <div className="py-lg-4">
          <h1 className="text-white display-4">Search for Solution</h1>
          <Row type="flex" justify="center">
            <Col xs={24} sm={24} md={12}>
              <p className="text-white w-75 text-center mt-2 mb-4 mx-auto">
                Look at these words. Are they small words? And he referred to my words - if they're small, something else must be small..
              </p>
            </Col>
          </Row>
          <Row type="flex" justify="center" className="mb-5">
            <Col xs={24} sm={24} md={12}>
              <Input placeholder="Search" prefix={<SearchOutlined type="search" />}/>
            </Col>
          </Row>
        </div>
      </div>
    </PageHeaderAlt> */}
    <div className="container my-4" >
      <Row gutter={16}>
        {faqCategories.map(elm => (
          <Col xs={24} sm={24} md={6} key={elm.key}>
          <Card hoverable  onClick={() => {setCuraentCategory({curentCategory: elm.key})}}>
          {/* <Card hoverable  onClick={() => console.log(elm.key)}> */}
            {title && <h4 className="mb-0">{title}</h4>}
            <div  className={`${prefix? 'd-flex': ''} ${title ? 'mt-3':''}`}>
              {prefix ? <div className="mr-2">{prefix}</div> : null}
              <div>
                <div className="d-flex align-items-center">
                  <h1 className="mb-0 font-weight-bold">{value}</h1>
                  {
                    status ? 
                    <span className={`font-size-md font-weight-bold ml-3 ${status !== 0 && status > 0 ? 'text-success' : 'text-danger'}`} >
                      {status}
                      {status !== 0 && status > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    </span> 
                    : 
                    null
                  }
                </div>
                {subtitle && <div className="text-gray-light mt-1">{subtitle}</div>}
              </div>
            </div>
          </Card>
            {/* <Card hoverable 
              onClick={() => {setCuraentCategory({curentCategory: elm.key})}}>
              <div className="text-center">
                <img className="img-fluid" src={elm.image} alt={elm.title} />
                <h3 className="mt-4">{elm.title}</h3>
              </div>
            </Card> */}
          </Col>
        ))}
      </Row>
      <Card className="mt-4">
        <Collapse 
          accordion 
          defaultActiveKey={'faq-1-1'} 
          bordered={false}
          expandIcon={({ isActive }) => <RightOutlined className="text-primary" type="right" rotate={isActive ? 90 : 0} />}
        >
          {faqList.filter( elm => elm.id === curentCategory)[0].data.map( elm => (
            <Panel header={elm.title} key={elm.key}>
              <p>{elm.desc}</p>
            </Panel>
          ))}
        </Collapse>
    
      </Card>
    </div>
  </>
  )
}





Testing.propTypes = {
  title: PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.element
]),
value: PropTypes.string,
subtitle: PropTypes.string,
status: PropTypes.number,
prefix: PropTypes.element
};

Testing.defaultProps = {
  title: 'Default Title',
  value: '$2,454',
  subtitle: 'PropTypes.subtitle',
  status: 0,
  prefix: null
};

// Testing.defaultProps = {
//   title: ([
//     "PropTypes.string",
//   ]),
//   value: "$2,454",
//   status: "88",
//   // prefix: "1s"
//   subtitle: "PropTypes.subtitle",
// };
export default Testing;

