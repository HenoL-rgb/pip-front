import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '../users/model/services/endpoints/endpoints';
import Page from '../../shared/components/page/Page.component';
import { FaRegUser } from 'react-icons/fa';
import styles from './User.module.scss';

export default function User() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetUserQuery(id ? +id : 0, {
    skip: !id,
  });
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <Page>
      <div className={styles.wrapper}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>
            <FaRegUser size={80} />
          </div>
        </div>
        <div className={styles.info}>
          <div>Email: <span>{data.email}</span></div>
          <div>Position: <span>{data.position?.name}</span></div>
          <div>Name: <span>{data.name}</span></div>
          <div>Surname: <span>{data.surname}</span></div>
          <div>Age: <span>{data.age}</span></div>
          <div>Apartment: <span>{data.apartment.street}</span></div>

        </div>
      </div>
    </Page>
  );
}
