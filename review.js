document.getElementById('review-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const rating = document.querySelector('input[name="rating"]:checked');
    const opinion = document.querySelector('textarea[name="opinion"]').value;
    
    if (!rating) {
        alert('Por favor, selecione uma nota!');
        return;
    }
    
    const ratingValue = rating.value;
    
    // Exibir mensagem de confirmação
    document.getElementById('review-message').textContent = `Obrigado pela sua avaliação de ${ratingValue} estrela(s)! Sua opinião: ${opinion}`;
    
    // Limpar o formulário
    this.reset();
});
