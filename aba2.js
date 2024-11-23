function exibirPets() {
  const container = document.getElementById('pets-container');

  // Carregar pets da API
  fetch('') //api
    .then(response => response.json())
    .then(pets => {
      // Se dados vierem da API, vai usar ela, se nao, uas o local
      if (pets.length === 0) {
        container.innerHTML = '<p>Nenhum pet registrado ainda.</p>';
        carregarPetsDoLocalStorage(container); // Carrega os dados do localStorage 
      } else {
        container.innerHTML = ''; // Limpa a área antes de adicionar novos cards
        pets.forEach(pet => exibirCardPet(pet, container));
      }
    })
    .catch(error => {
      console.error('Erro ao carregar os pets da API:', error);
      container.innerHTML = '<p>Erro ao carregar os pets da API. Carregando dados do localStorage...</p>';
      carregarPetsDoLocalStorage(container); // Carrega o localStorage caso a API falhe
    });
}

function carregarPetsDoLocalStorage(container) {
  const pets = JSON.parse(localStorage.getItem('pets')) || [];

  if (pets.length === 0) {
    container.innerHTML = '<p>Nenhum pet registrado ainda.</p>';
    return;
  }

  container.innerHTML = ''; // Limpa a área antes de adicionar novos cards
  pets.forEach(pet => exibirCardPet(pet, container));
}

function exibirCardPet(pet, container) {
  const petCard = document.createElement('div');
  petCard.classList.add('pet-card');

  const img = document.createElement('img');
  img.src = pet.foto;
  img.alt = 'Foto do Pet';
  img.classList.add('pet-foto');

  const info = document.createElement('div');
  info.classList.add('info');
  info.innerHTML = `
    <h3>${pet.nome}</h3>
    <p><strong>Idade:</strong> ${pet.idade} anos</p>
    <p><strong>Tipo:</strong> ${pet.tipo}</p>
    <p><strong>Observações:</strong> ${pet.observacoes || 'Nenhuma'}</p>
  `;

  petCard.appendChild(img);
  petCard.appendChild(info);

  const verMaisBtn = document.createElement('button');
  verMaisBtn.textContent = 'Ver mais';
  verMaisBtn.classList.add('ver-mais-botao');
  verMaisBtn.onclick = () => alternarInformacoes(pet, petCard); // Alterna as informações ao clicar

  petCard.appendChild(verMaisBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Excluir';
  deleteBtn.classList.add('excluir');
  deleteBtn.onclick = () => excluirPet(pet.id); // Supondo que o pet tenha um 'id'

  petCard.appendChild(deleteBtn);
  container.appendChild(petCard);
}

// Função para alternar a exibição das informações adicionais
function alternarInformacoes(pet, petCard) {
  // Verifica se as informações adicionais já estão visíveis
  let infoAdicional = petCard.querySelector('.info-adicional');

  if (!infoAdicional) {
    // Se não houver, cria as informações adicionais
    infoAdicional = document.createElement('div');
    infoAdicional.classList.add('info-adicional');
    infoAdicional.innerHTML = `
      <p><strong>Temperatura:</strong> ${pet.temperatura || 'N/D'}</p>
      <p><strong>Saúde:</strong> ${pet.saude || 'N/D'}</p>
      <p><strong>Localização:</strong> ${pet.localizacao || 'N/D'}</p>
    `;
    petCard.appendChild(infoAdicional);
  } else {
    //se ja tiver sido apertado, fecha
    petCard.removeChild(infoAdicional);
  }
}

// Função para excluir o pet (na API e no localStorage)
function excluirPet(id) {
  // DELETE para excluir o pet na API
  fetch(`https://sua-api.com/pets/${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      exibirPets(); // Atualiza a lista após excluir o pet
    })
    .catch(error => {
      console.error('Erro ao excluir o pet da API:', error);
    });

  //Excluir o pet também do localStorage
  const pets = JSON.parse(localStorage.getItem('pets')) || [];
  const index = pets.findIndex(pet => pet.id === id);
  if (index !== -1) {
    pets.splice(index, 1);
    localStorage.setItem('pets', JSON.stringify(pets));
    exibirPets(); //Atualiza a lista
  }
}

//exibição dos pets quando carregar a página
window.onload = exibirPets;
