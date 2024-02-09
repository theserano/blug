import { HashLoader } from 'react-spinners';
import styles from  "./loader.module.scss";

const Loader = () => {
  return (
        <div className={styles.loader}>
            <HashLoader
                color="#FCAEAE"
                cssOverride={{
                    backgroundColor: '#1E1E1E'
                }}
                size={150}
            />
        </div>
  )
}

export default Loader