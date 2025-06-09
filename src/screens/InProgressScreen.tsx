import React from "react";
import Container from "@/components/common/Container";
import SemiBoldText from "@/components/texts/SemiBoldText";

const InProgessScreen = () => {
  return (
    <Container className="justify-center items-center h-full">
      <SemiBoldText className="text-center">
        This feature is currently under development and will be available in
        future updates. We're actively working on it to deliver the best
        experience for you. Thank you for your patience and understanding!
      </SemiBoldText>
    </Container>
  );
};

export default InProgessScreen;
