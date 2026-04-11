import  { useEffect } from 'react';
import { useState } from 'react';

export default function Datafile() {
    
    const [users, setUsers] = useState<any[]>();
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {setUsers(data);
        setLoading(false);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
    })
    .finally(() => {
        setLoading(false);
      });
}, []);

    const normalizedSearch = search.trim().toLowerCase();
    const filteredUsers = users?.filter((user: any) => {
        const name = String(user?.name ?? '').toLowerCase();
        const email = String(user?.email ?? '').toLowerCase();
        return name.includes(normalizedSearch) || email.includes(normalizedSearch);
    });
    

    if (loading) return <div className="status">📡 Loading users...</div>;
    if (error) return <div className="status error">⚠️ Error: {error}</div>;
  return (
        <div style={{ padding: '20px' ,fontFamily: 'Arial, sans-serif'}}>
            <h3>Employee Directory</h3>
                <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} style={{padding:'10px', width:'100%'}} />

                {/* //Display Data */}
    <div >
        {filteredUsers?.map((user) => (
            <div key={user.id} style={{border:'1px solid #ccc', padding:'10px', margin:'10px 0'}}>
                <p><strong>Company:</strong> {user.company.name}</p>
            <h1> <div style={{    fontSize: 35,
        lineHeight: '118%',
        letterSpacing: '-0.24px',
        margin: '0 0 8px'}}>{user.name}</div></h1>
                <p><strong>Email:</strong> {user.email.toLowerCase()}</p>
                
            </div>
        ))}
    </div>
        
        </div>
  );
}   