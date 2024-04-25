import React, {useRef, useMemo, ReactElement, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {ContentView} from '../components/views';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {resetFunctionAndBindLoading} from '../redux/slice/bottomSheetSlice';

const MainContainer: React.FC<{
  children: ReactElement;
  navigation: any;
  route: any;
  minHeight?: number;
}> = ({children, navigation, route, minHeight = 100}) => {
  const dispatch = useAppDispatch();
  const {currentFunction, isFetching} = useAppSelector(
    state => state.bottomSheet,
  );
  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => [`${minHeight}%`, '100%'], [minHeight]);

  // callbacks
  // const handleSheetChange = useCallback(index => {
  // console.log('handleSheetChange', index);
  // }, []);

  // Pass navigation prop to children
  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, {navigation, route}),
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      dispatch(resetFunctionAndBindLoading());
    });

    return unsubscribe;
  }, [dispatch, navigation]);

  return (
    <ContentView>
      <BottomSheet
        backgroundStyle={{borderRadius: 0}}
        style={styles.container}
        handleComponent={() => <></>}
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        // onChange={handleSheetChange}
      >
        <BottomSheetScrollView
          contentContainerStyle={styles.contentContainer}
          refreshing={isFetching}
          onRefresh={currentFunction}>
          <>{childrenWithProps}</>
        </BottomSheetScrollView>
      </BottomSheet>
    </ContentView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
  },
});

export default MainContainer;
