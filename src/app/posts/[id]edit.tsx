// posts/[id]edit.tsx
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';

const EditPostPage = () => {
  const router = useRouter();
  const { id } = router.query; // Obtener el parámetro 'id' de la URL

  return (
    <View>
      <Text>Edit Post {id}</Text>
      <TextInput placeholder="Edit post title" />
      <TextInput placeholder="Edit post content" />
      <Button title="Save Changes" onPress={() => { /* Guardar cambios */ }} />
    </View>
  );
};

export default EditPostPage; // Exporta el componente por defecto
