//@ts-nocheck
import React, { useRef, useState } from 'react';
import styles from './Cities.module.scss';
import { useForm } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import Page from '../../../../shared/components/page/Page.component';
import {
  useCreateCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
  useGetCitiesQuery,
} from '../../model/services/endpoints/endpoints';

export default function Citys() {
  const { data, refetch } = useGetCitiesQuery({});
  const [login, { error }] = useCreateCityMutation();
  const [update] = useUpdateCityMutation();
  const [deleteCityMutation] = useDeleteCityMutation();
  const { register, handleSubmit } = useForm();
  const nameRef = useRef();

  console.log(data);
  function onSubmit(values) {
    const changes = [];
    for (let value in values) {
      const [key, id] = value.split('_');
      const city = data.find((city) => city.id === +id);
      console.log(values[value], city?.[key]);

      if (
        city &&
        String(values[value]) &&
        String(values[value]) !==
          (city[key]?.name ? String(city[key]?.name) : String(city[key]))
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

  function addCity() {
    const name = nameRef?.current?.value;
    login({ name }).then(() => {
      refetch();
      nameRef.current.value = '';
    });
  }

  function deleteCity(id: string) {
    deleteCityMutation(id).then(() => refetch());
  }

  return (
    <Page>
      <div className={styles.addCity}>
        <button className={styles.button} onClick={addCity} title="Add">
          Add
        </button>
        <input className={styles.addInput} ref={nameRef} />
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
          </tr>
        </thead>
        <tbody>
          {data?.map((city) => (
            <tr key={city.id}>
              {Object.entries(city)?.map(([key, value]) => (
                <td key={key}>
                  <input
                    className={styles.input}
                    {...register(`${key}_${city.id}`)}
                    defaultValue={value?.name ? value.name : value}
                  />
                </td>
              ))}
              <td>
                <div className={styles.cell} onClick={() => deleteCity(city.id)}>
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
