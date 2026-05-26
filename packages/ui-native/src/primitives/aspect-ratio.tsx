import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { cn } from '../utils/cn'

const TypedView = View as any

export interface AspectRatioProps {
  children?: React.ReactNode
  ratio?: number
  className?: string
  style?: ViewStyle
}

export function AspectRatio({
  children,
  ratio = 1,
  className,
  style,
  ...props
}: AspectRatioProps) {
  return (
    <TypedView
      {...props}
      className={cn('w-full overflow-hidden', className)}
      style={StyleSheet.flatten([
        { width: '100%', aspectRatio: ratio },
        style
      ])}
    >
      {children}
    </TypedView>
  )
}
