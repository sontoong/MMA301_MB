import {OrderProgress} from '../models/order';

export function iconGenerator(name: OrderProgress['order_status']): {
  name: string;
  color: string;
} {
  let icon = {name: 'dots-horizontal', color: 'black'};
  switch (name) {
    case 'Finished': {
      icon.name = 'check-circle';
      icon.color = 'green';
      break;
    }
    case 'Canceled': {
      icon.name = 'close-circle-outline';
      icon.color = 'red';
      break;
    }
    case 'Processing': {
      icon.name = 'clock-outline';
      icon.color = '#c7a700';
      break;
    }
    case 'Washing': {
      icon.name = 'washing-machine';
      icon.color = '#ceb220';
      break;
    }
    case 'Received': {
      icon.name = 'truck-check-outline';
      icon.color = '#c7a700';
      break;
    }
    default:
      break;
  }

  return icon;
}

export function generateStep(name: OrderProgress['order_status']) {
  let position = 0;
  switch (name) {
    case 'Processing': {
      position = 0;
      break;
    }
    case 'Received': {
      position = 1;
      break;
    }
    case 'Washing': {
      position = 2;
      break;
    }
    case 'Finished': {
      position = 3;
      break;
    }
    case 'Canceled': {
      position = 4;
      break;
    }
    default:
      break;
  }

  return position;
}
