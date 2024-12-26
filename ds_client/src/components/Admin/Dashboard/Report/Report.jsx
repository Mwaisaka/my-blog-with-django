import React, {useState, useEffect} from 'react';
import {Chart as ChartJS, ArcElement,BarElement, CategoryScale, LinearScale, Tooltip, Legend} from "chart.js";
import {Bar, Doughnut } from "react-chartjs-2";

import "./report.css";

ChartJS.register(
  Tooltip, Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement
)

const Report = () => {

  const [chart, setChart] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {

      await fetch ('http://127.0.0.1:5555/accounts',{
        method: 'GET',
        headers: {
          'Content-Type':'apllication/json',
        }
      }).then((response)=>{
        response.json().then((json)=>{
          console.log(json)
          setChart(json)
        })
      }).catch(error => {
        console.log(error);
      })

      // try {
      //   const response = await fetch('http://127.0.0.1:5555/accounts');
      //   if (!response.ok) {
      //     throw new Error('Failed to fetch data');
      //   }
      //   const data = await response.json();
      //   setChart(data);
      // } catch (error) {
      //   console.error('Error fetching data:', error.message);
      //   setChart([]); 
      // }
    };

    fetchStudents();
  }, []);


  const getStatusCounts = () => {
    const statusCounts = {
      paid: 0,
      pending: 0,
      overdue: 0,
    };

    chart.forEach((student) => {
      statusCounts[student.fee_status]++;
    });

    return statusCounts;
  };

  const getStatusPercentages = () => {
    const statusCounts = getStatusCounts();
    const totalCount = chart.length;
    const statusPercentages = {};

    for (const status in statusCounts) {
      statusPercentages[status] = ((statusCounts[status] / totalCount) * 100).toFixed(2);
    }

    return statusPercentages;
  }; 

  const totalPaid = chart.reduce((acc, student) => acc + student.paid, 0);
  const totalBalance = chart.reduce((acc, student) => acc + student.balance, 0);


  var data = {
    labels:Object.keys(getStatusCounts()),
    datasets: [{
      label:'# Status of the Fees Payment for Students',
      data:Object.values(getStatusPercentages()),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Percentage of students (%)',
        font: {
          size: 16,
        },
      },
    },
    x: {
      title: {
        display: true,
        text: 'Fee Status',
        font: {
          size: 16,
        },
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        fontSize: 14,
      },
    },
  },
};

// Data for Chart 2 - Total Paid vs Total Balance
const totalData = {
  labels: ['Total Paid', 'Total Balance'],
  datasets: [
    {
      label: 'Total Paid vs Total Balance',
      data: [totalPaid, totalBalance],
      backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 1,
    },
  ],
};

const optionsTotal = {
  maintainAspectRatio: false,
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      title: {
        display: true,
        text: 'Amount',
        font: {
          size: 16,
        },
      },
      ticks: {
        callback: function (value, index, values) {
          return '$' + value.toLocaleString();
        },
      },
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      title: {
        display: true,
        text: 'Percentage (%)',
        font: {
          size: 16,
        },
      },
      ticks: {
        suggestedMin: 0,
        suggestedMax: 100,
        callback: function (value, index, values) {
          return value + '%';
        },
      },
    },
    x: {
      title: {
        display: true,
        text: 'Total',
        font: {
          size: 16,
        },
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        fontSize: 14,
      },
    },
  },
};



  return (
    <div className='Report'>
    <div className='dataCard revenueCard'> 
    <Bar
    data={data}
    height={400}
    options={options}
    
    />
    
    </div>

    <div className='dataCard customerCard'>
    <Bar data={totalData} options={optionsTotal} />
    
    </div>

    <div className='dataCard categoryCard'>
    <Doughnut 
    data={data}
    height={400}
    options={options}
    
    />
    
    </div>
      
    </div>
  )
}

export default Report