import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  ViewabilityConfig,
  ViewToken,
} from 'react-native';
import FeedPost from '../../components/FeedPost';
import {useRef, useState} from 'react';
import {useQuery} from '@apollo/client';
import {listPosts} from './queries';
import {
  ListPostsQuery,
  ListPostsQueryVariables,
  ModelSortDirection,
} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage';

const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const {data, loading, error, refetch} = useQuery<
    ListPostsQuery,
    ListPostsQueryVariables
  >(listPosts);

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };
  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setActivePostId(viewableItems[0].item.id);
      }
    },
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <ApiErrorMessage title="Error fetching posts" message={error.message} />
    );
  }
  console.log('Este es la data', data);
  const posts = data?.listPosts?.items || [];

  return (
    <FlatList
      data={posts}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged.current}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      onRefresh={refetch}
      refreshing={loading}
      ListEmptyComponent={
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>No Posts.</Text>
        </View>
      }
      renderItem={({item}) =>
        item && (
          <FeedPost
            post={item}
            isVisible={activePostId === item.id}
            //  onPostUpdate={refetch}
          />
        )
      }
    />
  );
};

export default HomeScreen;
