(function (document) {
  var venue_path = document.querySelector('div.location span a').attributes.href.value;
  var venue_id = venue_path.split('/').pop();

  var base_url = 'http://www.songkick.com/concerts/new?';
  document.location = base_url + 'venue_id=' + venue_id;
}(document));
