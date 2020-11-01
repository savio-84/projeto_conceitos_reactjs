import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const  [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
      title:`repositorio 4 ${Date.now()}`,
      url:'http://github.com/repository'
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`);
    const repositoryIndex = repositories.findIndex( repository => repository.id === id);
    setRepositories([...repositories.splice(1, repositoryIndex)]);    
    console.log(repositories);
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id} >
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
