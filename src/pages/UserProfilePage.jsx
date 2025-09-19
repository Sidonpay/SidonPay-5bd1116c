import React, { useEffect, useState } from "react";
import { fetchUsers } from "../data/adminApi";

const UserProfilePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    let mounted = true;
    fetchUsers().then(res=>{
      if(!mounted) return;
      if(res.success) setUsers(res.data || []);
      setLoading(false);
    })
    return ()=>{ mounted = false }
  },[])

  return (
    <div className="px-3 md:px-6">
      <div className="flex py-8 justify-between">
        <h1 className="font-inter text-4xl font-bold text-brand_color2">Users</h1>
      </div>
      {loading ? <p>Loading users...</p> : (
        <div className="grid gap-3">
          {users.map(u => (
            <div key={u.id} className="p-4 border rounded-md flex justify-between items-center">
              <div>
                <div className="font-semibold">{u.name}</div>
                <div className="text-xs text-mid_gray">{u.email}</div>
              </div>
              <div className="text-sm">{u.role}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
};

export default UserProfilePage;
