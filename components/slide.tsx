import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export type SlideItem = {
  id: string;
  title: string;
  description: string;
  backgroundImage: any;
};

export type SlideProps = {
  item: SlideItem;
};

const Slide = ({ item }: SlideProps) => {
  return (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    width,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
});

export default Slide;
