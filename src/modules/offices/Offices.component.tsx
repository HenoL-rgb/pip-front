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
    country: null,
    city: null,
  });
  const [offices, setOffices] = useState([]);
  console.log(data)

  useEffect(() => {
    // if (data) {
    if (filter.country) {
      setOffices(mockOffices.filter((country) => country.country === filter.country));
    } else {
      setOffices(mockOffices);
    }
    // }
  }, [data, filter]);

  function findQuery() {
    for (let country of mockOffices) {
      if (country.country.includes(query)) {
        setFilter({ ...filter, country: country.country });
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
              borderBottomColor: filter.country === null ? 'red' : 'transparent',
            }}
            onClick={() => setFilter({ country: null, city: null })}
          >
            All offices
          </div>
          {mockOffices.map((country) => (
            <div
              onClick={() => setFilter({ ...filter, country: country.country })}
              key={country.country}
              className={styles.tab}
              style={{
                borderBottomColor: filter.country === country.country ? 'red' : 'transparent',
              }}
            >
              {country.country}
            </div>
          ))}
        </div>
        <div className={styles.offices}>
          {offices.map((country) => (
            <OfficeCard
              key={country.country}
              isOpenable={true}
              sales={country.sales}
              title={country.country}
              fullness={country.fullness}
              offices={country.cities.reduce((acc, city) => {
                const offices = city.offices.map((office) => ({
                  ...office,
                  address: `${city.city}, ${office.address}`,
                }));
                return [...acc, ...offices];
              }, [])}
            />
          ))}
        </div>
      </div>
    </Page>
  );
}
