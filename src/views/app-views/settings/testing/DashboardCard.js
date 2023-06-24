import React from 'react'
import PropTypes from "prop-types";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

import { Input, Row, Col, Card, Collapse, Tooltip, Button, Tag } from 'antd';
const DashboardCard = ({ title, value, status, subtitle, prefix,onSmash }) => {
    const handleClick = () => {
        onSmash();
    }
  return (
    <div onClick={handleClick}>
        <Card hoverable >
          {/* <Card hoverable  onClick={() => console.log(elm.key)}> */}
            {/* {title && <h4 className="mb-0">{title}</h4>} */}
            <h4 className="mb-0">tests</h4>
            <div  className={`${prefix? 'd-flex': ''} ${title ? 'mt-3':''}`}>
              {prefix ? <div className="mr-2">{prefix}</div> : null}
              <div>
                <div className="d-flex align-items-center">
                  {/* <h1 className="mb-0 font-weight-bold">{value}</h1> */}
                  <h1 className="mb-0 font-weight-bold">8</h1>
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
    </div>
  )
}



DashboardCard.propTypes = {
    title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  value: PropTypes.string,
  subtitle: PropTypes.string,
  status: PropTypes.number,
  prefix: PropTypes.element
  };
  
  DashboardCard.defaultProps = {
    title: 'Default Title',
    value: '$2,454',
    subtitle: '',
    status: 0,
    prefix: null
  };

export default DashboardCard