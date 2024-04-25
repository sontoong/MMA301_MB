import {StyleSheet} from 'react-native';
import React from 'react';
import {OrderFromUserInfo} from '../../models/user';
import {Card, Surface, Text} from 'react-native-paper';
import CustomIcon from '../icon';
import {iconGenerator} from '../../utils/generators';
import {Space} from '../views';
import {formatCurrency} from '../../utils/utils';
import {CustomTouchableRipple} from '../pressables';

type OrderCardProps = {
  order: OrderFromUserInfo;
  navigation: any;
};
export default function OrderCard(props: OrderCardProps) {
  const {service_name, payment_status, order_status, order_price} = props.order;

  return (
    <CustomTouchableRipple
      onPress={() =>
        props.navigation.navigate('OrderDetail', {
          order_id: props.order.order_id,
        })
      }>
      <Surface elevation={1} style={styles.surface}>
        <Card style={styles.cardContainer}>
          <Card.Title
            title={<Text style={styles.name}>{service_name}</Text>}
            right={() => {
              const icon = iconGenerator(order_status);
              return (
                <Space
                  direction="vertical"
                  extraStyle={{alignItems: 'flex-end', paddingRight: 10}}>
                  <CustomIcon name={icon.name} color={icon.color} size={20} />
                  <Text style={{color: icon.color}}>{order_status}</Text>
                </Space>
              );
            }}
          />
          <Card.Content>
            <Space>
              <Text style={styles.boldText}>Payment:</Text>
              <Text style={styles.boldText}>{payment_status}</Text>
            </Space>
            <Space>
              <Text style={styles.boldText}>Started on:</Text>
              <Text style={styles.boldText}>{payment_status}</Text>
            </Space>
          </Card.Content>
          <Card.Actions>
            <Text style={styles.boldText}>{formatCurrency(order_price)}</Text>
          </Card.Actions>
        </Card>
      </Surface>
    </CustomTouchableRipple>
  );
}

const styles = StyleSheet.create({
  surface: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  cardContainer: {
    width: '100%',
    borderRadius: 0,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  boldText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
  },
});
