import { FaHeart } from "react-icons/fa";
import { HiAdjustmentsHorizontal } from "react-icons/hi2"; 
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./Header.module.css";

export const Header = ({ searchName, setSearchName, onSearchByName, isFilterOpen, onToggleFilter }) => {

  const location = useLocation();
  const isHome = location.pathname === "/";
  const isFavorites = location.pathname === '/favorites' 
  const isPlan = location.pathname === '/plan'

  const navigate = useNavigate();

  return (
    <header>
  <div className={`${styles.headerInner} ${isPlan || isFavorites  ? styles.planHeader : ''} `}>
    <div className={styles.logo}>
      <div className={styles.titleIcon}>
        <img 
          src="/public/logo2.png"
          alt="ロゴの画像"
          width={130}
          height={70}
        />
      </div>
      <div className={styles.titleTextBox}>
        <h1 className={styles.title}>ROKKA BIKE</h1>
      </div>
    </div>
    <div className={`${styles.searchArea} ${isFavorites ? styles.headerFavBtnHide : ""} ${isPlan ? styles.headerFavBtnHide : ""}`}>
      <input
        type="search"
        id="search"
        name="search"
        value={searchName}
        className={styles.searchBox}
        placeholder="スポットを検索"
        onChange={(e) => {
          setSearchName(e.target.value);
        }}
      />
      <button
        className={styles.searchButton}
        onClick={onSearchByName}
      >検索する</button>
    </div>
    <ul className={styles.headerNav}>
      <li
        className={`${styles.headerFilterBtn} ${isFilterOpen ? styles.isActive : ""} ${
          !isHome ? styles.headerFilterBtnHide : ""
        }`}
        onClick={onToggleFilter}
      >
        <HiAdjustmentsHorizontal />
        <span className={styles.filterBtnText}>絞り込み</span>
      </li>
      <li className={`${styles.headerFav} ${isFavorites ? styles.headerFavBtnHide : ""}`} onClick={() => navigate('/favorites')}>
        <FaHeart />
        <span className={styles.favText}>お気に入り</span>
      </li>
      {/* <li className="header-li">ログイン</li> */}
    </ul>
  </div>
</header>
  )
}