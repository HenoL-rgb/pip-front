//@ts-nocheck
import React, { useRef, useState } from 'react';
import styles from './Positions.module.scss';
import { useForm } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import Page from '../../../../shared/components/page/Page.component';
import {
  useCreatePositionMutation,
  useUpdatePositionMutation,
  useDeletePositionMutation,
  useGetPositionsQuery,
} from '../../model/services/endpoints/endpoints';

export default function Positions() {
  const { data, refetch } = useGetPositionsQuery({});
  const [login, { error }] = useCreatePositionMutation();
  const [update] = useUpdatePositionMutation();
  const [deletePositionMutation] = useDeletePositionMutation();
  const { register, handleSubmit } = useForm();
  const nameRef = useRef();

  console.log(data);
  function onSubmit(values) {
    const changes = [];
    for (let value in values) {
      const [key, id] = value.split('_');
      const position = data.find((position) => position.id === +id);
      console.log(values[value], position?.[key]);

      if (
        position &&
        String(values[value]) &&
        String(values[value]) !==
          (position[key]?.name ? String(position[key]?.name) : String(position[key]))
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

  function addPosition() {
    const name = nameRef?.current?.value;
    login({ name }).then(() => {
      refetch();
      nameRef.current.value = '';
    });
  }

  function deletePosition(id: string) {
    deletePositionMutation(id).then(() => refetch());
  }

  return (
    <Page>
      <div className={styles.addPosition}>
        <button className={styles.button} onClick={addPosition} title="Add">
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
          {data?.map((position) => (
            <tr key={position.id}>
              {Object.entries(position)?.map(([key, value]) => (
                <td key={key}>
                  <input
                    className={styles.input}
                    {...register(`${key}_${position.id}`)}
                    defaultValue={value?.name ? value.name : value}
                  />
                </td>
              ))}
              <td>
                <div className={styles.cell} onClick={() => deletePosition(position.id)}>
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
