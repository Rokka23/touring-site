import { IoHomeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaMap } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom"

import styles from './BottomTab.module.css'

export const BottomTab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabs = [
    {path: '/', label: 'ホーム', icon: <IoHomeSharp size={30} />},
    {path: '/favorites', label: 'お気に入り', icon: <FaHeart size={30} />},
    {path: '/plan', label: 'プラン', icon: <FaMap size={30} />}
  ]
  
  return (
    <>
      <nav className={styles.bottomTabContainer}>
        <ul className={styles.bottomTabBox}>
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path
            return (
              <li 
               key={tab.path}
               className={`${styles.bottomTabItem} ${isActive ? styles.active : ''}`} 
               onClick={() => navigate(tab.path)} 
              >
                <div className={styles.bottomTabIcon}>{tab.icon}</div>
                <p className={styles.bottomTabLabel}>{tab.label}</p>
              </li>           
          )})}
        </ul>
      </nav>
    </>
  )
}