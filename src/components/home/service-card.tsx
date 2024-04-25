import {StyleSheet} from 'react-native';
import React from 'react';
import {Service} from '../../models/service';
import {Card, Surface, Text} from 'react-native-paper';
import {PrimaryButton} from '../buttons';
import {formatCurrency} from '../../utils/utils';

type ServiceCardProps = {
  service: Service;
  navigation: any;
};
export default function ServiceCard({service, navigation}: ServiceCardProps) {
  const {service_name, service_price} = service;

  return (
    <Surface elevation={1} style={styles.surface}>
      <Card.Title
        title={<Text style={styles.name}>{service_name}</Text>}
        subtitle={<Text>{formatCurrency(service_price)}</Text>}
        right={() => {
          return (
            <PrimaryButton
              onPress={() => {
                navigation.navigate('PlaceOrder', service);
              }}>
              Order
            </PrimaryButton>
          );
        }}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
