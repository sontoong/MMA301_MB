import React, {useCallback, useEffect, useState} from 'react';
import {CustomView, Space} from '../components/views';
import {Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {CustomPressable} from '../components/pressables';
import {ActiveText} from '../components/text';
import CustomIcon from '../components/icon';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getUserById} from '../redux/slice/userSlice';
import OrderList from '../components/order/order-list';
import {useFocusEffect} from '@react-navigation/native';
import {setFunctionAndBindLoading} from '../redux/slice/bottomSheetSlice';

export default function Orders({navigation}: any) {
  const dispatch = useAppDispatch();
  const {currentUser, isFetching} = useAppSelector(state => state.user);
  const {orders} = currentUser;

  const [isHistory, setIsHistory] = useState(false);

  useEffect(() => {
    dispatch(getUserById());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      dispatch(
        setFunctionAndBindLoading({
          currentFunction: () => {
            dispatch(getUserById());
          },
          isFetching: isFetching,
        }),
      );
    }, [dispatch, isFetching]),
  );

  const onPress = () => {
    setIsHistory(!isHistory);
  };

  const historyOrders = orders?.filter(
    order =>
      order.order_status === 'Ended' || order.order_status === 'Canceled',
  );

  return (
    <Space direction="vertical" gap={20}>
      <Space direction="vertical" gap={10}>
        <Text style={styles.sectionHeader}>Orders</Text>
        <Space direction="horizontal" extraStyle={styles.container}>
          <Space direction="vertical" extraStyle={{alignItems: 'center'}}>
            <CustomPressable onPress={() => onPress()} active={!isHistory}>
              <CustomIcon
                name="order-bool-ascending-variant"
                size={30}
                active={!isHistory}
              />
            </CustomPressable>
            <ActiveText active={!isHistory}>All Orders</ActiveText>
          </Space>
          <Space direction="vertical" extraStyle={{alignItems: 'center'}}>
            <CustomPressable onPress={() => onPress()} active={isHistory}>
              <CustomIcon name="timer-sand-full" size={30} active={isHistory} />
            </CustomPressable>
            <ActiveText active={isHistory}>History</ActiveText>
          </Space>
        </Space>
      </Space>
      <CustomView>
        <OrderList
          navigation={navigation}
          orders={isHistory ? historyOrders : orders}
        />
      </CustomView>
    </Space>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-around',
  },
  sectionHeader: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
