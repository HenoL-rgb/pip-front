import React from 'react';
import { useGetSaleQuery } from '../../../../model/services/endpoints/endpoints';
import styles from './SaleCard.module.scss';

interface SaleCardProps {
  id: number;
}

export default function SaleCard({ id }: SaleCardProps) {
  const { data, isLoading, isError } = useGetSaleQuery(id);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Sale is not found</div>;
  }
  console.log(data);
  return (
    <div className={styles.wrapper}>
      <div> {data.product.name}</div>
      <div> {data.amount}</div>
      <div> {data.date.toString()}</div>
    </div>
  );
}
