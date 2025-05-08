import { useEffect, useState } from 'react';

function Stats() {
  const [postsCount, setPostsCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:8080/api/stats?typestat=count');
      const data = await res.json();
      console.log(data);
      setPostsCount(data.postcount); 
    }
  
    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Stats View</h2>
      <p>{postsCount}</p>
    </div>
  );
}

export default Stats;



