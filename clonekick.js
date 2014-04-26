// version 0.0.3 (2014-04-26)
(function (document) {
  if (document.location.href.match(/^https?:\/\/www\.songkick\.com\/concerts\/\d+/) === null) {
    return false;
  }

  var finalUrl = 'https://www.songkick.com/concerts/new?r=clonekick',
      lineup = document.querySelectorAll('div.line-up ul li'),
      dateString = document.querySelector('div.brief time').attributes.datetime.value,
      venuePath = document.querySelector('div.location a').attributes.href.value,
      headlinerNames = [], supportNames = [],
      i, artistName, day, month, year, startTime, venueId;

  for (i = 0; i < lineup.length; i++) {
    artistName = encodeURIComponent(lineup[i].children[0].textContent.trim());
    if (lineup[i].attributes['class'] === undefined) {
      supportNames.push(artistName);
    } else {
      headlinerNames.push(artistName);
    }
  }

  for (i = 0; i < headlinerNames.length; i++) {
    finalUrl += '&event[headliner_names][' + i.toString() + ']=';
    finalUrl += headlinerNames[i];
  }

  for (i = 0; i < supportNames.length; i++) {
    finalUrl += '&event[support_names][' + i.toString() + ']=';
    finalUrl += supportNames[i];
  }

  if (dateString.indexOf('T') > 0) {
    // drop the seconds and timezone (last 9 characters) and then split on 'T'
    startTime = dateString.substr(0, dateString.length - 9).split('T').pop();
    finalUrl += '&event[start_time]=' + startTime;
  }

  year = dateString.split('T')[0].split('-')[0];
  finalUrl += '&event[date][year]=' + year;

  month = dateString.split('T')[0].split('-')[1];
  finalUrl += '&event[date][month]=' + month;

  day = dateString.split('T')[0].split('-')[2];
  finalUrl += '&event[date][day]=' + day;

  venueId = venuePath.split('/').pop(); // TODO handle case of no venue
  finalUrl += '&venue_id=' + venueId;

  document.location = finalUrl;
}(document));
