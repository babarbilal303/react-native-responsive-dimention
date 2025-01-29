import { Dimensions, PixelRatio, Platform, useWindowDimensions } from 'react-native';

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Adaptive base dimensions (smallest mobile screens)
const BASE_WIDTH = 360; // Smallest common width (e.g., older Android phones)
const BASE_HEIGHT = 640; // Smallest common height

// Scaling factors based on device dimensions
const scaleWidth = SCREEN_WIDTH / BASE_WIDTH;
const scaleHeight = SCREEN_HEIGHT / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight); // Use the smaller scale for consistency

// Type declaration for the 'isTablet' function
export const isTablet = (): boolean => {
  const aspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;

  // iOS specific check for iPads using the Platform module
  if (Platform.OS === 'ios') {
    return Platform.isPad || (SCREEN_WIDTH >= 768 && SCREEN_HEIGHT >= 1024); // iPads have these dimensions
  }

  // For Android, check for screen size greater than or equal to 600px
  if (Platform.OS === 'android') {
    return SCREEN_WIDTH >= 600 && SCREEN_HEIGHT >= 800; // General Android tablet screen size threshold
  }

  return aspectRatio < 1.6; // Tablets typically have a smaller aspect ratio than phones
};

// Responsive width function with typing
export const rw = (width: number): number => Math.round(PixelRatio.roundToNearestPixel(width * scaleWidth));

// Responsive height function with typing
export const rh = (height: number): number => Math.round(PixelRatio.roundToNearestPixel(height * scaleHeight));

// Responsive font size (with optional scaling factor) with typing
export const rf = (size: number, factor: number = 0.5): number => {
  let scaledSize = size * (scale + factor * (1 - scale)); // Mimic `moderateScale`
  if (isTablet()) {
    scaledSize *= 1.2; // Increase font size for tablets
  }
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};

// Responsive screen width percentage function with typing
export const wp = (percentage: number): number => Math.round(PixelRatio.roundToNearestPixel((percentage * SCREEN_WIDTH) / 100));

// Responsive screen height percentage function with typing
export const hp = (percentage: number): number => Math.round(PixelRatio.roundToNearestPixel((percentage * SCREEN_HEIGHT) / 100));

// Hook for real-time dimensions with typings
export const useResponsive = () => {
  const { width, height } = useWindowDimensions();
  return {
    rw: (w: number): number => Math.round(PixelRatio.roundToNearestPixel(w * (width / BASE_WIDTH))),
    rh: (h: number): number => Math.round(PixelRatio.roundToNearestPixel(h * (height / BASE_HEIGHT))),
    wp: (p: number): number => Math.round(PixelRatio.roundToNearestPixel((p * width) / 100)),
    hp: (p: number): number => Math.round(PixelRatio.roundToNearestPixel((p * height) / 100)),
  };
};

// Export all utilities
export default {
  rw,
  rh,
  rf,
  wp,
  hp,
  isTablet,
  useResponsive, // New hook added
};
