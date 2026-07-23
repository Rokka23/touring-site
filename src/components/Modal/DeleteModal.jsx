import styles from "./DeleteModal.module.css";

export const DeleteModal = ({ title, name, handleCancel, handleDelete}) => {
  return (
    <div className={styles.modalOverlay} >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.modalTitle}>{title}の削除</h3>
        <p>{name}を{title}から削除しますか?</p>
        <div className={styles.modalActions}>
          <button className={styles.modalCancelBtn} onClick={handleCancel}>キャンセル</button>
          <button className={styles.modalDeleteBtn} onClick={handleDelete}>削除</button>
        </div>
      </div>
    </div>
  )
}