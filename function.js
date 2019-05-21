var PRIV_KEY = "277f3d6b5cb309d26d568507b7ff6fc14c0e4445";
var PUBLIC_KEY = "457a157c4110c8f90c0e3468120f7528";
var ts = new Date().getTime();
var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
var url = 'http://gateway.marvel.com/v1/public/characters';


function CallingSerach(){
  $('#result-personagem').html('');

  if($('#search').val() != ''){
    $('#result-personagem').show();
    var searchField = $('#search').val().toString();

    $.ajax({
      url:url+'?nameStartsWith='+searchField+'&apikey='+PUBLIC_KEY+'&ts='+ts+'&hash='+hash,
      dataType: 'json',
      success: function(response){
        $.each(response.data.results, function(i, val){
          $('#result-personagem').append('<li>'+val.name+'</li>');
        });
      }
    });
  }else{
    $('#result-personagem').hide();
  }
}

$( "#search" ).keyup(function() {
  CallingSerach();
});
$( "#search" ).click(function() {
  CallingSerach();
});
$( "#search" ).focus(function() {
  CallingSerach();
});


$( ".pagination li" ).click(function() {
  a = $(this).data('offset');
  CallingCaracteres(a);
});


function CallingCaracteres(offsetNumber){
  $('.loading').addClass('loadingActive');
$.ajax({
  url:url+'?&limit=10&apikey='+PUBLIC_KEY+'&ts='+ts+'&hash='+hash+'&offset='+offsetNumber,
  dataType: 'json',
  success: function(response){

    var html = '';
    $.each(response.data.results, function(i, val){

      html += "<tr><td class='personagem-content'><img src='"+val.thumbnail.path+"."+val.thumbnail.extension+"'>";

      html += "<h3>"+val.name+"</h3></td>";

      html += "<td class='series-content'>";

      $.each(val.series.items, function(i, val){
        html += "<p>"+val.name+"</p>";
        return (i !== 2);
      });

      html += "</td>";
      html += "<td class='events-content'>";

      $.each(val.events.items, function(i, val){
        html += "<p>"+val.name+"</p>";
        return (i !== 2);
      });

      html += "</td>";
      html += "</tr>";

      console.log(val);
      $('.table-resultado table tbody').html(html);
    });
    console.log(response);
    $('.loading').removeClass('loadingActive');
  }
});

}

CallingCaracteres();
