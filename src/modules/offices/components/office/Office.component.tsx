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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

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
      productId: 1,
      amount: 10,
    },
    {
      id: 2,
      date: '12/03/2024',
      productId: 1,
      amount: 10,
    },
    {
      id: 3,
      date: '11/03/2024',
      productId: 1,
      amount: 10,
    },
    {
      id: 4,
      date: '10/03/2024',
      productId: 1,
      amount: 10,
    },
    {
      id: 5,
      date: '09/03/2024',
      productId: 1,
      amount: 10,
    },
    {
      id: 6,
      date: '08/03/2024',
      productId: 1,
      amount: 10,
    },
  ],
};

const labels = mockData.sales.map(sale => sale.date);
export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map((item, index) => mockData.sales[index].amount),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export default function Office() {
  return (
    <div>
      <Bar data={data} width={1240} height={400} />
    </div>
  );
}
