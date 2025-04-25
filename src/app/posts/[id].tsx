// posts/[id].tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query; // Obtener el parámetro 'id' de la URL
  
  return (
    <View>
      <Text>Post ID: {id}</Text>
      {/* Aquí podrías traer y mostrar los detalles de la publicación */}
    </View>
  );
};

export default PostPage; // Asegúrate de tener este export default
