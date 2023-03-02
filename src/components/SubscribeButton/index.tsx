import { signIn, useSession } from 'next-auth/react';
import { getStripeJs } from '../../services/stripe-js';
import api from '../../services/api';
import styles from './styles.module.scss';

type SubscribreProps = {
  priceId: string;
};

export function SubscribeButton({ priceId }: SubscribreProps) {
  const { data: session } = useSession();

  async function handleSubscribe() {
    if (!session) {
      signIn('github');
      return;
    }

    try {
      const response = await api.post('/subscribe');
      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      alert(error);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}
