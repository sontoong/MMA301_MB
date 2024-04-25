import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {CustomView, Space} from '../components/views';
import {BackButton, PrimaryButton} from '../components/buttons';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getAllLaundryPacks, getServiceById} from '../redux/slice/serviceSlice';
import {Divider, RadioButton, Text} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import {formatCurrency} from '../utils/utils';
import {clearOrderSuccess, createNewOrder} from '../redux/slice/orderSlice';
import Loader from '../components/loader';

export default function PlaceOrder({route, navigation}: any) {
  const {service_id} = route.params;
  const dispatch = useAppDispatch();

  const {serviceOrderDetail, isFetching, allLaundryPacks} = useAppSelector(
    state => state.service,
  );
  const {isFetching: isFetchingOrder, orderSuccess} = useAppSelector(
    state => state.order,
  );
  const {full_name, address, phone_number} = useAppSelector(
    state => state.user.currentUser,
  );

  const [checked, setChecked] = React.useState('');

  const checkedPack = allLaundryPacks?.find(
    pack => pack.laundry_pack_id === checked,
  );
  const totalPrice = serviceOrderDetail
    ? checkedPack
      ? checkedPack.laundry_pack_price + serviceOrderDetail?.service_price
      : serviceOrderDetail?.service_price
    : 0;

  useEffect(() => {
    dispatch(getServiceById(service_id));
    dispatch(getAllLaundryPacks());
  }, [dispatch, service_id]);

  useFocusEffect(
    React.useCallback(() => {
      setChecked('');
    }, []),
  );

  const submitOrder = () => {
    if (serviceOrderDetail) {
      dispatch(
        createNewOrder({
          laundry_pack_id: checked,
          service_id: service_id,
          service_type_id: serviceOrderDetail?.service_type.service_type_id,
        }),
      );
    }
  };

  useEffect(() => {
    if (orderSuccess) {
      navigation.navigate('OrderDetail', {order_id: orderSuccess});
      dispatch(clearOrderSuccess());
    }
  }, [navigation, dispatch, orderSuccess]);

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <Space direction="vertical" gap={20}>
          <Space gap={20}>
            <BackButton />
            <Text style={styles.title}>Place your order</Text>
          </Space>
          <CustomView>
            <Space direction="vertical" gap={15}>
              <Space>
                <Text style={styles.bold}>Service:</Text>
                <Text style={styles.description}>
                  {serviceOrderDetail?.service_name}
                </Text>
              </Space>
              <Space>
                <Text style={styles.bold}>Service Type:</Text>
                <Text style={styles.description}>
                  {serviceOrderDetail?.service_type.service_type_name}
                </Text>
              </Space>
              <Space direction="vertical">
                <Text style={styles.bold}>Laundry Pack:</Text>
                <Space direction="vertical">
                  {isFetching ? (
                    <Text>Loading...</Text>
                  ) : (
                    allLaundryPacks?.map((pack, index) => (
                      <Space key={index}>
                        <RadioButton
                          value={pack.laundry_pack_id}
                          status={
                            checked === pack.laundry_pack_id
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={() => setChecked(pack.laundry_pack_id)}
                        />
                        <Text style={styles.description}>
                          {`${pack.laundry_pack_name} (${formatCurrency(
                            pack.laundry_pack_price,
                          )})`}
                        </Text>
                      </Space>
                    ))
                  )}
                </Space>
              </Space>
              <Space direction="vertical">
                <Space extraStyle={{justifyContent: 'space-between'}}>
                  <Text style={styles.bold}>Customer:</Text>
                  <Text style={styles.description}>{full_name}</Text>
                </Space>
                <Space extraStyle={{justifyContent: 'space-between'}}>
                  <Text style={styles.bold}>Number:</Text>
                  <Text style={styles.description}>{phone_number}</Text>
                </Space>
                <Space extraStyle={{justifyContent: 'space-between'}}>
                  <Text style={styles.bold}>Address:</Text>
                  <Text style={styles.description}>{address}</Text>
                </Space>
              </Space>
              <Space direction="vertical">
                <Text style={styles.bold}>Items:</Text>
                <Space direction="vertical">
                  {serviceOrderDetail && (
                    <Space extraStyle={{justifyContent: 'space-between'}}>
                      <Text style={styles.boldText}>
                        {serviceOrderDetail.service_name}{' '}
                      </Text>
                      <Text style={styles.boldText}>
                        {formatCurrency(serviceOrderDetail.service_price)}
                      </Text>
                    </Space>
                  )}
                  {checkedPack && (
                    <Space extraStyle={{justifyContent: 'space-between'}}>
                      <Text style={styles.boldText}>
                        {checkedPack?.laundry_pack_name}
                      </Text>
                      <Text style={styles.boldText}>
                        {formatCurrency(checkedPack.laundry_pack_price)}
                      </Text>
                    </Space>
                  )}
                </Space>
              </Space>
              <Divider bold={true} />
              <Space extraStyle={{justifyContent: 'space-between'}}>
                <Text style={styles.boldText}>Total</Text>
                <Text style={styles.boldText}>
                  {formatCurrency(totalPrice)}
                </Text>
              </Space>
              <PrimaryButton
                onPress={submitOrder}
                disabled={!checked || isFetchingOrder}>
                Order Now
              </PrimaryButton>
            </Space>
          </CustomView>
        </Space>
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
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  boldText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  description: {
    fontSize: 16,
    color: 'black',
  },
});
