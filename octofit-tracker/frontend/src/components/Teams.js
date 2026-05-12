import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    console.log('Teams: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log('Teams: fetched data', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setTeams(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <div className="text-center my-4"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container my-4">
      <h2 className="display-6 fw-bold mb-4">Teams</h2>
      <div className="row g-4">
        {teams.length === 0 ? (
          <div className="col-12 text-muted">No teams found.</div>
        ) : (
          teams.map((team, idx) => (
            <div className="col-md-4" key={team._id || team.id || idx}>
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-primary text-white fw-bold">
                  {team.name}
                </div>
                <div className="card-body">
                  <h6 className="card-title">Members</h6>
                  {Array.isArray(team.members) && team.members.length > 0 ? (
                    <ul className="list-group list-group-flush">
                      {team.members.map((member, mIdx) => (
                        <li className="list-group-item" key={mIdx}>
                          {typeof member === 'object' ? member.username || JSON.stringify(member) : member}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No members.</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Teams;
