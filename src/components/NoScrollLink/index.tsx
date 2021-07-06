// Special thanks to wallis.dev!
// Source: https://github.com/james-wallis/wallis.dev/blob/master/components/NoScrollLink.tsx

import Link, { LinkProps } from 'next/link'
import React, { ReactNode } from 'react'

interface NoScrollLinkProps extends LinkProps {
  children: ReactNode
}

const NoScrollLink = ({ children, ...rest }: NoScrollLinkProps): JSX.Element => (
  <Link scroll={false} {...rest}>
    {children}
  </Link>
)

export default NoScrollLink