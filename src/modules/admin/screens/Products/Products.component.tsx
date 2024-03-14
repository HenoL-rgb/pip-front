//@ts-nocheck
import React, { useRef, useState } from 'react';
import styles from './Products.module.scss';
import { useForm } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import Page from '../../../../shared/components/page/Page.component';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../model/services/endpoints/endpoints';

export default function Products() {
  const { data, refetch } = useGetProductsQuery({});
  const [login, { error }] = useCreateProductMutation();
  const [update] = useUpdateProductMutation();
  const [deleteProductMutation] = useDeleteProductMutation();
  const { register, handleSubmit } = useForm();
  const nameRef = useRef();
  const amountRef = useRef();
  const apartmentIdRef = useRef();

  console.log(data);
  function onSubmit(values) {
    const changes = [];
    for (let value in values) {
      const [key, id] = value.split('_');
      const product = data.find((product) => product.id === +id);
      console.log(values[value], product?.[key]);

      if (
        product &&
        String(values[value]) &&
        String(values[value]) !==
          (product[key]?.name ? String(product[key]?.name) : String(product[key]))
      ) {
        changes.push({ id, [key]: values[value] });
      }
    }

    Promise.all(
      changes.map((change) => {
        const { id, ...rest } = change;
        update({ id, dto: rest });
      })
    ).then(() => refetch());
    console.log(changes);
  }

  function addProduct() {
    const name = nameRef?.current?.value;
    const amount = +amountRef?.current?.value;
    const apartmentId = +apartmentIdRef?.current?.value;
    login({ name, amount, apartmentId }).then(() => {
      refetch();
      nameRef.current.value = '';
      amountRef.current.value = '';
      apartmentIdRef.current.value = '';
    });
  }

  function deleteProduct(id: string) {
    deleteProductMutation(id).then(() => refetch());
  }

  return (
    <Page>
      <div className={styles.addProduct}>
        <button className={styles.button} onClick={addProduct} title="Add">
          Add
        </button>
        <input className={styles.addInput} ref={nameRef} placeholder='Name' />
        <input className={styles.addInput} ref={amountRef} placeholder='Amount' />
        <input className={styles.addInput} ref={apartmentIdRef} placeholder='Apartment id' />
        <div>{error?.data?.message}</div>
      </div>

      <button className={styles.button} type="submit" onClick={handleSubmit(onSubmit)} title="Save">
        Save
      </button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Apartment id</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((product) => (
            <tr key={product.id}>
              {Object.entries(product)?.map(([key, value]) => (
                <td key={key}>
                  <input
                    className={styles.input}
                    {...register(`${key}_${product.id}`)}
                    defaultValue={value?.name ? value.name : value}
                  />
                </td>
              ))}
              <td>
                <div className={styles.cell} onClick={() => deleteProduct(product.id)}>
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
