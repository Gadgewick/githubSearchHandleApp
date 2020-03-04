function watchForm() {
    $('form').submit(event => {
      event.preventDefault(); 
      $('.resultsRepo').empty(); 
      var data = document.getElementById("handle");
      console.log(data.value);
      $(".handleName").replaceWith(`<h2 class="handleName">${handle.value}'s Repositories</h2>`)
      getHandleRepo();
    });
  }
  
  
  $(function() {
    console.log('App is loaded! Please submit value.');
    watchForm();
  });

  function getHandleRepo() {
      console.log(`fetching ${handle.value} repos`);
      fetch (`https://api.github.com/users/${handle.value}/repos`)
      .then(response => {
          if (response.ok) {
              return response.json();
          }
          throw new Error(response.statusText);
        })
      .then(responseJson => displayResults(responseJson))
      .catch(error => {
          $('#js-error-message').text(`Something went wrong: ${error.message}`);       
  });
}

  function displayResults(responseJson) {
      console.log(responseJson);  
      for (let i=0; i < responseJson.length; i++) {
          console.log('outer loop iteration' + i);
          console.log(Object.keys(responseJson[i]));
          $('.resultsRepo').append(`<li><h3>${responseJson[i].name}</h3><p>${responseJson[i].description}</p><p><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p></li>`);
      } 
      $('.results').removeClass('hidden');
  };