import React from 'react';
import {Text} from 'react-native-paper';
import {Space} from '../views';
import {useAppSelector} from '../../redux/hooks';
import {UserInfo} from '../../models/user';
import OrderCard from './order-card';

type Props = {
  navigation: any;
  orders: UserInfo['orders'];
};
export default function OrderList(props: Props) {
  const {isFetching} = useAppSelector(state => state.user);
  const {orders, navigation} = props;

  return (
    <Space direction="vertical" gap={30}>
      {isFetching ? (
        <Text>Loading...</Text>
      ) : (
        orders?.map((order, index) => (
          <Space direction="vertical" key={index}>
            <OrderCard order={order} navigation={navigation} />
          </Space>
        ))
      )}
    </Space>
  );
}
