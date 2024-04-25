import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Space} from '../views';
import {getAllServicesOfAllServiceTypes} from '../../redux/slice/serviceSlice';
import ServiceCard from './service-card';
import {Text} from 'react-native-paper';

export default function ServiceList({navigation}: any) {
  const dispatch = useAppDispatch();
  const {allServices, isFetching} = useAppSelector(state => state.service);
  const {currentServiceType} = useAppSelector(state => state.serviceType);

  useEffect(() => {
    dispatch(getAllServicesOfAllServiceTypes());
  }, [dispatch]);

  const displayServices = currentServiceType
    ? allServices?.filter(
        serviceType =>
          serviceType.service_type_name ===
          currentServiceType?.service_type_name,
      )
    : allServices;

  return (
    <Space direction="vertical" gap={30}>
      {isFetching ? (
        <Text>Loading...</Text>
      ) : (
        displayServices?.map((serviceType, index) => (
          <Space key={index} direction="vertical" gap={15}>
            {!currentServiceType && (
              <Text style={styles.label}>{serviceType.service_type_name}</Text>
            )}
            <Space direction="vertical" gap={20}>
              {serviceType.services.map((service, index2) => (
                <Space direction="vertical" key={index - index2}>
                  <ServiceCard service={service} navigation={navigation} />
                </Space>
              ))}
            </Space>
          </Space>
        ))
      )}
    </Space>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
