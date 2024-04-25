import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import CustomIcon from '../components/icon';
import {Button} from 'react-native-paper';

const secondIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 4,
  stepStrokeCurrentColor: '#2ba56a',
  stepStrokeWidth: 2,
  separatorStrokeFinishedWidth: 3,
  stepStrokeFinishedColor: '#2ba56a',
  stepStrokeUnFinishedColor: '#2ba56a',
  separatorFinishedColor: '#2ba56a',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#2ba56a',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#2ba56a',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#0f7e4a',
};

const getStepIndicatorIconConfig = ({position, stepStatus}) => {
  const iconConfig = {
    name: 'check-circle',
    color: stepStatus === 'finished' ? '#ffffff' : '#0f7e4a',
    size: 15,
  };
  switch (position) {
    case 0: {
      iconConfig.name = 'clock-outline';
      break;
    }
    case 1: {
      iconConfig.name = 'truck-check-outline';
      break;
    }
    case 2: {
      iconConfig.name = 'washing-machine';
      break;
    }

    default: {
      break;
    }
  }
  return iconConfig;
};

const Steps = props => {
  const status = props.position;
  const [currentPage, setCurrentPage] = React.useState(status);
  const renderStepIndicator = params => (
    <CustomIcon {...getStepIndicatorIconConfig(params)} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={secondIndicatorStyles}
          stepCount={4}
          currentPosition={currentPage}
          renderStepIndicator={renderStepIndicator}
          labels={['Processing', 'Received', 'Washing', 'Finished']}
        />
      </View>
      <Button onPress={() => setCurrentPage(prev => prev + 1)}>Next</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
  stepIndicator: {
    marginTop: 20,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#0f7e4a',
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4aae4f',
  },
});

export default Steps;
