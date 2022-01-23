module.exports = {
  shorten_date: date => {
    const d = new Date();
    return d.toLocaleDateString();

  }
}