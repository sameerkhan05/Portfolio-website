import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

const LeetCodeProfile = () => {
  const username = 'sameerkhanyt09';  // Hardcoded username
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
        setProfileData(response.data);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);

  const chartData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        label: 'Problems Solved',
        data: profileData ? [profileData.easySolved, profileData.mediumSolved, profileData.hardSolved, profileData.username] : [0, 0, 0],
        data2: profileData ? [profileData.totalQuestions, profileData.ranking, profileData.contributionPoints, profileData.username] : [0, 0, 0],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
        hoverBackgroundColor: ['#66bb6a', '#ffa726', '#e57373'],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-8 pt-16">LeetCode Profile</h1>
      {loading && <div className="text-yellow-400">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {profileData && (
        <div className="w-full max-w-4xl shadow-lg rounded-lg p-4 flex flex-col md:flex-row gap-4">
          <div className='flex flex-col  justify-center'>
          <h2 className="text-4xl font-semibold mb-4">👨🏼‍💻 <span  className='bg-gradient-to-r from-purple-300 via-slate-00 to-purple-100 bg-clip-text text-4xl tracking-tight text-transparent'>  {username} </span></h2>
          <p className="mb-2 text-lg font-semibold">Total Problems Solved : {profileData.totalSolved} / {profileData.totalQuestions}</p>
          <p className="mb-6 text-lg font-semibold">Acceptance Rate : {profileData.acceptanceRate}%</p>
          <p className="mb-6 text-lg font-semibold">Ranking : {profileData.ranking}</p>
          </div>
          <div className="w-full">
            <Doughnut
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Problems Solved by Difficulty',
                  },
                },
              }}
              className="h-96"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LeetCodeProfile;
