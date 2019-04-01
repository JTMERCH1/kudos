const render = function (dataList) {
    $('#kudos').empty();
    for (let i = 0; i < dataList.length; i++) {
      $('#kudos')
        .append(
        `<div class='card'>
            <h5>${dataList[i].title}</h5>
            <h6>From: ${dataList[i].from[0].name}</h6> 
          <div class='card-body'>
            <h6>To: ${dataList[i].to[0].name}</h6>
            <p>${dataList[i].body}</p>
          </div>
        </div>`
        );
    }
  }
  
  const getKudos = function () {
    $.get(`/api/kudo/`)
      .then(function (data) {
        render(data)
      });
  }
  
  const getUsers = function () {
    $.get(`/api/user/`)
      .then(function (data) {
        for (let i = 0; i < data.length; i++) {
          $('#kudo-from')
            .append(`<option value='${data[i]._id}'>${data[i].name}</option>`)
          $('#kudo-to')
          .append(`<option value='${data[i]._id}'>${data[i].name}</option>`)
        }
      });
  }
  
  const postKudo = function (event) {
    event.preventDefault();
    $('#messages').empty();
  
    if($('#kudo-from').val() && $('#kudo-to').val()){
  
      const kudo = {
        title: $('#kudo-title').val().trim(),
        body: $('#kudo-body').val().trim(),
        from: $('#kudo-from').val(),
        to: $('#kudo-to').val()
      }

      $.post('/api/kudo', kudo)
        .then(function (data) {
          $('#kudo-title').val('');
          $('#kudo-body').val('');
          $('#kudo-from').val('');
          $('#kudo-to').val('');
          $('.modal').modal('hide');
          getKudos();
        }).fail(function (err) {
            
          $('#messages').append(`<div class='alert alert-danger'>There was an error with your submission. Please try again.</div>`)
        })
      } else {

        $('#messages').append(`<div class='alert alert-danger'>Please select both a sender and receiver</div>`)
      }
  }
  
 
  getKudos();
  getUsers();
  
  $(document).on('click', '#send-kudo', postKudo);
  