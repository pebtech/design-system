import { useState } from 'react'
import { View, Image, Pressable, StyleSheet, ViewStyle, ImageStyle } from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { Text } from './text'
import { cn } from '../utils/cn'

const TypedView = View as any
const TypedPressable = Pressable as any

export interface AvatarProps {
  src?: string | null
  square?: boolean
  initials?: string
  alt?: string
  className?: string
  initialsClassName?: string
  style?: ViewStyle
}

export function Avatar({
  src = null,
  square = false,
  initials,
  alt = '',
  className,
  initialsClassName,
  style,
  ...props
}: AvatarProps) {
  const { tokens } = useTheme()
  const [imgError, setImgError] = useState(false)
  const showImage = src && !imgError

  const borderRadius = square ? 8 : 9999

  return (
    <TypedView
      {...props}
      className={cn('relative items-center justify-center overflow-hidden', className)}
      style={StyleSheet.flatten([
        {
          width: 40,
          height: 40,
          borderRadius,
          backgroundColor: tokens.bg.bodySecondary || '#e5e5e5',
        },
        style,
      ])}
    >
      {initials && !showImage && (
        <Text
          weight="semibold"
          size="sm"
          className={cn('uppercase select-none text-center', initialsClassName)}
        >
          {initials}
        </Text>
      )}
      {showImage && (
        <Image
          source={{ uri: src }}
          accessibilityLabel={alt}
          onError={() => setImgError(true)}
          style={StyleSheet.flatten([
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              borderRadius,
            } as ImageStyle,
          ])}
        />
      )}
    </TypedView>
  )
}

export interface AvatarButtonProps extends AvatarProps {
  onPress?: () => void
  disabled?: boolean
  className?: string
  style?: ViewStyle
}

export function AvatarButton({
  src,
  square = false,
  initials,
  alt,
  onPress,
  disabled = false,
  className,
  style,
  ...props
}: AvatarButtonProps) {
  const borderRadius = square ? 8 : 9999

  return (
    <TypedPressable
      onPress={onPress}
      disabled={disabled}
      className={cn('active:opacity-80 transition-opacity', className)}
      style={StyleSheet.flatten([
        {
          borderRadius,
        },
        style,
      ])}
    >
      <Avatar
        src={src}
        square={square}
        initials={initials}
        alt={alt}
        {...props}
      />
    </TypedPressable>
  )
}
