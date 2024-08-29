import React, {useState, useRef, useEffect} from 'react';
import {FlatList, ViewabilityConfig, ViewToken} from 'react-native';
import {generateClient} from 'aws-amplify/api';
import FeedPost from '../../components/FeedPost';
import {listPosts} from '../../graphql/queries';
const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [posts, setPosts] = useState();
  const fetchPost = async () => {
    const client = generateClient();
    const response = await client.graphql({
      query: listPosts,
    });
    setPosts(response.data.listPosts.items);
  };
  useEffect(() => {
    fetchPost();
  }, []);

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
  return (
    <FlatList
      data={posts}
      renderItem={({item}) => (
        <FeedPost post={item} isVisible={activePostId === item.id} />
      )}
      showsVerticalScrollIndicator={false}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged.current}
    />
  );
};

export default HomeScreen;
