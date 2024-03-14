import React from 'react';
import { FaRegUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './UserCard.module.scss';

interface UserCardProps {
  name: string;
  id: number;
}

export default function UserCard({ name, id }: UserCardProps) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/users/' + id)} className={styles.wrapper}>
      <FaRegUser size={24} />

      <div className={styles.name}>{name}</div>
    </div>
  );
}
