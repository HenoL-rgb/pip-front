import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './Office.module.scss';
import UserCard from './components/UserCard.component';
import SaleCard from './components/SaleCard/SaleCard.component';
import { useGetOfficeQuery } from '../../model/services/endpoints/endpoints';
import { useParams } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

function createDatasets(sales) {
  // Объект, в котором будем хранить датасеты для каждого продукта
  const datasets = {};

  // Проходимся по всем продажам
  sales.forEach((sale) => {
    // Проходимся по каждому продукту в продаже
    sale.products.forEach((product) => {
      // Проверяем, существует ли уже датасет для данного продукта
      if (!datasets[product.productId]) {
        // Если нет, создаем новый массив для этого продукта
        datasets[product.productId] = [];
      }

      // Добавляем количество продаж продукта на текущую дату
      datasets[product.productId].push({
        date: sale.date,
        amount: product.amount,
      });
    });
  });

  return datasets;
}

const mockData = {
  employees: [
    {
      id: 1,
      name: 'Sasha',
    },
    {
      id: 2,
      name: 'Lesha',
    },
    {
      id: 3,
      name: 'Anatoliy',
    },
  ],
  sales: [
    {
      id: 1,
      date: '13/03/2024',
      products: [
        {
          productId: 1,
          amount: 5,
        },
        {
          productId: 2,
          amount: 5,
        },
        {
          productId: 3,
          amount: 5,
        },
      ],
    },
    {
      id: 2,
      date: '12/03/2024',
      products: [
        {
          productId: 1,
          amount: 5,
        },
        {
          productId: 2,
          amount: 5,
        },
        {
          productId: 3,
          amount: 5,
        },
      ],
    },
    {
      id: 3,
      date: '11/03/2024',
      products: [
        {
          productId: 1,
          amount: 5,
        },
        {
          productId: 2,
          amount: 5,
        },
        {
          productId: 3,
          amount: 5,
        },
      ],
    },
    {
      id: 4,
      date: '10/03/2024',
      products: [
        {
          productId: 1,
          amount: 5,
        },
        {
          productId: 2,
          amount: 5,
        },
        {
          productId: 3,
          amount: 5,
        },
      ],
    },
    {
      id: 5,
      date: '09/03/2024',
      products: [
        {
          productId: 1,
          amount: 5,
        },
        {
          productId: 2,
          amount: 5,
        },
        {
          productId: 3,
          amount: 5,
        },
      ],
    },
    {
      id: 6,
      date: '08/03/2024',
      products: [
        {
          productId: 4,
          amount: 2,
        },
        {
          productId: 2,
          amount: 5,
        },
        {
          productId: 3,
          amount: 5,
        },
      ],
    },
  ],
};

export const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};
const colors = ['#f51142', '#1698ee', '#f3b20e', '#1ee0e0', '#601beb', '#f08214'];

console.log(createDatasets(mockData.sales));

export default function Office() {
  const { id } = useParams();
  const { data } = useGetOfficeQuery(id, {
    skip: !id,
  });
  console.log(data);
  const labels = data?.salesForChart.map((sale) => sale.date);
  const mockDataData = data && {
    labels,
    datasets: Object.entries(createDatasets(data?.salesForChart)).map(([key, value]) => {
      return {
        label: 'Product ' + key,
        data: value.map((sale) => sale.amount),
        backgroundColor: colors[+key],
      };
    }),
  };

  if(!data) {
    return <div>Loading...</div>
  }
  return (
    <div className={styles.wrapper}>
      <div>
        <Bar options={options} data={mockDataData} width={1140} height={400} />
        <div className={styles.sales}>
          <div className={styles.title}>List of sales: </div>
          <div>
            {data?.sales.map((sale) => (
              <SaleCard key={sale.id} id={sale.id} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.employees}>
        <div className={styles.title}>Employees: </div>
        {data?.employees.map((employee) => (
          <UserCard key={employee.id} {...employee} />
        ))}
      </div>
    </div>
  );
}
