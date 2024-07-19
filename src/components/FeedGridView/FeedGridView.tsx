import {FlatList, Image} from 'react-native';
import React from 'react';
import {IPost} from '../../types/models';
import FeedGridItem from './FeedGridItem';
interface IFeedGridView {
  data: IPost[];
  ListHeaderComponent:
    | React.Component<any>
    | React.ReactElement
    | null
    | undefined;
}
const FeedGridView = ({data, ListHeaderComponent}: IFeedGridView) => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => <FeedGridItem post={item} />}
      showsVerticalScrollIndicator={false}
      numColumns={3}
      ListHeaderComponent={ListHeaderComponent}
      style={{marginHorizontal: -1}}
    />
  );
};

export default FeedGridView;
