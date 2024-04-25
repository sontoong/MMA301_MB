import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getOrderById} from '../redux/slice/orderSlice';
import {CustomView, Space} from '../components/views';
import {BackButton, PrimaryButton} from '../components/buttons';
import {Divider, Text} from 'react-native-paper';
import {formatCurrency, formatDateToLocal} from '../utils/utils';
import Steps from '../components/step';
import {generateStep} from '../utils/generators';
import Loader from '../components/loader';
import {getUserById} from '../redux/slice/userSlice';

export default function OrderDetail({route}: any) {
  const {order_id} = route.params ?? {};
  const dispatch = useAppDispatch();
  const {currentOrder, isFetching} = useAppSelector(state => state.order);
  const {phone_number, address} = useAppSelector(
    state => state.user.currentUser,
  );

  useEffect(() => {
    dispatch(getOrderById(order_id));
    dispatch(getUserById());
  }, [dispatch, order_id]);

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        currentOrder && (
          <Space direction="vertical" gap={20}>
            <Space gap={40}>
              <BackButton to="Orders" />
              <Text style={styles.title}>Order Details</Text>
            </Space>
            <CustomView>
              <Steps position={generateStep(currentOrder.order_status)} />
              <Space direction="vertical" gap={15}>
                {/* <Space extraStyle={{justifyContent: 'center'}}>
                <Text style={styles.bold}>
                  {currentOrder.service.service_name}
                </Text>
              </Space> */}
                {/* payment */}
                <Space direction="vertical">
                  <Space extraStyle={{justifyContent: 'space-between'}}>
                    <Text style={styles.boldText}>Status:</Text>
                    <Text style={styles.description}>
                      {currentOrder.order_status}
                    </Text>
                  </Space>
                  <Space extraStyle={{justifyContent: 'space-between'}}>
                    <Text style={styles.boldText}>Order date:</Text>
                    <Text style={styles.description}>
                      {currentOrder.order_progress[0] &&
                        formatDateToLocal(
                          currentOrder.order_progress[0].timestamp,
                        )}
                    </Text>
                  </Space>
                </Space>
                {/* customer */}
                <Space direction="vertical">
                  <Space extraStyle={{justifyContent: 'space-between'}}>
                    <Text style={styles.boldText}>Customer:</Text>
                    <Text style={styles.description}>
                      {currentOrder.user.full_name}
                    </Text>
                  </Space>
                  <Space extraStyle={{justifyContent: 'space-between'}}>
                    <Text style={styles.boldText}>Number:</Text>
                    <Text style={styles.description}>{phone_number}</Text>
                  </Space>
                  <Space extraStyle={{justifyContent: 'space-between'}}>
                    <Text style={styles.boldText}>Address:</Text>
                    <Text style={styles.description}>{address}</Text>
                  </Space>
                </Space>
                {/* items */}
                <Space direction="vertical">
                  <Text style={styles.bold}>Items</Text>
                  <Space direction="vertical">
                    <Space extraStyle={{justifyContent: 'space-between'}}>
                      <Text style={styles.boldText}>
                        {currentOrder.service.service_name}
                      </Text>
                      <Text style={styles.boldText}>
                        {formatCurrency(currentOrder.service.service_price)}
                      </Text>
                    </Space>
                    <Space extraStyle={{justifyContent: 'space-between'}}>
                      <Text style={styles.boldText}>
                        {currentOrder.laundry_pack.laundry_pack_name}
                      </Text>
                      <Text style={styles.boldText}>
                        {formatCurrency(
                          currentOrder.laundry_pack.laundry_pack_price,
                        )}
                      </Text>
                    </Space>
                  </Space>
                </Space>
                <Divider bold={true} />
                <Space extraStyle={{justifyContent: 'space-between'}}>
                  <Text style={styles.boldText}>Total</Text>
                  <Text style={styles.boldText}>
                    {formatCurrency(currentOrder.order_price)}
                  </Text>
                </Space>
                <PrimaryButton
                // onPress={submitOrder}
                // disabled={!checked || isFetchingOrder}
                >
                  Cancel Order
                </PrimaryButton>
              </Space>
            </CustomView>
          </Space>
        )
      )}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  bold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  boldText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
  },
  description: {
    fontSize: 16,
    color: 'black',
  },
});
