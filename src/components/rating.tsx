import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Space} from './views';
import {Watch} from '../models/watch';
import {Rating, RatingProps} from '@kolking/react-native-rating';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ProgressBar, Text} from 'react-native-paper';

type WatchRatingReadonlyProps = {
  iconSize?: number;
  fontSize?: number;
  showTotalFeedbacks?: boolean;
  feedbacks: Watch['feedbacks'];
};
export function WatchRatingReadonly({
  iconSize = 14,
  fontSize = 14,
  feedbacks,
  showTotalFeedbacks = true,
}: WatchRatingReadonlyProps) {
  const averageRating = getAverageRating(feedbacks);
  const totalFeedbacks = feedbacks ? feedbacks.length : 0;
  return (
    <Space gap={2}>
      <Space gap={0}>
        <Text style={{fontSize: fontSize}}>{averageRating}</Text>
        <Text>
          <Icon name="star" size={iconSize} />
          {/* <Rating size={iconSize} rating={averageRating} disabled={true} /> */}
        </Text>
      </Space>
      {showTotalFeedbacks && <Text>{`(${totalFeedbacks})`}</Text>}
    </Space>
  );
}

type RatingReadonlyProps = RatingProps & {
  iconSize?: number;
  fontSize?: number;
  rating: number;
};
export function RatingReadonly(props: RatingReadonlyProps) {
  const iconSize = props.iconSize !== undefined ? props.iconSize : 15;

  return <Rating size={iconSize} {...props} disabled={true} />;
}

type GroupRatingProps = {
  feedbacks: Watch['feedbacks'];
};
export function GroupRating({feedbacks}: GroupRatingProps) {
  const totalFeedbacks = feedbacks ? feedbacks.length : 0;
  const averageRating = getAverageRating(feedbacks);
  const ratingValues = countRatings(feedbacks).reverse();

  return (
    <Space gap={30}>
      <Space direction="vertical" extraStyle={{flex: 0.3}}>
        <Space direction="vertical" gap={0}>
          <Text style={styles.ratingAverage}>{averageRating}</Text>
          <RatingReadonly rating={averageRating} iconSize={14} />
        </Space>
        <Text>
          {totalFeedbacks} {totalFeedbacks > 1 ? 'feedbacks' : 'feedback'}
        </Text>
      </Space>
      <Space direction="vertical" extraStyle={{flex: 0.7}} gap={0}>
        {ratingValues.map((rating, index) => {
          const [value, count] = Object.entries(rating)[0];
          const progressbarValue = totalFeedbacks ? count / totalFeedbacks : 0;

          return (
            <Space key={index} gap={15}>
              <Text>{value}</Text>
              <View style={{flex: 1}}>
                <ProgressBar
                  progress={progressbarValue}
                  style={styles.progressBar}
                  fillStyle={styles.progressBarFill}
                />
              </View>
            </Space>
          );
        })}
      </Space>
    </Space>
  );
}
const styles = StyleSheet.create({
  ratingAverage: {
    fontSize: 60,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  progressBarFill: {
    borderRadius: 5,
  },
});

function countRatings(
  feedbacks: Watch['feedbacks'],
): {[key: number]: number}[] {
  const ratingsCount: {[key: number]: number}[] = [];

  for (let i = 1; i <= 5; i++) {
    const ratingObj: {[key: number]: number} = {};
    ratingObj[i] = 0;
    ratingsCount.push(ratingObj);
  }

  feedbacks?.forEach(feedback => {
    const rating = feedback.rating;
    if (rating >= 1 && rating <= 5) {
      ratingsCount[rating - 1][rating]++;
    }
  });

  return ratingsCount;
}

function getAverageRating(feedbacks: Watch['feedbacks']): number {
  const averageRating = feedbacks
    ? feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length
    : 0;
  return parseFloat(averageRating.toFixed(1));
}
