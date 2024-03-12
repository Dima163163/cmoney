import {getYear, getMonth} from './formatDate';

export const filtrChartData = (year, data) => {
  if (!data) return;

  const arrYear = data.filter(item => {
    const accYear = getYear(item.date);
    if (accYear + '' === year) return item;
  });

  const arrSum = new Array(12).fill(0);

  arrYear.forEach(item => {
    const elMonth = getMonth(item.date);
    for (let i = 0; i < arrSum.length; i++) {
      if (+elMonth === i && arrSum[i] < item.balance) {
        arrSum[i] = item.balance;
      }
    }
  });

  for (let i = 0; i < arrSum.length; i++) {
    if (arrSum[i] === 0 && arrSum[i - 1]) {
      arrSum[i] = arrSum[i - 1];
    }
  }

  const labels = [
    'Янв', 'Фев', 'Март',
    'Апр', 'Май', 'Июнь',
    'Июль', 'Авг', 'Сент',
    'Окт', 'Ноя', 'Дек'
  ];

  const chartData = {
    arrSum,
    labels,
    datasets: [
      {
        datasets: '1 Dataset',
        data: arrSum,
        borderWidth: 4,
        borderColor: '#9c19ca',
        backgroundColor: '#9c19ca',
      },
    ],
  };

  return chartData;
};
