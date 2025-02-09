import React from 'react'
import styles from '../../styles/Header.module.css'
import styled from 'styled-components'

interface HeaderProps {
  title: string
}

const HeaderConainer = styled.div`
  
`

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img
          src="/placeholder.svg?height=40&width=40"
          alt="Chat Logo"
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

