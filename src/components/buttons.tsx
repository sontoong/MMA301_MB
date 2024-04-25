import * as React from 'react';
import {
  Button,
  ButtonProps,
  IconButton,
  Modal,
  Portal,
  Text,
} from 'react-native-paper';
import {Space} from './views';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const PrimaryButton = (props: Omit<ButtonProps, 'mode'>) => {
  return <Button {...props} mode="contained" style={styles.buttonBase} />;
};

type DeleteButtonType = {
  iconSize?: number;
  disabled?: boolean;
  onPress?: () => void;
};
export const DeleteButton = (props: DeleteButtonType) => {
  const iconSize = props.iconSize !== undefined ? props.iconSize : 24;

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}>
          <Space
            direction="vertical"
            extraStyle={{alignItems: 'center'}}
            gap={15}>
            <Text>Do you want to unfavorite item?</Text>
            <Space>
              <Button
                mode="contained"
                onPress={() => {
                  hideModal();
                }}>
                No
              </Button>
              <Button
                mode="outlined"
                onPress={() => {
                  props.onPress && props.onPress();
                  hideModal();
                }}>
                Yes
              </Button>
            </Space>
          </Space>
        </Modal>
      </Portal>
      <IconButton
        icon="delete"
        size={iconSize}
        onPress={showModal}
        disabled={props.disabled}
      />
    </>
  );
};

type BackButtonProps = {
  to?: string;
};
export const BackButton = (props: BackButtonProps) => {
  const navigation = useNavigation();
  const handleBack = () => {
    if (props.to) {
      navigation.navigate(props.to);
    } else {
      navigation.goBack();
    }
  };
  return <IconButton icon="arrow-left" onPress={handleBack} />;
};

const styles = StyleSheet.create({
  modalContainer: {
    maxWidth: '90%',
    padding: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonBase: {
    borderRadius: 5,
  },
});
