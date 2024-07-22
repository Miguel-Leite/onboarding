import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageBackground,
  Image,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Slide, { SlideItem } from "./components/slide";
import ProgressBar from "./components/progress-bar";

const { width } = Dimensions.get("window");

const slides: SlideItem[] = [
  {
    id: "1",
    title: "Bem-vindo",
    description: "Descrição do slide 1",
    backgroundImage: require("./assets/background1.jpg"), // Adicione o caminho para sua imagem
  },
  {
    id: "2",
    title: "Recursos",
    description: "Descrição do slide 2",
    backgroundImage: require("./assets/background2.jpg"), // Adicione o caminho para sua imagem
  },
  {
    id: "3",
    title: "Começar",
    description: "Descrição do slide 3",
    backgroundImage: require("./assets/background3.jpg"), // Adicione o caminho para sua imagem
  },
];

const Onboarding: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<SlideItem>>(null);
  const progress = ((currentIndex + 1) / slides.length) * 100;

  const opacity = useSharedValue(1);

  const fadeOutAndIn = () => {
    opacity.value = withTiming(
      0,
      { duration: 300, easing: Easing.out(Easing.ease) },
      () => {
        opacity.value = withTiming(1, {
          duration: 300,
          easing: Easing.in(Easing.ease),
        });
      }
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const goToNextSlide = () => {
    if (currentIndex < slides.length - 1) {
      fadeOutAndIn();
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentIndex > 0) {
      fadeOutAndIn();
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    if (index !== currentIndex) {
      fadeOutAndIn();
      setCurrentIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.backgroundImageContainer, animatedStyle]}>
        <Image
          source={slides[currentIndex].backgroundImage}
          style={styles.backgroundImage}
        />
      </Animated.View>
      <GestureHandlerRootView style={styles.content}>
        <ProgressBar progress={progress} width={width} />
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={({ item }) => <Slide item={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={goToPrevSlide} style={styles.button}>
            <Text>Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToNextSlide} style={styles.button}>
            <Text>Próximo</Text>
          </TouchableOpacity>
        </View>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#975AFB",
  },
  backgroundImageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    paddingTop: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
});

export default Onboarding;
