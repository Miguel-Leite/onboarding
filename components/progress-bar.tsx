import React from "react";
import { View, StyleSheet } from "react-native";

interface ProgressBarProps {
  progress: number;
  width: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, width }) => {
  return (
    <View style={[styles.container, { width }]}>
      <View style={[styles.bar, { width: `${progress}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
  },
  bar: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 2,
  },
});

export default ProgressBar;
