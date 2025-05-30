import React from "react";
import { Image, FlatList, Dimensions, View } from "react-native";

const PostsGrid = ({ posts }) => {
  const { width } = Dimensions.get("window");
  const paddingHorizontal = 20;
  const numColumns = 3;
  const gap = 8;

  // Calculate the size of each image based on the screen width, padding, and gap
  const imageSize = (width - paddingHorizontal * 2 - gap * (numColumns - 1)) / numColumns;

  const renderItem = ({ item, index }) => {
    // No margin on the last item in each row
    const isLastInRow = (index + 1) % numColumns === 0;

    return (
      <Image
        source={{ uri: item.image }}
        style={{
          width: imageSize,
          height: imageSize,
          borderRadius: 10,
          marginBottom: gap,
          marginRight: isLastInRow ? 0 : gap,
        }}
      />
    );
  };

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      contentContainerStyle={{
        paddingHorizontal: paddingHorizontal,
        paddingTop: 0,
      }}
      columnWrapperStyle={{
        justifyContent: "flex-start",
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default PostsGrid;