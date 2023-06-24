import { Tabs } from 'antd';
import StatisticWidget from 'components/shared-components/StatisticWidget';
const onChange = (key) => {
  console.log(key);
};
const App = () => (
  <Tabs
    onChange={onChange}
    type="card"
    items={new Array(15).fill(null).map((_, i) => {
      const id = String(i + 1);
      return {
        label: <StatisticWidget
            title="Pending Task's"
            value='0'
          />,
        key: id,
        children: `Content of Tab Pane ${id}`,
      };
    })}
  />
);
export default App;