import clsx from 'clsx'
import { dimensionValue } from 'modules/shared/utils/styleProps'
import React, { ReactNode } from 'react'

interface Props {
  variant?: 'circular' | 'rounded' | 'square'
  children?: ReactNode
  src?: string
  isDisabled?: boolean
  size: number
  alt?: string
}

function useLoaded({ crossOrigin, referrerPolicy, src }: any) {
  const [loaded, setLoaded] = React.useState<string | boolean>(false)

  React.useEffect(() => {
    if (!src) {
      return undefined
    }

    setLoaded(false)

    let active = true
    const image = new Image()
    image.onload = () => {
      if (!active) {
        return
      }
      setLoaded('loaded')
    }
    image.onerror = () => {
      if (!active) {
        return
      }
      setLoaded('error')
    }
    image.crossOrigin = crossOrigin
    image.referrerPolicy = referrerPolicy
    image.src = src

    return () => {
      active = false
    }
  }, [crossOrigin, referrerPolicy, src])

  return loaded
}

const Avatar = (props: Props) => {
  const {
    variant = 'circular',
    size,
    isDisabled,
    children: childrenProps,
    src,
    alt,
    ...otherProps
  } = props

  const sizeValue = dimensionValue(size)
  const variantValue = {
    circular: 'rounded-full',
    rounded: 'rounded',
    square: 'square',
  }
  const classNames = clsx(
    variantValue[variant],
    {
      'opacity-50 cursor-not-allowed': isDisabled,
    },
    'bg-bg-secondary overflow-hidden relative',
  )

  let children
  const loaded = useLoaded({ ...otherProps, src })
  const hasImg = src !== ''
  const hasImgNotFailing = hasImg && loaded !== 'error'
  if (hasImgNotFailing) {
    children = (
      <img
        className={clsx('w-full', variantValue[variant])}
        src={src}
        alt={alt}
      />
    )
  } else if (childrenProps && childrenProps !== null) {
    children = childrenProps
  } else {
    children = (
      <svg
        className="text-content-secondary absolute -bottom-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clip-rule="evenodd"
        ></path>
      </svg>
    )
  }
  return (
    <div
      className={classNames}
      style={{
        ...(sizeValue && { width: sizeValue, height: sizeValue }),
      }}
    >
      {children}
    </div>
  )
}

export default Avatar
