import React, { useEffect, useState } from 'react';
import styles from './Users.module.scss';
import { useGetUsersQuery } from './model/services/endpoints/endpoints';
import { CiSearch } from 'react-icons/ci';
import Page from '../../shared/components/page/Page.component';
import UserCard from '../offices/components/office/components/UserCard.component';

export default function Users() {
  const { data } = useGetUsersQuery();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) {
      if (filter) {
        setUsers(data.filter((user) => user.email.includes(filter)));
      } else {
        setUsers(data);
      }
    }
  }, [data, filter]);

  if (!data) {
    return <div>Loading...</div>;
  }
  console.log(data);

  function findQuery() {
    setFilter(query);
  }

  return (
    <Page>
      <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
          <CiSearch size={24} />
          <input
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                findQuery();
              }
            }}
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className={styles.users}>
          {users.map((user) => (
            <UserCard key={user.id} {...user} name={user.email} />
          ))}
        </div>
      </div>
    </Page>
  );
}
