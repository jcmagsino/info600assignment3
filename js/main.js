document.addEventListener('DOMContentLoaded', assignClickHandler)

function assignClickHandler () {
  document.getElementById('addRec').addEventListener('click', function () {
    const startYear = document.getElementById('startYear').value
    if (startYear <= 2000) {
      window.alert('Incorrect year: ' + startYear)
      return
    }
    const fullName = document.getElementById('fullName').value
    const major = document.getElementById('major').value

    const date = new Date()
    const time = date.getHours() + ':' + date.getMinutes()

    const newEntry = time + ' - ' + fullName + ', ' + major + ', ' + startYear 

    const enteredRecords = document.getElementById('enteredRecords')
    let newChild = document.createElement('li')
    newChild.appendChild(document.createTextNode(newEntry))

    alert('Record has been added.');

    // Commented this to remove display immediately after adding a record
    // enteredRecords.appendChild(newChild)

   $.ajax({
        method: 'POST',
        url: '/users/', 
        type: 'post',
        cache: false,
        data: { fullName: $('#fullName').val(),
        		    major: $('#major').val(),
        		    startYear: $('#startYear').val(),
              }
    });

    document.getElementById('inputs').reset()
  });

  document.getElementById('load').addEventListener('click', function(){
  $.ajax({
        method: 'GET',
        url: "/users", 
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(data){
            refresh();
        }});
  });

  $(document).on("click","#deleteData", function(){

        const id = $(this).val();
        console.log(id);
        $.ajax({
          url: '/user/'+id,
          method: 'DELETE',
          success: function(){
            alert('Record has been deleted.');
            refresh();
          },
          error: function(error){
            alert(error);
          }
        });
  });

  function refresh(){
    $("#enteredRecords").empty();
      $.ajax({
        method: 'GET',
        url: '/users',
        datatype: 'json',
        type: 'get',
        cache: false,
        success: function(data){
          $(data.records).each(function(index,value){
              
              const id = value.id;
              const date = new Date()
              const time = date.getHours() + ':' + date.getMinutes()
              $('#enteredRecords').append(time + ' - ' + value.fullName + ', ' + ' ' + value.major + ', ' + value.startYear + '<button value="' + value.id + '" id="deleteData">Delete</button><br>');
          });
        }
      });
  };
};