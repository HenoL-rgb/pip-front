//@ts-nocheck
import React, { useRef, useState } from 'react';
import styles from './Apartments.module.scss';
import { useForm } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import Page from '../../../../shared/components/page/Page.component';
import {
  useCreateApartmentMutation,
  useUpdateApartmentMutation,
  useDeleteApartmentMutation,
  useGetApartmentsQuery,
} from '../../model/services/endpoints/endpoints';

export default function Apartments() {
  const { data, refetch } = useGetApartmentsQuery({});
  const [login, { error }] = useCreateApartmentMutation();
  const [update] = useUpdateApartmentMutation();
  const [deleteApartmentMutation] = useDeleteApartmentMutation();
  const { register, handleSubmit } = useForm();
  const nameRef = useRef();
  const cityIdRef = useRef();

  console.log(data);
  function onSubmit(values) {
    const changes = [];
    for (let value in values) {
      const [key, id] = value.split('_');
      const apartment = data.find((apartment) => apartment.id === +id);
      console.log(values[value], apartment?.[key]);

      if (
        apartment &&
        String(values[value]) &&
        String(values[value]) !==
          (apartment[key]?.name ? String(apartment[key]?.name) : String(apartment[key]))
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

  function addApartment() {
    const name = nameRef?.current?.value;
    const cityId = +cityIdRef.current?.value;
    login({ street: name, cityId }).then(() => {
      refetch();
      nameRef.current.value = '';
      cityIdRef.current.value = '';
    });
  }

  function deleteApartment(id: string) {
    deleteApartmentMutation(id).then(() => refetch());
  }

  return (
    <Page>
      <div className={styles.addApartment}>
        <button className={styles.button} onClick={addApartment} title="Add">
          Add
        </button>
        <input className={styles.addInput} ref={nameRef} placeholder='Street' />
        <input className={styles.addInput} ref={cityIdRef} placeholder='City id' />
        <div>{error?.data?.message}</div>
      </div>

      <button className={styles.button} type="submit" onClick={handleSubmit(onSubmit)} title="Save">
        Save
      </button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Street</th>
            <th>City id</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((apartment) => (
            <tr key={apartment.id}>
              {Object.entries(apartment)?.map(([key, value]) => (
                <td key={key}>
                  <input
                    className={styles.input}
                    {...register(`${key}_${apartment.id}`)}
                    defaultValue={value?.name ? value.name : value}
                  />
                </td>
              ))}
              <td>
                <div className={styles.cell} onClick={() => deleteApartment(apartment.id)}>
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
