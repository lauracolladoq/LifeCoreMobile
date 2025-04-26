import CustomText from '@/components/CustomText';
import { Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <CustomText className="text-white text-2xl font-bold">Hello, Android!</CustomText>
    </View>
  );
};

export default HomeScreen;