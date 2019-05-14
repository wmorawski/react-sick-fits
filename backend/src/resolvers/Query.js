const Query = {
  dogs(parent, args, ctx, info) {
    return [{ name: 'Snickers' }, { name: 'Mars' }]
  }
};

module.exports = Query;
