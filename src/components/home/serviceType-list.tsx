import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  chooseServiceType,
  getAllServiceTypes,
} from '../../redux/slice/serviceTypeSlice';
import {CustomScrollView, Space} from '../views';
import {CustomPressable} from '../pressables';
import {ServiceType} from '../../models/service';
import CustomIcon from '../icon';
import {ActiveText} from '../text';
import {Text} from 'react-native-paper';

export default function ServiceTypeList() {
  const dispatch = useAppDispatch();

  const {serviceTypes, isFetching, currentServiceType} = useAppSelector(
    state => state.serviceType,
  );

  useEffect(() => {
    dispatch(getAllServiceTypes());
  }, [dispatch]);

  const onServiceTypePress = (serviceType: ServiceType) => {
    dispatch(chooseServiceType(serviceType));
  };

  return (
    <Space direction="vertical" gap={0}>
      <Text style={styles.sectionHeader}>Services</Text>
      <CustomScrollView direction="row">
        {isFetching ? (
          <Text>Loading...</Text>
        ) : (
          <>
            {serviceTypes?.map((serviceType, index) => {
              const active =
                currentServiceType?.service_type_name ===
                serviceType.service_type_name;
              return (
                <Space
                  direction="vertical"
                  key={index}
                  extraStyle={{alignItems: 'center'}}>
                  <CustomPressable
                    onPress={() => onServiceTypePress(serviceType)}
                    active={active}>
                    <CustomIcon name="iron" size={30} active={active} />
                  </CustomPressable>
                  <ActiveText active={active}>
                    {serviceType.service_type_name}
                  </ActiveText>
                </Space>
              );
            })}
          </>
        )}
      </CustomScrollView>
    </Space>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
