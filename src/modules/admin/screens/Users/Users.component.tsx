//@ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { useGetUsersQuery } from '../../../users/model/services/endpoints/endpoints';
import { useForm } from 'react-hook-form';
import styles from './Users.module.scss';
import Page from '../../../../shared/components/page/Page.component';
import { useLoginMutation } from '../../../login/model/services/loginByEmail';
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '../../model/services/endpoints/endpoints';
import { MdDelete } from 'react-icons/md';

export default function Users() {
  const { data, refetch } = useGetUsersQuery();
  const [login, { error }] = useCreateUserMutation();
  const [update] = useUpdateUserMutation();
  const [deleteUserMutation] = useDeleteUserMutation();
  const { register, handleSubmit } = useForm();
  const [addError, setAddError] = useState('');
  const loginRef = useRef();
  const passwordRef = useRef();

  console.log(data);
  function onSubmit(values) {
    const changes = [];
    for (let value in values) {
      const [key, id] = value.split('_');
      const user = data.find((user) => user.id === +id);
      console.log(values[value], user?.[key]);

      if (
        user &&
        String(values[value]) &&
        String(values[value]) !== (user[key]?.name ? String(user[key]?.name) : String(user[key]))
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

  function addUser() {
    const email = loginRef?.current?.value;
    const password = passwordRef?.current?.value;

    login({ email, password })
      .then(() => {
        refetch();
        loginRef.current.value = '';
        passwordRef.current.value = '';
      })
      .catch((e) => {
        setAddError(e);
        console.log(e);
      });
  }

  function deleteUser(id: string) {
    deleteUserMutation(id).then(() => refetch());
  }

  console.log(error);
  return (
    <Page>
      <div className={styles.addUser}>
        <button className={styles.button} onClick={addUser} title="Add">
          Add
        </button>
        <input className={styles.addInput} ref={loginRef} type="email" />
        <input className={styles.addInput} ref={passwordRef} />
        <div>{error?.data?.message}</div>
      </div>

      <button className={styles.button} type="submit" onClick={handleSubmit(onSubmit)} title="Save">
        Save
      </button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Apartment</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>Position</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr>
              {Object.entries(user)?.map(([key, value]) => (
                <td>
                  <input
                    className={styles.input}
                    {...register(`${key}_${user.id}`)}
                    defaultValue={(key === 'apartment' && value) ? value.id : value?.name ? value.name : value}
                  />
                </td>
              ))}
              <td>
                <div className={styles.cell} onClick={() => deleteUser(user.id)}>
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
