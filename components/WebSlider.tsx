import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

const webStyles = {
  wrapper: { width: '100%' } as React.CSSProperties,
  input: { width: '100%' } as React.CSSProperties,
};

interface WebSliderProps {
  testID?: string;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  value?: number;
  onValueChange?: (val: number) => void;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
  style?: any;
}

export default function WebSlider({
  testID,
  minimumValue = 0,
  maximumValue = 1,
  step = 0.01,
  value = 0,
  onValueChange,
  style,
}: WebSliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    if (!Number.isNaN(v)) {
      onValueChange?.(v);
    }
  };

  if (Platform.OS === 'web') {
    return (
      <div style={webStyles.wrapper} data-testid={testID ?? 'web-slider'}>
        <input
          type="range"
          min={minimumValue}
          max={maximumValue}
          step={step}
          value={value}
          onChange={handleChange}
          className="rnw-web-input-range"
          data-testid={testID}
          style={webStyles.input}
        />
      </div>
    );
  }

  return (
    <View style={[styles.container, style]} testID={testID ?? 'web-slider'} />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
