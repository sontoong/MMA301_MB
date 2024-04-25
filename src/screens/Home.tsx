import React, {useCallback} from 'react';
import ServiceTypeList from '../components/home/serviceType-list';
import ServiceList from '../components/home/service-list';
import {CustomView, Space} from '../components/views';
import {setFunctionAndBindLoading} from '../redux/slice/bottomSheetSlice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getAllServiceTypes} from '../redux/slice/serviceTypeSlice';
import {getAllServicesOfAllServiceTypes} from '../redux/slice/serviceSlice';
import {useFocusEffect} from '@react-navigation/native';

export default function Home({navigation}: any) {
  const dispatch = useAppDispatch();
  const {isFetching} = useAppSelector(state => state.serviceType);

  useFocusEffect(
    useCallback(() => {
      dispatch(
        setFunctionAndBindLoading({
          currentFunction: () => {
            dispatch(getAllServiceTypes());
            dispatch(getAllServicesOfAllServiceTypes());
          },
          isFetching: isFetching,
        }),
      );
    }, [dispatch, isFetching]),
  );

  return (
    <Space direction="vertical" gap={30}>
      <ServiceTypeList />
      <CustomView>
        <ServiceList navigation={navigation} />
      </CustomView>
    </Space>
  );
}
