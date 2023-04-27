import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { assets, asset_list } from '@chain-registry/osmosis';
import React, { useContext, useState, useEffect } from 'react';
import { Card, List, Avatar, Button } from 'antd';
import { StoreContext } from '../store/context';
// import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
function AssetsList() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const store = useContext(StoreContext);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    if (store?.all_assets_list ) {
      console.log(store?.all_assets_list.length)
      setList(store?.all_assets_list.slice((page - 1) * pageSize, page * pageSize));
    }
    setInitLoading(false);
    setLoading(false);
  }, [store?.all_assets_list])
  useEffect(() => {
    setLoading(true);
    const _list = store?.all_assets_list.slice((page - 1) * pageSize, page * pageSize)
    setList(_list);
    setLoading(false);
  }, [page, pageSize])
  const onLoadMore = () => {
    setPage(page + 1);
  }
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;
  return (
    <div>
      <p className="city">page: {page}</p>
      <p>{store?.poll_list.length}</p>
      <button onClick={() => store?.add_asset(store?.all_assets_list[0])}>
        add
      </button>
      <List
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={ list }
        loadMore={loadMore}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
              title={<a href="https://ant.design">{item.name}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
      );
    </div>
  );
}

export default observer(AssetsList);
