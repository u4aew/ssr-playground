import { IFinancialInstrument } from '@/typing';
import styles from './styles.module.scss';
type Props = {
  value: IFinancialInstrument;
};

export const ServerSharePreview = ({ value }: Props) => {
  return (
    <div className={styles.card}>
      <div>
        <div>
          <div
            style={{ backgroundColor: value.brand.bg, color: value.brand.color }}
            className={styles.brand}
          >
            <span>{value.ticker}</span>
          </div>
        </div>
        <div className={styles.title}>{value.name}</div>
        <div className={styles.desc}>{value.country}</div>
      </div>
    </div>
  );
};
