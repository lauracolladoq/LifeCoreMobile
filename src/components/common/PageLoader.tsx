import React from "react";
import { ActivityIndicator } from "react-native";
import Container from "./Container";

export default function PageLoader() {
  return (
    <Container>
      <ActivityIndicator size="large" color="#7dd3fc" />
    </Container>
  );
}