import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    console.log('Workouts: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log('Workouts: fetched data', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setWorkouts(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Workouts: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <div className="text-center my-4"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container my-4">
      <h2 className="display-6 fw-bold mb-4">Workouts</h2>
      <div className="row g-4">
        {workouts.length === 0 ? (
          <div className="col-12 text-muted">No workouts found.</div>
        ) : (
          workouts.map((workout, idx) => (
            <div className="col-md-4" key={workout._id || workout.id || idx}>
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-success text-white fw-bold">
                  {workout.name}
                </div>
                <div className="card-body">
                  <p className="card-text">{workout.description}</p>
                  {Array.isArray(workout.exercises) && workout.exercises.length > 0 && (
                    <>
                      <h6 className="fw-bold">Exercises:</h6>
                      <ul className="list-group list-group-flush">
                        {workout.exercises.map((exercise, eIdx) => (
                          <li className="list-group-item" key={eIdx}>
                            {typeof exercise === 'object' ? exercise.name || JSON.stringify(exercise) : exercise}
                          </li>
                        ))}
                      </ul>
                    </>
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

export default Workouts;
