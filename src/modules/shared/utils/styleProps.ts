import { CSSProperties, HTMLAttributes } from 'react'
import { StyleProps, ViewStyleProps } from '../types/style'

type Direction = 'ltr' | 'rtl'
type StyleName = string | string[] | ((dir: Direction) => string)
type StyleHandler = (value: any) => any
export type StyleHandlers = {
  [key: string]: [StyleName, StyleHandler]
}

export const baseStyleProps: StyleHandlers = {
  margin: ['margin', dimensionValue],
  marginStart: [rtl('marginLeft', 'marginRight'), dimensionValue],
  marginEnd: [rtl('marginRight', 'marginLeft'), dimensionValue],
  marginTop: ['marginTop', dimensionValue],
  marginBottom: ['marginBottom', dimensionValue],
  marginX: [['marginLeft', 'marginRight'], dimensionValue],
  marginY: [['marginTop', 'marginBottom'], dimensionValue],
  width: ['width', dimensionValue],
  height: ['height', dimensionValue],
  minWidth: ['minWidth', dimensionValue],
  minHeight: ['minHeight', dimensionValue],
  maxWidth: ['maxWidth', dimensionValue],
  maxHeight: ['maxHeight', dimensionValue],
  isHidden: ['display', hiddenValue],
  alignSelf: ['alignSelf', passthroughStyle],
  justifySelf: ['justifySelf', passthroughStyle],
  position: ['position', anyValue],
  zIndex: ['zIndex', anyValue],
  top: ['top', dimensionValue],
  bottom: ['bottom', dimensionValue],
  start: [rtl('left', 'right'), dimensionValue],
  end: [rtl('right', 'left'), dimensionValue],
  left: ['left', dimensionValue],
  right: ['right', dimensionValue],
  order: ['order', anyValue],
  flex: ['flex', flexValue],
  flexGrow: ['flexGrow', passthroughStyle],
  flexShrink: ['flexShrink', passthroughStyle],
  flexBasis: ['flexBasis', passthroughStyle],
  gridArea: ['gridArea', passthroughStyle],
  gridColumn: ['gridColumn', passthroughStyle],
  gridColumnEnd: ['gridColumnEnd', passthroughStyle],
  gridColumnStart: ['gridColumnStart', passthroughStyle],
  gridRow: ['gridRow', passthroughStyle],
  gridRowEnd: ['gridRowEnd', passthroughStyle],
  gridRowStart: ['gridRowStart', passthroughStyle],
}

export const viewStyleProps: StyleHandlers = {
  ...baseStyleProps,
  backgroundColor: ['backgroundColor', colorValue],
  borderWidth: ['borderWidth', dimensionValue],
  borderStartWidth: [
    rtl('borderLeftWidth', 'borderRightWidth'),
    dimensionValue,
  ],
  borderEndWidth: [rtl('borderRightWidth', 'borderLeftWidth'), dimensionValue],
  borderLeftWidth: ['borderLeftWidth', dimensionValue],
  borderRightWidth: ['borderRightWidth', dimensionValue],
  borderTopWidth: ['borderTopWidth', dimensionValue],
  borderBottomWidth: ['borderBottomWidth', dimensionValue],
  borderXWidth: [['borderLeftWidth', 'borderRightWidth'], dimensionValue],
  borderYWidth: [['borderTopWidth', 'borderBottomWidth'], dimensionValue],
  borderColor: ['borderColor', colorValue],
  borderStartColor: [rtl('borderLeftColor', 'borderRightColor'), colorValue],
  borderEndColor: [rtl('borderRightColor', 'borderLeftColor'), colorValue],
  borderLeftColor: ['borderLeftColor', colorValue],
  borderRightColor: ['borderRightColor', colorValue],
  borderTopColor: ['borderTopColor', colorValue],
  borderBottomColor: ['borderBottomColor', colorValue],
  borderXColor: [['borderLeftColor', 'borderRightColor'], colorValue],
  borderYColor: [['borderTopColor', 'borderBottomColor'], colorValue],
  borderRadius: ['borderRadius', dimensionValue],
  borderTopStartRadius: [
    rtl('borderTopLeftRadius', 'borderTopRightRadius'),
    dimensionValue,
  ],
  borderTopEndRadius: [
    rtl('borderTopRightRadius', 'borderTopLeftRadius'),
    dimensionValue,
  ],
  borderBottomStartRadius: [
    rtl('borderBottomLeftRadius', 'borderBottomRightRadius'),
    dimensionValue,
  ],
  borderBottomEndRadius: [
    rtl('borderBottomRightRadius', 'borderBottomLeftRadius'),
    dimensionValue,
  ],
  borderTopLeftRadius: ['borderTopLeftRadius', dimensionValue],
  borderTopRightRadius: ['borderTopRightRadius', dimensionValue],
  borderBottomLeftRadius: ['borderBottomLeftRadius', dimensionValue],
  borderBottomRightRadius: ['borderBottomRightRadius', dimensionValue],
  padding: ['padding', dimensionValue],
  paddingStart: [rtl('paddingLeft', 'paddingRight'), dimensionValue],
  paddingEnd: [rtl('paddingRight', 'paddingLeft'), dimensionValue],
  paddingLeft: ['paddingLeft', dimensionValue],
  paddingRight: ['paddingRight', dimensionValue],
  paddingTop: ['paddingTop', dimensionValue],
  paddingBottom: ['paddingBottom', dimensionValue],
  paddingX: [['paddingLeft', 'paddingRight'], dimensionValue],
  paddingY: [['paddingTop', 'paddingBottom'], dimensionValue],
  overflow: ['overflow', passthroughStyle],
}

