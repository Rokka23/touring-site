import styles from "./FilterPanel.module.css";

export const FilterPanel = ({ selectedArea, selectedTypes, selectedSeasons, selectedLevels, setSelectedTypes, setSelectedSeasons, setSelectedLevels, onChange, onSearch, onReset, isOpen, onClose }) => {
  return (
    <>
      <div
        className={isOpen ? `${styles.filterOverlay} ${styles.isOpen}` : styles.filterOverlay}
        onClick={onClose}
       />

       <div className={isOpen ? `${styles.filter} ${styles.isOpen}` : styles.filter}>
        <div className={styles.filterTopBox}>
          <h2 className={styles.filterTitle}>絞り込み検索</h2>
          <div className={styles.filterTopActions}>
            <button className={styles.filterReset} onClick={onReset}>
              リセット
            </button>
            <button className={styles.filterClose} onClick={onClose} aria-label="閉じる">
              ×
            </button>
          </div>
        </div>

      <div className={styles.filterBox}>
        <div className={styles.filterArea}>
          <label className={styles.filterLabel}>エリア</label>
          <select 
            value = {selectedArea}
            className ={styles.areaSelect}
            onChange = {onChange}
          >
            <option value="">選択してください</option>
            <option value="hokkaido">北海道</option>
            <option value="tohoku">東北</option>
            <option value="kanto">関東</option>
            <option value="chubu">中部</option>
            <option value="kinki">近畿</option>
            <option value="chugoku">中国・四国</option>
            <option value="kyushu">九州</option>
            <option value="okinawa">沖縄</option>
          </select>
        </div>

        <div className={styles.filterSpot}>
          <label className={styles.filterLabel}>スポットタイプ</label>
          <div className={styles.selectBtnBox}>
            <button 
              type="button"  
              className={selectedTypes.includes('海') ? `${styles.selectButton} ${styles.active}` : styles.selectButton}
              onClick={ () => {
              if(selectedTypes.includes('海')) {
                setSelectedTypes(selectedTypes.filter(type => type !== '海'))
              }else {
                setSelectedTypes([...selectedTypes, '海'])
              }
              }}
              >
              海
            </button>
            <button 
              type="button" 
              className={selectedTypes.includes('山') ? `${styles.selectButton} ${styles.active}` : styles.selectButton}
              onClick={ () => {
              if(selectedTypes.includes('山')) {
                setSelectedTypes(selectedTypes.filter(type => type !== '山'))
              }else {
                setSelectedTypes([...selectedTypes, '山'])
              }
              }}
              >
              山
            </button>
            <button 
              type="button" 
              className={selectedTypes.includes('展望台') ? `${styles.selectButton} ${styles.active}` : styles.selectButton}
              onClick={ () => {
              if(selectedTypes.includes('展望台')) {
                setSelectedTypes(selectedTypes.filter(type => type !== '展望台'))
              }else {
                setSelectedTypes([...selectedTypes, '展望台'])
              }
              }}
              >
              展望台
            </button>
            <button 
              type="button" 
              className={selectedTypes.includes('カフェ') ? `${styles.selectButton} ${styles.active}` : styles.selectButton}
              onClick={ () => {
              if(selectedTypes.includes('カフェ')) {
                setSelectedTypes(selectedTypes.filter(type => type !== 'カフェ'))
              }else {
                setSelectedTypes([...selectedTypes, 'カフェ'])
              }
              }}
            >
              カフェ
            </button>
          </div>
        </div>

        <div className={styles.filterSeason}>
          <label className={styles.filterLabel}>季節</label>
          <div className={styles.selectBtnBox}>
            <button 
              type="button" 
              className={selectedSeasons.includes('春') ? `${styles.selectButton} ${styles.active}` : styles.selectButton}
              onClick={ () => {
              if(selectedSeasons.includes('春')) {
                setSelectedSeasons(selectedSeasons.filter(type => type !== '春'))
              }else {
                setSelectedSeasons([...selectedSeasons, '春'])
              }
              }}
            >
              春
            </button>
            <button 
              type="button" 
              className={selectedSeasons.includes('夏') ? `${styles.selectButton} ${styles.active}` : styles.selectButton}
              onClick={ () => {
              if(selectedSeasons.includes('夏')) {
                setSelectedSeasons(selectedSeasons.filter(type => type !== '夏'))
              }else {
                setSelectedSeasons([...selectedSeasons, '夏'])
              }
              }}
            >
              夏
            </button>
            <button 
              type="button" 
              className={selectedSeasons.includes('秋') ? `${styles.selectButton} ${styles.active}` : styles.selectButton}
              onClick={ () => {
              if(selectedSeasons.includes('秋')) {
                setSelectedSeasons(selectedSeasons.filter(type => type !== '秋'))
              }else {
                setSelectedSeasons([...selectedSeasons, '秋'])
              }
              }}
            >
              秋
            </button>
            <button 
              type="button" 
              className={selectedSeasons.includes('冬') ? `${styles.selectButton} ${styles.active}` : styles.selectButton}
              onClick={ () => {
              if(selectedSeasons.includes('冬')) {
                setSelectedSeasons(selectedSeasons.filter(type => type !== '冬'))
              }else {
                setSelectedSeasons([...selectedSeasons, '冬'])
              }
              }}
            >
              冬
            </button>

          </div>
      </div>

      <div className={styles.filterLevel}>
        <label className={styles.filterLabel}>難易度</label>
        <div className={styles.selectBtnBox}>
          <button 
            type="button" 
            className={selectedLevels.includes('初心者') ? `${styles.selectButton} ${styles.active}` : styles.selectButton}
              onClick={ () => {
              if(selectedLevels.includes('初心者')) {
                setSelectedLevels(selectedLevels.filter(type => type !== '初心者'))
              }else {
                setSelectedLevels([...selectedLevels, '初心者'])
              }
              }}
          >
            初心者
          </button>
          <button 
            type="button" 
            className={selectedLevels.includes('中級') ? `${styles.selectButton} ${styles.active}` : styles.selectButton}
            onClick={ () => {
            if(selectedLevels.includes('中級')) {
              setSelectedLevels(selectedLevels.filter(type => type !== '中級'))
            }else {
              setSelectedLevels([...selectedLevels, '中級'])
            }
            }}
          >
            中級
          </button>
          <button 
            type="button" 
            className={selectedLevels.includes('上級') ? `${styles.selectButton} ${styles.active}` : styles.selectButton}
            onClick={ () => {
            if(selectedLevels.includes('上級')) {
              setSelectedLevels(selectedLevels.filter(type => type !== '上級'))
            }else {
              setSelectedLevels([...selectedLevels, '上級'])
            }
            }}
          >
            上級
          </button>
        </div>
      </div>
    </div>
      <div className={styles.filterActions}>
        <button 
          className={styles.filterSearch}
          onClick={() => {
            onSearch();
            onClose();
          }}
        >
          検索する
        </button>
      </div>
    </div>
    </>
  )
}