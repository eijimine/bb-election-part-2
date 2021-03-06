document.addEventListener("DOMContentLoaded", function() {

var candidates = document.getElementById('candidates');



$.ajax({
    url:  'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    dataType: 'json'
  }).done(function(data) {
      data.candidates.forEach(function(d) {
        var li = document.createElement('li');
        var name = 'Name: '
        var vote = ' Votes: '
        var form = document.createElement('form');
        var submit = document.createElement('button');
        var id = document.createElement('input');

        id.name = 'id';
        id.setAttribute('value', d.id);
        id.setAttribute("hidden", true);

        submit.className = 'button';
        submit.innerHTML = 'Vote!';

        // form.setAttribute('method', 'POST');
        // form.setAttribute('action', 'https://bb-election-api.herokuapp.com/vote');
        form.append(submit);
        form.append(id);

          li.append(name);
          li.append(d.name);
          li.append(vote);
          li.append(d.votes);
          li.append(form);
          candidates.append(li);

        submit.addEventListener('click', function(e) {

          e.preventDefault();

          var val = this.parentNode.querySelector('input').value;

          $.ajax({
            url: 'https://bb-election-api.herokuapp.com/vote',
            method: 'POST',
            data: {'id': val},
            dataType: 'json'
          }).done(function(data) {


            // EASY WAY =  window.location.reload();
            //HARD WAY = below 
            ul = document.querySelector('#candidates');
            ul.innerHTML = '';

            $.ajax({
                url:  'https://bb-election-api.herokuapp.com/',
                method: 'GET',
                dataType: 'json'
              }).done(function(d) {

                  d.candidates.forEach(function(d) {
                  var li = document.createElement('li');
                  var name = 'Name: '
                  var vote = ' Votes: '
                  var form = document.createElement('form');
                  var submit = document.createElement('button');
                  var id = document.createElement('input');

                  id.name = 'id';
                  id.setAttribute('value', d.id);
                  id.setAttribute("hidden", true);

                  submit.className = 'button';
                  submit.innerHTML = 'Vote!';

                  // form.setAttribute('method', 'POST');
                  // form.setAttribute('action', 'https://bb-election-api.herokuapp.com/vote');
                  form.append(submit);
                  form.append(id);

                    li.append(name);
                    li.append(d.name);
                    li.append(vote);
                    li.append(d.votes);
                    li.append(form);
                    candidates.append(li);


              });

            }).fail(function() {
                console.log('Request has failed');

            });




          })

        })

      });
  });





});
