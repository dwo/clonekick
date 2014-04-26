(function (document) {
  var baseUrl = 'https://www.songkick.com/concerts/new?',
      lineup = document.querySelectorAll('div.line-up ul li'),
      dateString = document.querySelector('div.brief time').attributes.datetime.value,
      venuePath = document.querySelector('div.location a').attributes.href.value,
      headlinerNames = [], supportNames = [],
      i, artistName, date, day, month, year, time, venueId, finalUrl;

  for (i = 0; i < lineup.length; i++) {
    artistName = encodeURIComponent(lineup[i].children[0].textContent.trim());
    if (lineup[i].attributes['class'] === undefined) {
      supportNames.push(artistName);
    } else {
      headlinerNames.push(artistName);
    }
  }

  date = new Date(dateString);
  day = date.getDate();
  month = date.getMonth() + 1;
  year = date.getFullYear();

  time = '0' + date.getHours() + ':0' + date.getMinutes();
  time = time.replace(/^0(\d{2}):(?:0(\d{2})|(\d{2}))$/, '$1:$2$3');

  venueId = venuePath.split('/').pop();

  finalUrl = baseUrl.concat('venue_id=' + venueId);
  for (i = 0; i < headlinerNames.length; i++) {
    finalUrl = finalUrl + '&event[headliner_names][' + i.toString() + ']=';
    finalUrl = finalUrl + headlinerNames[i];
  }

  for (i = 0; i < supportNames.length; i++) {
    finalUrl = finalUrl + '&event[support_names][' + i.toString() + ']=';
    finalUrl = finalUrl + supportNames[i];
  }

  finalUrl = finalUrl + '&event[date][day]=' + day;
  finalUrl = finalUrl + '&event[date][month]=' + month;
  finalUrl = finalUrl + '&event[date][year]=' + year;
  if (time !== '01:00') {
    finalUrl = finalUrl + '&event[start_time]=' + time;
  }

  document.location = finalUrl;
}(document));
