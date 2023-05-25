import { Card as AntdCard } from 'antd';
import { useState } from 'react';

const BoardCards = ({style, ...rest}) => {
    const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };



    return (
        <AntdCard className='' style={{ marginBottom: 20, 
        cursor: 'pointer',
        backgroundColor: isHovering ? '#29303e' : '#283142',
            // color: isHovering ? 'white' : 'red',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest} />
    )
}

export default BoardCards

