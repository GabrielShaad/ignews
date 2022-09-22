import styles from "./styles.module.scss";

type SubscribreProps = {
  priceId: string;
};

export function SubscribeButton({ priceId }: SubscribreProps) {
  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe now
    </button>
  );
}
