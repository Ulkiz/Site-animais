function preview(event) {
  const photo = document.getElementById('petfoto');
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      photo.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function salvarPet() {
  const nome = document.getElementById('petnome').value;
  const idade = document.getElementById('petidade').value;
  const tipo = document.getElementById('pet').value;
  const observacoes = document.getElementById('notas').value;
  const foto = document.getElementById('petfoto').src;

  const pet = { nome, idade, tipo, observacoes, foto };

  const pets = JSON.parse(localStorage.getItem('pets')) || [];
  pets.push(pet);
  localStorage.setItem('pets', JSON.stringify(pets));

  document.getElementById('petnome').value = '';
  document.getElementById('petidade').value = '';
  document.getElementById('pet').value = '';
  document.getElementById('notas').value = '';
  document.getElementById('petfoto').src = 'https://via.placeholder.com/100';
}
