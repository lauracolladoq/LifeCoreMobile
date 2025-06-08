import Toast from "react-native-toast-message";

export const sucessNotification = async (text: string) => {
  Toast.show({
    type: "success",
    text1: text,
  });
};

export const confirmationNotification = async (text: string) => {
  Toast.show({
    type: "confirmation",
    text1: text,
    props: {
      onYes: () => {
        Toast.hide(); 
      },
      onNo: () => {
        Toast.hide(); 
      },
    },
  });
};
