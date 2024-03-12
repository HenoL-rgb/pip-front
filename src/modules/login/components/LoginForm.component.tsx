import styles from './LoginForm.module.scss';
import Text from '../../../shared/components/text/Text.component';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../model/services/loginByEmail';
import { useNavigate } from 'react-router-dom';

const defaultValues = {
  login: '',
  password: '',
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({ defaultValues });

  const navigate = useNavigate();

  const [loginMutation, { isSuccess }] = useLoginMutation();
  function onSubmit({ login, password }: { login: string; password: string }) {
    loginMutation({ email: login, password }).then(() => navigate('/'));
  }

  return (
    <div className={styles.wrapper}>
      <Text text="Login" variant="header" />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input className={styles.input} {...register('login')} placeholder="Bill" />
        {errors?.login && <p>{errors.login.message}</p>}

        <input
          className={styles.input}
          {...register('password')}
          type="password"
          placeholder="Luo"
        />
        <input className={styles.submit} type="submit" value="Submit" />
      </form>
    </div>
  );
}