const borderStyleProps = {
  borderWidth: 'borderStyle',
  borderLeftWidth: 'borderLeftStyle',
  borderRightWidth: 'borderRightStyle',
  borderTopWidth: 'borderTopStyle',
  borderBottomWidth: 'borderBottomStyle',
}

function rtl(ltr: string, rtl: string) {
  return (direction: Direction) => (direction === 'rtl' ? rtl : ltr)
}

const UNIT_RE =
  /(%|px|em|rem|vw|vh|auto|cm|mm|in|pt|pc|ex|ch|rem|vmin|vmax|fr)$/

export function dimensionValue(value: string | number) {
  if (typeof value === 'number') {
    return `${value}px`
  }
  if (UNIT_RE.test(value)) {
    return value
  }
  return undefined
}

function hiddenValue(value: boolean) {
  return value ? 'none' : undefined
}

function passthroughStyle(value: any) {
  return value
}

function anyValue(value: any) {
  return value
}

function flexValue(value: string | number | boolean) {
  if (typeof value === 'boolean') {
    return value ? 1 : undefined
  }
  return `${value}`
}

const COLOR_RE = /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^)]*\)$/
export function colorValue(value: string) {
  if (COLOR_RE.test(value)) {
    return value
  }
  return undefined
}

export function convertStyleProps(
  props: ViewStyleProps,
  handlers: StyleHandlers,
  direction: Direction,
) {
  const style: CSSProperties = {}
  for (const key in props) {
    const styleProp = handlers[key]
    if (!styleProp || props[key as keyof ViewStyleProps] === null) {
      continue
    }

    let [name, convert] = styleProp
    if (typeof name === 'function') {
      name = name(direction)
    }
    const value = convert(props[key as keyof ViewStyleProps])
    if (Array.isArray(name)) {
      for (const k of name) {
        // @ts-ignore
        style[k] = value
      }
    } else {
      // @ts-ignore
      style[name] = value
    }
  }

  for (const prop in borderStyleProps) {
    // @ts-ignore
    if (style[prop]) {
      // @ts-ignore
      style[borderStyleProps[prop]] = 'solid'
      style.boxSizing = 'border-box'
    }
  }

  return style
}

export function useStyleProps<T extends StyleProps>(
  props: T,
  handlers: StyleHandlers = baseStyleProps,
) {
  const { className: classNameProp, style: styleProp } = props
  const styles = convertStyleProps(props, handlers, 'ltr')
  const style = { ...styleProp, ...styles }
  const styleProps: HTMLAttributes<HTMLElement> = {
    style,
    className: classNameProp,
  }
  if (props.isHidden) {
    styleProps.hidden = true
  }

  return {
    styleProps,
  }
}
