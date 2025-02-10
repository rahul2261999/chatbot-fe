import React from 'react'
import styles from '../../styles/Header.module.css'
import Aura from '@assets/images/aura.webp'

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img
          src={Aura}
          alt="aura"
          width={40}
          height={40}
          className={styles.logo}
        />
      </div>
      <h1 className={styles.title}>{title}</h1>
    </header>
  )
}

export default Header

