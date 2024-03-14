//@ts-nocheck
import React, { useRef, useState } from 'react';
import styles from './Sales.module.scss';
import { useForm } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import Page from '../../../../shared/components/page/Page.component';
import {
  useCreateSaleMutation,
  useDeleteSaleMutation,
  useGetSalesQuery,
} from '../../model/services/endpoints/endpoints';

export default function Sales() {
  const { data, refetch } = useGetSalesQuery({});
  const [login, { error }] = useCreateSaleMutation();
  const [deleteSaleMutation] = useDeleteSaleMutation();
  const nameRef = useRef();
  const amountRef = useRef();
  const apartmentIdRef = useRef();
  const dateRef = useRef();

  function addSale() {
    const productId = +nameRef?.current?.value;
    const amount = +amountRef?.current?.value;
    const apartmentId = +apartmentIdRef?.current?.value;
    const date = dateRef.current.value;
    login({ productId, amount, apartmentId, date }).then(() => {
      refetch();
      nameRef.current.value = '';
      amountRef.current.value = '';
      apartmentIdRef.current.value = '';
    });
  }

  function deleteSale(id: string) {
    deleteSaleMutation(id).then(() => refetch());
  }

  return (
    <Page>
      <div className={styles.addSale}>
        <button className={styles.button} onClick={addSale} title="Add">
          Add
        </button>
        <input className={styles.addInput} ref={nameRef} placeholder="Product id" />
        <input className={styles.addInput} ref={amountRef} placeholder="Amount" />
        <input className={styles.addInput} ref={apartmentIdRef} placeholder="Apartment id" />
        <input className={styles.addInput} ref={dateRef} placeholder="Date" type="date" />
        <div>{error?.data?.message}</div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Apartment id</th>
            <th>Product id</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((sale) => (
            <tr key={sale.id}>
              {Object.entries(sale)?.map(([key, value]) => (
                <td key={key}>{value?.name ? value.name : value}</td>
              ))}
              <td>
                <div className={styles.cell} onClick={() => deleteSale(sale.id)}>
                  <MdDelete size={24} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  );
}
