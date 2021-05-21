module.exports = {
  format_date: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date
    ).getFullYear()}`;
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },
  format_short: post_body => {
    return post_body.slice(0,100)+`...`;
  },
  format_title: post_title => {
    return post_title.slice(0,27)+`...`;
  }
}