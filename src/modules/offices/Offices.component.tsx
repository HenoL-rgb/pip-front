//@ts-nocheck
import React, { useEffect, useState } from 'react';
import styles from './Offices.module.scss';
import Page from '../../shared/components/page/Page.component';
import OfficeCard from './components/officeCard/OfficeCard.component';
import { useGetOfficesQuery } from './model/services/endpoints/endpoints';
import { mockOffices } from './data';
import { CiSearch } from 'react-icons/ci';

export default function Offices() {
  const { data } = useGetOfficesQuery();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState({
    city: null,
  });
  const [offices, setOffices] = useState([]);
  console.log(data);

  useEffect(() => {
     if (data) {
    if (filter.city) {
      setOffices(data.filter((city) => city.city === filter.city));
    } else {
      setOffices(data);
    }
     }
  }, [data, filter]);

  function findQuery() {
    for (let city of mockOffices) {
      if (city.city.includes(query)) {
        setFilter({ ...filter, city: city.city });
      }
    }
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
        <div className={styles.tabs}>
          <div
            className={styles.tab}
            style={{
              borderBottomColor: filter.city === null ? 'red' : 'transparent',
            }}
            onClick={() => setFilter({ city: null })}
          >
            All offices
          </div>
          {data?.map((city) => (
            <div
              onClick={() => setFilter({ ...filter, city: city.city })}
              key={city.city}
              className={styles.tab}
              style={{
                borderBottomColor: filter.city === city.city ? 'red' : 'transparent',
              }}
            >
              {city.city}
            </div>
          ))}
        </div>
        <div className={styles.offices}>
          {offices.map((city) => (
            <OfficeCard
              key={city.city}
              isOpenable={true}
              sales={city.sales}
              title={city.city}
              totalAmount={city.totalAmount}
              fullness={city.fullness}
              offices={city.apartments.map((office) => ({
                ...office,
                address: `${city.city}, ${office.street}`,
              }))}
            />
          ))}
        </div>
      </div>
    </Page>
  );
}
