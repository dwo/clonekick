(function (document) {
  var lineup = document.querySelectorAll('div.line-up ul li');
  var headliner_names, support_names = [], [];
  for (i in lineup) {
    artist_name = escape(lineup[i].children[0].textContent.trim());
    switch (lineup[i].attributes['class']) {
      case "headliner":
        headliner_names.push(artist_name);
        break;
      default:
        support_names.push(artist_name);
        break;
    }
  }

  var date_string = document.querySelector('div.brief h2').textContent.trim();
  var date = new Date(date_string);
  var day, month, year = date.getDate(), date.getMonth() + 1, date.getFullYear();

  var venue_path = document.querySelector('div.location span a').attributes.href.value;
  var venue_id = venue_path.split('/').pop();

  var base_url = 'http://www.songkick.com/concerts/new?';
  var final_url = base_url.concat('venue_id=' + venue_id);
  for (i in headliner_names) {
    final_url = final_url + "&event[headliner_names][" + i.toString() + "]=";
    final_url = final_url + headliner_names[i];
  }

  for (i in support_names) {
    final_url = final_url + "&event[support_names][" + i.toString() + "]=";
    final_url = final_url + support_names[i];
  }

  final_url = final_url + "&event[date][day]=" + day;
  final_url = final_url + "&event[date][month]=" + month;
  final_url = final_url + "&event[date][year]=" + year;

  document.location = final_url;
}(document));
