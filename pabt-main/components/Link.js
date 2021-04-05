import React from 'react'
import Link from 'next/link'

import styles from './Link.module.css'

const BaseLink = ({ href, children }) => {

  return (
    <Link href={href}>
      <a className={styles.a__content}>{children}</a>
    </Link>
  )
}

export default BaseLink
