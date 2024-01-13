import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { useNavigate } from 'react-router-dom';

const Analytic = () => {
  const [jwtToken, setJwtToken] = useState('');
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const [platform, setPlatform] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [allData, setAllData] = useState([]);
  const [scopes, setScopes] = useState([]);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Table data',
    sheet: 'Data',
  });
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setJwtToken(storedToken);
    } else {
      navigate('/login');
    }
  }, [startDate, endDate, userType, platform, navigate]);
  

  const fetchData = async () => {
    try {
      const accessToken = jwtToken;
      if (!accessToken) {
        return;
      }

      const dateRange = generateDateRange(startDate, endDate);
      const dataByDate = [];
      for (const date of dateRange) {
        const response = await axios.get(
          'https://recruitment-test.gltkdev.com/analytic/click',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              listing_date: date,
              ...(userType && { user_type: userType }), 
              ...(platform && { platform }),
            },
          }
        );
        const dataWithListingDate = response.data.map(item => ({ ...item, listing_date: date }));
        dataByDate.push(dataWithListingDate);
      }

      const combinedData = dataByDate.reduce((accumulator, currentData) => [...accumulator, ...currentData], []);

      setAllData(combinedData);
      const uniqueScopes = [...new Set(combinedData.map(item => item.scope))];
      setScopes(uniqueScopes);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const generateDateRange = (start, end) => {
    const dateList = [];
    let currentDate = new Date(start);
    while (currentDate <= new Date(end)) {
      dateList.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateList;
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  const handleSearch = () => {
    fetchData();
  };

  return (
    <div className="mx-auto p-4 sm:w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
      <div className="flex flex-col md:flex-row justify-between mb-4 ">
        <label className="mb-2 md:mb-0 pt-2">
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="ml-2 border rounded-md p-1 "
          />
        </label>

        <label className="mb-2 md:mb-0 pt-2">
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="ml-2 border rounded-md p-1"
          />
        </label>

        <label className="mb-2 md:mb-0 pt-2">
          User Type:
          <select value={userType}  onChange={(e) => setUserType(e.target.value)}  className="border rounded-md p-1">
            <option value="">All</option>
            <option value="login">Login</option>
            <option value="guest">Guest</option>
          </select>
        </label>

        <label className="mb-2 md:mb-0 pt-2">
          Platform:
          <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="border rounded-md p-1">
            <option value="">All</option>
            <option value="desktop">Desktop</option>
            <option value="responsive">Responsive</option>
            <option value="mobile">Mobile</option>
          </select>
        </label>

        <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white rounded-md">
          Search
        </button>
      </div>

  <div className="overflow-x-auto">
  <table className="w-full border-collapse" ref={tableRef}>
          <thead>
            <tr>
              <th className="border p-2">Scope</th>
              {generateDateRange(startDate, endDate).map((date, i) => (
                <th key={date} className="border p-2">{i + 1}</th>
              ))}
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {scopes.map(scope => (
              <tr key={scope} className="border">
                <td className="border p-2">{scope}</td>
                {generateDateRange(startDate, endDate).map(date => (
                  <td key={`${scope}-${date}`} className="border p-2">
                    {allData.find(item => item.scope === scope && item.listing_date === date)?.count || 0}
                  </td>
                ))}
                <td className="border p-2">
                  {generateDateRange(startDate, endDate).reduce((total, date) => {
                    const count = allData.find(item => item.scope === scope && item.listing_date === date)?.count || 0;
                    return total + count;
                  }, 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  </div>
  <button onClick={onDownload} className="mt-4 p-2 mr-5 bg-green-500 text-white rounded-md"> Export excel </button>
  <button onClick={handleLogout} className="mt-4 p-2 bg-red-500 text-white rounded-md">Logout</button>
</div>

  );
};

export default Analytic;
