//@ts-nocheck
import React, { useCallback, useState } from 'react';
import styles from './OfficeCard.module.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement);

interface OfficeCardProps {
  fullness: number;
  sales: { productId: number; amount: number; productName: string }[];
  title: string;
  isOpenable?: boolean;
  offices?: {}[];
}

const randomColor = (colors: string[]) => {
  let color = Math.floor(Math.random() * 16777215).toString(16);
  while (colors.includes(color)) {
    color = Math.floor(Math.random() * 16777215).toString(16);
  }
  return color;
};

const getFullnessData = (fullness: number) => ({
  datasets: [
    {
      label: '# of Votes',
      data: [fullness, 100 - fullness],
      backgroundColor: ['#f51142', 'transparent'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 1,
      spacing: 1,
      cutout: '85%',
    },
  ],
});

const colors = ['#f51142', '#1698ee', '#f3b20e', '#1ee0e0', '#601beb', '#f08214'];

export default function OfficeCard({
  title,
  fullness,
  sales,
  isOpenable,
  offices,
  totalAmount
}: OfficeCardProps) {
  const [active, setActive] = useState<boolean>(false);
  const data = {
    datasets: [
      {
        label: '# of Votes',
        data: sales.map((sale) => sale.amount),
        backgroundColor: colors,
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        spacing: 5,
        cutout: '85%',
      },
    ],
  };

  const navigate = useNavigate();

  const renderChildCard = (child) => {
    return (
      <div onClick={() => navigate(`/offices/${child.id}`)} className={styles.wrapper} key={child.id}>
        <div className={styles.title}>{child.title}</div>
        <div className={styles.charts}>
          <div className={styles.chart}>
            <div className={styles.chartTitle}>
              <span>{child.totalAmount}</span>
              sales
            </div>
            <Doughnut width={100} height={100} data={data} />
          </div>
          <div className={styles.fullnessChart}>
            <div className={styles.chartTitle}>
              <span>{child.fullness}</span>
              fullness
            </div>
            <Doughnut width={60} height={60} data={getFullnessData(child.fullness)} />
          </div>
        </div>
        <div className={styles.labels}>
          <div>
            {child.sales.map((sale, index) => (
              <div className={styles.label}>
                <div className={styles.labelHeader}>
                  <div
                    style={{
                      height: 10,
                      width: 10,
                      backgroundColor: colors[index],
                      borderRadius: '50%',
                    }}
                  ></div>
                  <div>
                    {sale.productName} ({((sale.amount / child.totalAmount) * 100).toFixed(0)}%)
                  </div>
                </div>
                <div className={styles.labelPart}>
                  {sale.amount} / {child.totalAmount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={styles.wrapper}>
        {isOpenable && (
          <div onClick={() => setActive(!active)} className={styles.arrow}>
            {active ? (
              <RiArrowUpSLine size={24} color="rgb(160, 160, 160)" />
            ) : (
              <RiArrowDownSLine size={24} color="rgb(160, 160, 160)" />
            )}
          </div>
        )}
        <div className={styles.title}>{title}</div>
        <div className={styles.charts}>
          <div className={styles.chart}>
            <div className={styles.chartTitle}>
              <span>{totalAmount}</span>
              sales
            </div>
            <Doughnut width={100} height={100} data={data} />
          </div>
          <div className={styles.fullnessChart}>
            <div className={styles.chartTitle}>
              <span>{fullness}</span>
              fullness
            </div>
            <Doughnut width={60} height={60} data={getFullnessData(fullness)} />
          </div>
        </div>
        <div className={styles.labels}>
          <div>
            {sales.map((sale, index) => (
              <div className={styles.label} key={sale.id}>
                <div className={styles.labelHeader}>
                  <div
                    style={{
                      height: 10,
                      width: 10,
                      backgroundColor: colors[index],
                      borderRadius: '50%',
                    }}
                  ></div>
                  <div>
                    {sale.productName} ({((sale.amount / totalAmount) * 100).toFixed(0)}%)
                  </div>
                </div>
                <div className={styles.labelPart}>
                  {sale.amount} / {totalAmount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {active && (
        <div className={styles.childs}>
          {offices?.map((office) =>
            renderChildCard({
              ...office,
              totalAmount: office.sales.reduce((acc, sale) => (acc += sale.amount), 0),
              title: office.address,
            })
          )}
        </div>
      )}
    </>
  );
}
