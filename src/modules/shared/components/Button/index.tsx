import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  variant?: 'primary' | 'secondary'
  children: ReactNode
  onClick?: () => void
  isBlock?: boolean
  disabled?: boolean
  className?: string
  href?: string
  target?: string
  width?: string
}

const textSize = 'text-base'
const padding = 'py-2 px-7'
const color = {
  primary: 'text-content-primary',
  secondary: 'text-content-secondary',
}
const backgroundColors = {
  primary: 'bg-accent-primary',
  secondary: 'bg-transparent',
}
const border = {
  primary: 'border-none',
  secondary: 'border-2 border-gray-800 dark:border-white',
}

const Button = ({
  variant = 'primary',
  children,
  onClick,
  className = '',
  disabled = false,
  href,
  target,
  isBlock = false,
  width,
}: Props): JSX.Element => {
  const disabledStyle = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'transition ease-in-out duration-300 hover:cursor-pointer'

  let baseClasses = [
    'font-oswald',
    textSize,
    border[variant],
    backgroundColors[variant],
    color[variant],
    padding,
    disabledStyle,
    'rounded-xl',
  ]

  if (className) {
    baseClasses = [...baseClasses, ...className.split(' ')]
  }
  if (isBlock) {
    baseClasses = [...baseClasses, 'block w-full']
  }
  if (!!width) {
    baseClasses = [...baseClasses, width]
  }

  if (href) {
    let linkClasses = [
      ...baseClasses,
      'flex items-center justify-center whitespace-nowrap',
    ]
    return (
      <Link
        to={href}
        target={target}
        onClick={onClick}
        className={linkClasses.join(' ')}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      className={baseClasses.join(' ')}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
